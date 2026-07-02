import { env } from "$env/dynamic/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import { Buffer } from "node:buffer";

type SpotifyImage = {
  url?: string;
};

type SpotifyTrack = {
  name?: string;
  artists?: Array<{ name?: string }>;
  album?: {
    name?: string;
    images?: SpotifyImage[];
  };
  external_urls?: {
    spotify?: string;
  };
};

type RecentlyPlayedItem = {
  played_at?: string;
  track?: SpotifyTrack;
};

const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    throw new Error("spotify_auth_failed");
  }

  const token = await response.json();
  return typeof token.access_token === "string" ? token.access_token : null;
}

export const GET: RequestHandler = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return json({
        configured: false,
        connected: false,
        track: null
      });
    }

    const response = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error("spotify_recently_played_failed");
    }

    const data = await response.json();
    const item = data.items?.[0] as RecentlyPlayedItem | undefined;
    const track = item?.track;

    return json(
      {
        configured: true,
        connected: true,
        track: track
          ? {
              name: track.name || "unknown track",
              artists:
                track.artists
                  ?.map((artist) => artist.name)
                  .filter(Boolean)
                  .join(", ") || "unknown artist",
              album: track.album?.name || "",
              image: track.album?.images?.[0]?.url || "",
              url: track.external_urls?.spotify || "",
              playedAt: item?.played_at || ""
            }
          : null
      },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
        }
      }
    );
  } catch (error) {
    console.error(
      "spotify-last-played failed",
      error instanceof Error ? error.message : "unknown_error"
    );

    return json({
      configured: true,
      connected: false,
      track: null
    });
  }
};
