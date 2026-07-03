<script>
  import Card from "./Card.svelte";
  import DetailModal from "./DetailModal.svelte";
  import InfoBG from "$lib/assets/cards/adi-card.webp";

  let showModal = false;
  /** @type {HTMLElement | null} */
  let origin = null;

  /** @param {Event} e */
  function open(e) {
    origin = /** @type {HTMLElement} */ (e.currentTarget);
    showModal = true;
  }

  const aboutParagraphs = [
    "I am an entrepreneur with a passion for technology, public safety and teaching young students.",
    "At age 12, I launched a sneaker reselling business that grew into six-figure annual sales with 3,000+ Discord community members. Recently, I filed for a patent associated with novel gun threat detection technology, published peer-reviewed research papers on public safety and eldercare, and lead free coding and AI camps for elementary and middle school students to inspire the next generation of builders.",
    "I am fortunate to have an opportunity to collaborate with researchers at Penn's Injury Science Center on public safety initiatives and at the Perelman School of Medicine on an AI-powered neuroimaging app during my internships.",
    "I'm driven to build innovative technologies that bridge entrepreneurship, research, and social good by creating solutions that help communities like my own become safer, smarter, and more connected."
  ];

  const photos = [
    { src: "/pictures/adi_pic.jpg", alt: "Adi Khurana portrait" },
    { src: "/pictures/teaching5.jpg", alt: "Adi teaching a coding camp" },
    { src: "/pictures/iccr.jpg", alt: "Adi at ICCR" },
    { src: "/pictures/hindi_piano.JPG", alt: "Adi playing piano" },
    { src: "/pictures/award.jpg", alt: "Adi receiving an award" },
    { src: "/pictures/carnegie.jpg", alt: "Adi at Carnegie Hall" },
    { src: "/pictures/columbia.jpg", alt: "Adi at Columbia University" },
    { src: "/pictures/hindi2.JPG", alt: "Adi at a Hindi event" },
    { src: "/pictures/jshs_award.jpg", alt: "Adi receiving the JSHS award" },
    { src: "/pictures/happy.JPG", alt: "Adi smiling" }
  ];
</script>

<Card
  additionalClasses="hover:scale-100 relative overflow-hidden bg-[#F7F7F7]"
  label="About Adi"
  onClick={open}
>
  <div class="px-[22px] py-4 flex flex-col justify-end items-start h-full relative group z-10">
    <span class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-white">
      about.adi
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      who am i?
    </p>
  </div>

  <img
    class="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-300 z-0"
    src={InfoBG}
    alt=""
    width="640"
    height="427"
    decoding="async"
    fetchpriority="high"
  />
</Card>

{#if showModal}
  <DetailModal title="About Adi" {origin} on:close={() => (showModal = false)}>
    <div slot="body" class="flex flex-col gap-4 text-base leading-relaxed text-[#010313]/75">
      {#each aboutParagraphs as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    <svelte:fragment slot="media">
      {#each photos as photo}
        <img
          src={photo.src}
          alt={photo.alt}
          class="detail-modal-photo"
          loading="lazy"
          decoding="async"
        />
      {/each}
    </svelte:fragment>
  </DetailModal>
{/if}
