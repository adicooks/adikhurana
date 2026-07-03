<script>
  import { onMount } from "svelte";
  import Card from "../Card.svelte";

  const POLL_INTERVAL_MS = 45000;

  let loading = true;
  let connected = false;
  let configured = true;
  /** @type {{ name?: string; artists?: string; image?: string; url?: string; source?: string } | null} */
  let track = null;
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let refreshTimer;

  async function loadSpotifyTrack() {
    try {
      const response = await fetch("/api/spotify-last-played", { cache: "no-store" });
      const data = await response.json();

      configured = data.configured !== false;
      connected = data.connected === true;
      track = data.track || null;
    } catch {
      connected = false;
      track = null;
    } finally {
      loading = false;
    }
  }

  function stopPolling() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = undefined;
    }
  }

  function startPolling() {
    stopPolling();
    refreshTimer = setInterval(loadSpotifyTrack, POLL_INTERVAL_MS);
  }

  // Don't burn serverless invocations while the tab is in the background.
  function handleVisibilityChange() {
    if (document.hidden) {
      stopPolling();
    } else {
      loadSpotifyTrack();
      startPolling();
    }
  }

  onMount(() => {
    loadSpotifyTrack();
    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  $: cardHref = track?.url || "https://open.spotify.com/";
  $: status = loading
    ? "loading..."
    : !configured
      ? "add env vars"
      : track?.source === "current"
        ? "current song"
        : track?.source === "recent"
          ? "last song"
          : "spotify quiet";
  $: trackName = track?.name || "nothing playing";
  $: artistName = track?.artists || "open spotify";
</script>

<Card
  href={cardHref}
  external
  label="Adi's Spotify — {trackName}"
  additionalClasses="bg-[#050505]"
>
  <div class="relative flex h-full w-full flex-col justify-between overflow-hidden px-[22px] py-4 text-white">
    {#if track?.image}
      <img
        class="absolute -right-4 -top-5 h-28 w-28 rotate-6 rounded-2xl object-cover opacity-80 shadow-2xl transition-transform group-hover:-translate-y-1 group-hover:rotate-3"
        src={track.image}
        alt=""
        width="160"
        height="160"
        decoding="async"
      />
    {:else}
      <div
        class="absolute -right-4 -top-5 h-28 w-28 rotate-6 rounded-2xl bg-[#101010] ring-1 ring-white/10"
        aria-hidden="true"
      />
    {/if}

    <div class="relative z-10 flex items-start justify-between">
      <svg
        class="h-8 w-8 text-[#1DB954]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="Spotify"
      >
        <path
          d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.66 0 12 0Zm5.51 17.31a.75.75 0 0 1-1.03.25c-2.83-1.73-6.39-2.12-10.58-1.16a.75.75 0 0 1-.33-1.46c4.59-1.05 8.53-.6 11.69 1.34.35.21.46.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.24-1.99-8.18-2.57-12.01-1.4a.94.94 0 1 1-.55-1.8c4.38-1.33 9.82-.69 13.54 1.59.44.27.58.85.31 1.3Zm.13-3.4C15.22 8.33 8.82 8.12 5.1 9.25a1.13 1.13 0 0 1-.66-2.16c4.27-1.3 11.34-1.05 15.82 1.61a1.13 1.13 0 0 1-1.15 1.94Z"
        />
      </svg>

      <div class="min-w-0 flex flex-col items-end text-right">
        <span class="text-xl font-semibold leading-6 transition-opacity group-hover:opacity-0">
          adi.spotify
        </span>
        <span class="absolute right-[22px] top-4 text-xl font-semibold leading-6 opacity-0 transition-opacity group-hover:opacity-100">
          {status}
        </span>
      </div>
    </div>

    <div class="relative z-10 min-w-0">
      <p class="max-w-[13rem] truncate text-lg font-semibold leading-5">{trackName}</p>
      <p class="mt-1 max-w-[13rem] truncate text-sm font-medium text-white/55">{artistName}</p>
    </div>
  </div>
</Card>
