<script lang="ts">
  import { onMount } from "svelte";
  import { track } from "@vercel/analytics";
  import { sendResumeEvent } from "$lib/resumeEvent";

  type Geo = {
    city: string;
    country: string;
    region: string;
  };

  const pdfHref = "/adi-khurana-resume/pdf";

  let durationInterval: ReturnType<typeof setInterval> | undefined;
  let trackedVercelDuration = false;
  let lastSentDuration = 0;
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

  function sendDurationUpdate(final = false) {
    const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    if (seconds <= lastSentDuration && !final) return;

    lastSentDuration = seconds;

    if (final && !trackedVercelDuration) {
      trackedVercelDuration = true;

      track("Resume Page Duration", {
        seconds,
        bucket: durationBucket(seconds),
        city: geo.city,
        country: geo.country,
        region: geo.region
      });
    }

    sendResumeEvent({
      eventName: "resume_duration",
      durationSeconds: seconds,
      durationBucket: durationBucket(seconds)
    });
  }

  function trackDuration() {
    sendDurationUpdate(true);
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

        sendResumeEvent({
          eventName: "resume_view",
          source: "direct_resume_page"
        });
      })
      .catch(() => {
        track("Resume Page Viewed", geo);

        sendResumeEvent({
          eventName: "resume_view",
          source: "direct_resume_page"
        });
      });

    window.addEventListener("pagehide", trackDuration);
    window.addEventListener("beforeunload", trackDuration);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    durationInterval = setInterval(() => sendDurationUpdate(), 5000);

    return () => {
      trackDuration();
      if (durationInterval) clearInterval(durationInterval);
      window.removeEventListener("pagehide", trackDuration);
      window.removeEventListener("beforeunload", trackDuration);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });
</script>

<svelte:head>
  <title>Adi Khurana Resume</title>
  <meta name="description" content="Adi Khurana resume" />
</svelte:head>

<main class="h-screen w-screen overflow-hidden bg-[#eeeeee]">
  <iframe class="h-full w-full border-0" title="Adi Khurana Resume" src={pdfHref}></iframe>
</main>
