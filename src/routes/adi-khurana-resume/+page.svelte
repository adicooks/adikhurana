<script lang="ts">
  import { onMount } from "svelte";
  import { track } from "@vercel/analytics";

  type Geo = {
    city: string;
    country: string;
    region: string;
  };

  const pdfHref = "/adi-khurana-resume/pdf";

  let trackedDuration = false;
  let startedAt = Date.now();
  let geo: Geo = {
    city: "unknown",
    country: "unknown",
    region: "unknown"
  };

  function durationBucket(seconds: number) {
    if (seconds < 10) return "0-10s";
    if (seconds < 30) return "10-30s";
    if (seconds < 60) return "30-60s";
    if (seconds < 180) return "1-3m";
    if (seconds < 300) return "3-5m";
    return "5m+";
  }

  function trackDuration() {
    if (trackedDuration) return;

    trackedDuration = true;
    const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));

    track("Resume Page Duration", {
      seconds,
      bucket: durationBucket(seconds),
      city: geo.city,
      country: geo.country,
      region: geo.region
    });
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") trackDuration();
  }

  onMount(() => {
    startedAt = Date.now();

    fetch("/api/resume-analytics")
      .then((response) => response.json())
      .then((data: Geo) => {
        geo = data;

        track("Resume Page Viewed", {
          city: geo.city,
          country: geo.country,
          region: geo.region
        });
      })
      .catch(() => {
        track("Resume Page Viewed", geo);
      });

    window.addEventListener("pagehide", trackDuration);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      trackDuration();
      window.removeEventListener("pagehide", trackDuration);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });
</script>

<svelte:head>
  <title>Adi Khurana Resume</title>
  <meta name="description" content="Adi Khurana resume" />
</svelte:head>

<main class="h-screen w-screen bg-[#eeeeee] text-[#010313]">
  <div class="flex h-full flex-col">
    <header class="flex items-center justify-between gap-4 border-b border-[#c5c7ca] bg-[#f7f7f7] px-4 py-3">
      <a class="text-sm font-bold text-[#010313]/60 transition hover:text-[#010313]" href="/">adi</a>
      <a
        class="rounded-full bg-[#010313] px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-500"
        href={pdfHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        open pdf
      </a>
    </header>

    <iframe class="min-h-0 flex-1" title="Adi Khurana Resume" src={pdfHref}></iframe>
  </div>
</main>
