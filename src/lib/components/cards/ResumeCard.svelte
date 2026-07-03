<script>
  import { track } from "@vercel/analytics";
  import { sendResumeEvent } from "$lib/resumeEvent";
  import Card from "../Card.svelte";
  import Disc from "$lib/assets/disc.png";

  const resumeHref = "/adi-khurana-resume";

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
    <p
      class="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg text-[#010313]/50 font-bold"
    >
      view my resume
    </p>
  </div>
</Card>
