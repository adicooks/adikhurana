<script lang="ts">
  import NotchEdge from "$lib/assets/notch-edge.svg";
  import EmptyCard from "$lib/components/EmptyCard.svelte";
  import MoreSoonCard from "$lib/components/MoreSoonCard.svelte";
  import { onMount } from "svelte";
  import ShoeCard from "$lib/components/cards/ShoeCard.svelte";
  import LinkedInCard from "$lib/components/cards/LinkedInCard.svelte";
  import InjuryCard from "$lib/components/cards/InjuryCard.svelte";
  import GithubCard from "$lib/components/cards/GithubCard.svelte";
  import ChessCard from "$lib/components/cards/ChessCard.svelte";
  import NiChartCard from "$lib/components/cards/NiChartCard.svelte";
  import GalaxyCard from "$lib/components/cards/GalaxyCard.svelte";
  import ResumeCard from "$lib/components/cards/ResumeCard.svelte";
  import InfoCard from "$lib/components/InfoCard.svelte";
  import Email from "$lib/assets/email.svg";

  let currentTime: string = "";
  let audio: HTMLAudioElement | null = null;

  function updateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "2-digit",
      hour12: true,
    };
    currentTime = now.toLocaleString("en-US", options);
  }

  onMount(() => {
    updateTime();
    setInterval(updateTime, 1000);

    // Create audio and delay auto play by 1 second
    audio = new Audio("/wii.background.mp3");
    audio.loop = true;
    setTimeout(() => {
      audio.play().catch((e) => console.warn("Autoplay blocked:", e));
    }, 1000);
  });

  function playMusic(event: Event) {
    event.preventDefault();
    if (audio) {
      audio.play().catch((e) => console.warn("Autoplay blocked:", e));
    }
  }
</script>

<main class="h-screen fixed w-screen overflow-hidden flex flex-col">
  <div
    class="flex flex-col justify-start items-start m-auto max-w-7xl relative w-full"
  >
    <div
      class="hidden md:block absolute top-0 bottom-0 right-0 w-14 bg-gradient-to-r from-transparent to-[#EEEEEE] z-10"
    />
    <div
      class="hidden md:block absolute top-0 bottom-0 left-0 w-14 bg-gradient-to-l from-transparent to-[#EEEEEE] z-10"
    />
    <div
      class="fade-in-right grid grid-rows-3 grid-flow-col gap-4 p-2 px-4 md:p-8 md:px-14 w-full max-w-7xl mx-auto horizontal-scroll"
    >
      <InfoCard />
      <ResumeCard />
      <NiChartCard />
      <GalaxyCard />
      <InjuryCard />
      <LinkedInCard />
      <ChessCard />
      <ShoeCard />
      <GithubCard />
      <EmptyCard />
      <EmptyCard />
      <EmptyCard soft={true} />
      <EmptyCard soft={true} />
      <EmptyCard soft={true} />
    </div>
  </div>

  <div class="w-full flex flex-col sm:mb-0 relative fade-in-bottom">
    <button
      class="z-10 absolute transition-all shadow-md hover:shadow-lg rounded-full flex items-center justify-center ring-1 hover:ring-4 ring-[#C5C7CA] hover:ring-blue-400 bg-[#EEEEEE] w-10 h-10 sm:h-20 sm:w-20 top-2.5 left-2.5 sm:top-6 sm:left-6"
      on:click={playMusic}
    >
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
          fill="#808080"
        ></path>
      </svg>
    </button>

    <a
      href="mailto:theadikhurana@gmail.com"
      class="z-10 absolute transition-all shadow-md hover:shadow-lg rounded-full flex ring-1 hover:ring-4 ring-[#C5C7CA] hover:ring-blue-400 bg-[#EEEEEE] w-10 h-10 sm:h-20 sm:w-20 top-2.5 right-2.5 sm:top-6 sm:right-6"
    >
      <img class="m-auto" src={Email} alt="Email" />
    </a>

    <p
      class="absolute left-0 right-0 bottom-2 sm:bottom-6 text-sm font-medium text-center whitespace-nowrap text-[#010313]/30"
    >
      not affiliated with nintendo
    </p>

    <div class="flex">
      <div class="w-full overflow-hidden bg-[#DBDCDD] h-[50px] sm:h-[70px]" />
      <img
        class="w-[122px] h-[50px] sm:w-[170px] sm:h-[70px] -scale-x-100"
        src={NotchEdge}
        alt="Notch Edge"
      />
      <div
        class="sm:w-[100rem] flex flex-col items-center justify-center h-[50px] sm:h-[70px] -translate-y-1"
      >
        <p
          class="text-xl sm:text-2xl font-medium text-center whitespace-nowrap text-[#010313]/50 w-full"
        >
          {currentTime.toLowerCase()}
        </p>
      </div>
      <img
        class="w-[122px] h-[50px] sm:h-[70px] sm:w-[170px]"
        src={NotchEdge}
        alt="Notch Edge"
      />
      <div class="w-full bg-[#DBDCDD] h-[50px] sm:h-[70px]" />
    </div>

    <div class="w-full bg-[#DBDCDD] h-[40px] sm:min-h-[70px]" />
  </div>
  <div class="block sm:hidden w-full h-28 bg-[#DBDCDD]" />
</main>

<style>
  .horizontal-scroll {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
  }
  .horizontal-scroll::-webkit-scrollbar {
    width: 0px; /* For Chrome, Safari, and Opera */
  }
</style>
