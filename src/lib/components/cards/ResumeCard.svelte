<script>
  import { onMount } from "svelte";
  import { track } from "@vercel/analytics";
  import { sendResumeEvent } from "$lib/resumeEvent";
  import Card from "../Card.svelte";
  import Disc from "$lib/assets/disc.png";

  const resumeHref = "/adi-khurana-resume";

  /** @type {{ views: number; countries: number } | null} */
  let reach = null;

  function trackResumeClick() {
    sendResumeEvent({
      eventName: "resume_click",
      route: resumeHref,
      source: "home_card"
    });

    track("Resume Link Clicked", {
      target: resumeHref,
      source: "home_card"
    });
  }

  onMount(async () => {
    try {
      const response = await fetch("/api/resume-reach");
      const data = await response.json();

      if (data.configured && data.views > 0) {
        reach = { views: data.views, countries: data.countries };
      }
    } catch {
      // Social proof is a bonus; the card works fine without it.
    }
  });
</script>

<Card
  href={resumeHref}
  external
  label="View Adi's resume"
  additionalClasses="bg-[#F7F7F7]"
  on:click={trackResumeClick}
>
  <div class="flex flex-col items-center justify-center relative w-full h-full">
    <img
      class="w-28 h-28 m-auto group-hover:rotate-180 duration-300"
      src={Disc}
      alt=""
    />
    <div class="absolute bottom-2.5 left-0 right-0 flex flex-col items-center leading-tight">
      <p class="text-lg text-[#010313]/50 font-bold">view my resume</p>
      {#if reach}
        <p class="text-[11px] font-semibold text-[#010313]/35">
          viewed {reach.views} {reach.views === 1 ? "time" : "times"}{reach.countries > 1
            ? ` from ${reach.countries} countries`
            : ""}
        </p>
      {/if}
    </div>
  </div>
</Card>
