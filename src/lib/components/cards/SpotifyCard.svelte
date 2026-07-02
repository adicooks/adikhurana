<script>
  import { onMount } from "svelte";
  import Card from "../Card.svelte";

  let loading = true;
  let connected = false;
  let configured = true;
  let track = null;

  onMount(async () => {
    try {
      const response = await fetch("/api/spotify-last-played");
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
  });

  $: cardHref = track?.url || "https://open.spotify.com/";
  $: title = loading
    ? "loading track..."
    : !configured
      ? "connect spotify"
      : track?.name || "spotify quiet";
  $: subtitle = loading
    ? "last played song"
    : !configured
      ? "add env vars"
      : connected && track?.artists
        ? track.artists
        : "last played song";
</script>

<a href={cardHref} target="_blank" rel="noopener noreferrer">
  <Card additionalClasses="hover:scale-100 bg-[#111111] cursor-pointer">
    <div class="relative flex h-full w-full items-end overflow-hidden px-[22px] py-4 text-white">
      {#if track?.image}
        <img
          class="absolute right-3 top-3 h-20 w-20 rounded-xl object-cover opacity-90 shadow-lg transition-transform group-hover:-translate-y-1"
          src={track.image}
          alt=""
          width="160"
          height="160"
          decoding="async"
        />
      {:else}
        <div
          class="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1DB954]/20 ring-1 ring-[#1DB954]/40"
          aria-hidden="true"
        >
          <span class="h-7 w-7 rounded-full bg-[#1DB954]"></span>
        </div>
      {/if}

      <div class="relative z-10 flex min-w-0 flex-col items-start">
        <div class="mb-2 flex items-center gap-2">
          <span class="h-3 w-3 rounded-full bg-[#1DB954]" aria-hidden="true"></span>
          <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[#1DB954]">spotify</span>
        </div>
        <span class="max-w-[13rem] truncate text-xl font-semibold leading-6">{title}</span>
        <p class="mt-1 max-w-[12rem] truncate text-sm font-medium text-white/65">{subtitle}</p>
      </div>
    </div>
  </Card>
</a>
