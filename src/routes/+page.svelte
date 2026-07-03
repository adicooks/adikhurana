<script lang="ts">
  import NotchEdge from "$lib/assets/notch-edge.svg";
  import EmptyCard from "$lib/components/EmptyCard.svelte";
  import MoreSoonCard from "$lib/components/MoreSoonCard.svelte";
  import { onMount } from "svelte";

  import ShoeCard from "$lib/components/cards/ShoeCard.svelte";
  import LinkedInCard from "$lib/components/cards/LinkedInCard.svelte";
  import InjuryCard from "$lib/components/cards/InjuryCard.svelte";
  import GithubCard from "$lib/components/cards/GithubCard.svelte";
  import SpotifyCard from "$lib/components/cards/SpotifyCard.svelte";
  import ChessCard from "$lib/components/cards/ChessCard.svelte";
  import NiChartCard from "$lib/components/cards/NiChartCard.svelte";
  import GalaxyCard from "$lib/components/cards/GalaxyCard.svelte";
  import ResumeCard from "$lib/components/cards/ResumeCard.svelte";
  import WithCoverageCard from "$lib/components/cards/WithCoverageCard.svelte";
  import InfoCard from "$lib/components/InfoCard.svelte";
  import ScienceCard from "$lib/components/cards/ScienceCard.svelte";
  import Modal from "$lib/components/Modal.svelte";

  import Email from "$lib/assets/email.svg";

  import GalaxyBG   from "$lib/assets/cards/galaxy-card.webp";
  import HeatmapSVG from "$lib/assets/heatmap.svg";
  import LinkedBG   from "$lib/assets/linkedin-bg.jpeg";
  import PiscBG     from "$lib/assets/pisc-bg.png";
  import PennBG     from "$lib/assets/penn-bg.jpeg";
  import InfoBG     from "$lib/assets/cards/adi-card.webp";
  import ScienceBG  from "$lib/assets/cards/science-card.webp";

  let showModal = false;
  let modalCardId: string | null = null;
  let modalText = "";
  let modalPhoto = "";

  let cardContent: Record<string, { text: string; photo: string }> = {
    chess:        { text: "playing for mate",               photo: "https://images3.alphacoders.com/189/thumb-1920-189859.jpg" },
    galaxy:       { text: "bots approved here",             photo: GalaxyBG },
    github:       { text: "pip install code",               photo: HeatmapSVG },
    linkedin:     { text: "my resume, but cooler",          photo: LinkedBG },
    injury:       { text: "injury trends decoded",          photo: PiscBG },
    nichart:      { text: "tackling alzheimer's with ai",   photo: PennBG },
    info:         { text: "about",                          photo: InfoBG },
    science:      { text: "exploring ideas thru science",   photo: ScienceBG },
  };

  const visibleCardCount = 11;
  const cardsToCompleteColumn = (3 - (visibleCardCount % 3)) % 3;
  const emptyCardCount = cardsToCompleteColumn + 3;

  function openEditModal(cardId: string) {
    modalCardId = cardId;
    modalText = cardContent[cardId]?.text || "";
    modalPhoto = cardContent[cardId]?.photo || "";
    showModal = true;
  }

  function closeEditModal() {
    showModal = false;
    modalCardId = null;
  }

  function saveEditModal() {
    if (modalCardId) {
      cardContent[modalCardId] = { text: modalText, photo: modalPhoto };
    }
    closeEditModal();
  }

  let currentTime: string = "";
  let lastVisitLocation = "unknown";
  let audio: HTMLAudioElement | null = null;
  let isPlaying = false;

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

    fetch("/api/visit-location")
      .then((response) => response.json())
      .then(({ location }) => {
        lastVisitLocation = location || "unknown";
      })
      .catch(() => {
        lastVisitLocation = "unknown";
      });

    // Prepare audio but DO NOT play it.
    audio = new Audio("/wii.background.mp3");
    audio.loop = true;

    // Keep UI state in sync if user pauses via OS controls
    audio.addEventListener("play", () => (isPlaying = true));
    audio.addEventListener("pause", () => (isPlaying = false));
    audio.addEventListener("ended", () => (isPlaying = false));
  });

  async function playMusic(event: Event) {
    event.preventDefault();
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      // isPlaying will update via event listeners above
    } catch (e) {
      console.warn("Play failed:", e);
    }
  }
</script>

<main class="h-screen fixed w-screen overflow-hidden flex flex-col pt-12">
  <div class="flex flex-col justify-start items-start m-auto max-w-7xl relative w-full">
    <div class="hidden md:block absolute top-0 bottom-0 right-0 w-14 bg-gradient-to-r from-transparent to-[#EEEEEE] z-10" />
    <div class="hidden md:block absolute top-0 bottom-0 left-0 w-14 bg-gradient-to-l from-transparent to-[#EEEEEE] z-10" />

    <div class="fade-in-right grid grid-rows-3 grid-flow-col gap-4 p-2 px-4 md:p-8 md:px-14 w-full max-w-7xl mx-auto horizontal-scroll">
      <ResumeCard />

      <InfoCard
        onEdit={() => openEditModal('info')}
        text={cardContent.info.text}
        photo={cardContent.info.photo}
      />

       <NiChartCard
        onEdit={() => openEditModal('nichart')}
        text={cardContent.nichart.text}
        photo={cardContent.nichart.photo}
      />

      <ScienceCard
        onEdit={() => openEditModal('science')}
        text={cardContent.science.text}
        photo={cardContent.science.photo}
      />



      <!--
      <GalaxyCard
      onEdit={() => openEditModal('galaxy')}
      ext={cardContent.galaxy.text}
      photo={cardContent.galaxy.photo}
      />
      -->


      <ChessCard/>

      <ShoeCard/>

      <GithubCard
        onEdit={() => openEditModal('github')}
        text={cardContent.github.text}
        photo={cardContent.github.photo}
      />

      <InjuryCard
        onEdit={() => openEditModal('injury')}
        text={cardContent.injury.text}
        photo={cardContent.injury.photo}
      />

      <LinkedInCard
        onEdit={() => openEditModal('linkedin')}
        text={cardContent.linkedin.text}
        photo={cardContent.linkedin.photo}
      />

      <WithCoverageCard />

      <SpotifyCard />

      <Modal
        show={showModal}
        text={modalText}
        photo={modalPhoto}
        setText={(v) => (modalText = v)}
        setPhoto={(v) => (modalPhoto = v)}
        onClose={closeEditModal}
        onSave={saveEditModal}
      />

      {#each Array(emptyCardCount) as _, index}
        <EmptyCard soft={index > 0} />
      {/each}
    </div>
  </div>

  <div class="w-full flex flex-col sm:mb-0 relative fade-in-bottom">
    <button
      type="button"
      aria-label="Play Wii music"
      title="Play Wii music"
      class="group z-10 absolute transition-all shadow-md hover:shadow-lg rounded-full flex items-center justify-center ring-1 hover:ring-4 ring-[#C5C7CA] hover:ring-blue-400 bg-[#EEEEEE] w-10 h-10 sm:h-20 sm:w-20 top-9 left-2.5 sm:top-6 sm:left-6"
      on:click={playMusic}
    >
      <span
        class="pointer-events-none absolute left-0 top-full mt-2 whitespace-nowrap rounded-full bg-[#010313]/85 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:left-1/2 sm:-translate-x-1/2"
      >
        play wii music
      </span>
      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
          fill="#808080"></path>
      </svg>
    </button>

    <a
      href="mailto:theadikhurana@gmail.com"
      aria-label="Contact me"
      title="Contact me"
      class="group z-10 absolute transition-all shadow-md hover:shadow-lg rounded-full flex ring-1 hover:ring-4 ring-[#C5C7CA] hover:ring-blue-400 bg-[#EEEEEE] w-10 h-10 sm:h-20 sm:w-20 top-9 right-2.5 sm:top-6 sm:right-6"
    >
      <span
        class="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-full bg-[#010313]/85 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
      >
        contact me
      </span>
      <img class="m-auto" src={Email} alt="Email" />
    </a>

    <p
      class="relative z-10 mb-1 px-16 text-xs leading-tight font-medium text-center text-[#010313]/30 sm:absolute sm:left-0 sm:right-0 sm:bottom-4 sm:mb-0 sm:px-0 sm:text-sm"
    >
      inspired by the wii menu
      <br />
      developed by adi khurana
    </p>

    <div class="flex">
      <div class="w-full overflow-hidden bg-[#DBDCDD] h-[58px] sm:h-[70px]" />
      <img
        class="w-[122px] h-[58px] sm:w-[170px] sm:h-[70px] -scale-x-100"
        src={NotchEdge}
        alt="Notch Edge"
      />
      <div class="sm:w-[100rem] flex flex-col items-center justify-center h-[58px] sm:h-[70px] -translate-y-1">
        <p
          class="text-xl sm:text-2xl font-medium text-center whitespace-nowrap text-[#010313]/50 w-full"
        >
          {currentTime.toLowerCase()}
        </p>
        <p
          class="mt-0.5 flex items-center justify-center gap-1.5 px-2 text-xs leading-tight font-medium text-center text-[#010313]/30 sm:text-sm"
        >
          <span class="h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
          <span>last visit — {lastVisitLocation.toLowerCase()}</span>
        </p>
      </div>
      <img
        class="w-[122px] h-[58px] sm:h-[70px] sm:w-[170px]"
        src={NotchEdge}
        alt="Notch Edge"
      />
      <div class="w-full bg-[#DBDCDD] h-[58px] sm:h-[70px]" />
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
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .horizontal-scroll::-webkit-scrollbar {
    width: 0px;
  }
</style>
