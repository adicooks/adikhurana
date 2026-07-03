import { env } from "$env/dynamic/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import { Buffer } from "node:buffer";

type SpotifyImage = {
  url?: string;
};

type SpotifyTrack = {
  type?: string;
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

type CurrentlyPlayingItem = {
  is_playing?: boolean;
  item?: SpotifyTrack | null;
  progress_ms?: number | null;
  timestamp?: number;
};

const SPOTIFY_CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track";
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
    const errorText = await response.text();
    throw new Error(`spotify_auth_failed_${response.status}_${errorText}`);
  }

  const token = await response.json();
  return typeof token.access_token === "string" ? token.access_token : null;
}

function serializeTrack(
  track: SpotifyTrack | null | undefined,
  source: "current" | "recent",
  playedAt = "",
  progressMs: number | null = null
) {
  if (!track || track.type === "episode") {
    return null;
  }

  return {
    source,
    name: track.name || "unknown track",
    artists:
      track.artists
        ?.map((artist) => artist.name)
        .filter(Boolean)
        .join(", ") || "unknown artist",
    album: track.album?.name || "",
    image: track.album?.images?.[0]?.url || "",
    url: track.external_urls?.spotify || "",
    playedAt,
    progressMs
  };
}

async function getCurrentlyPlaying(accessToken: string) {
  const response = await fetch(SPOTIFY_CURRENTLY_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 204 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`spotify_currently_playing_failed_${response.status}`);
  }

  const data = (await response.json()) as CurrentlyPlayingItem;

  if (!data.is_playing) {
    return null;
  }

  return serializeTrack(data.item, "current", "", data.progress_ms ?? null);
}

async function getRecentlyPlayed(accessToken: string) {
  const response = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`spotify_recently_played_failed_${response.status}`);
  }

  const data = await response.json();
  const item = data.items?.[0] as RecentlyPlayedItem | undefined;

  return serializeTrack(item?.track, "recent", item?.played_at || "");
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

    const track =
      (await getCurrentlyPlaying(accessToken)) ||
      (await getRecentlyPlayed(accessToken));

    return json(
      {
        configured: true,
        connected: true,
        track
      },
      {
        headers: {
          "Cache-Control": "no-store"
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
