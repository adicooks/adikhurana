<script>
  import Card from "../Card.svelte";
  import DetailModal from "../DetailModal.svelte";
  import PennBG from "$lib/assets/penn-bg.jpeg";

  let showModal = false;
  /** @type {HTMLElement | null} */
  let origin = null;

  /** @param {Event} e */
  function open(e) {
    origin = /** @type {HTMLElement} */ (e.currentTarget);
    showModal = true;
  }

  const description =
    "I collaborated with researchers at the Center for Biomedical Image Computing and Analytics (CBICA), which develops advanced computational methods to transform biomedical images into diagnostic and predictive tools for personalized medicine. My work focused on designing and developing an AI-powered mobile app for NiChart, a large and diverse collection of MRI images, to enable early detection of aging and neurodegenerative diseases through imaging biomarkers. The app is now in beta testing for clinical integration.";
</script>

<Card
  additionalClasses="hover:scale-100 bg-[#ffffff]"
  label="NiChart internship details"
  onClick={open}
>
  <div class="px-[22px] py-4 flex flex-col justify-end items-start text-black h-full relative group">
    <svg
      class="translate-y-6 group-hover:translate-y-0 transition-transform z-10"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#011F5B"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 2.5a3.5 3.5 0 0 0-3.46 3 3.5 3.5 0 0 0-2.54 4.13A3.5 3.5 0 0 0 4 15.5a3.5 3.5 0 0 0 3.5 4.4 3.5 3.5 0 0 0 5-1.15V5.5a3.5 3.5 0 0 0-3-3Z" />
      <path d="M14.5 2.5a3.5 3.5 0 0 1 3.46 3 3.5 3.5 0 0 1 2.54 4.13A3.5 3.5 0 0 1 20 15.5a3.5 3.5 0 0 1-3.5 4.4 3.5 3.5 0 0 1-5-1.15V5.5a3.5 3.5 0 0 1 3-3Z" />
      <path d="M12 8h-1.5M12 13h1.5" />
    </svg>
    <span
      class="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-black z-10"
      >dev.nichart</span
    >
    <p
      class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-black/80 opacity-0 group-hover:opacity-100 transition"
    >
      tackling alzheimer's with ai
    </p>
    <img
      class="absolute -bottom-12 -right-16 group-hover:-translate-y-2 transition-transform"
      src={PennBG}
      alt=""
      width="640"
      height="426"
      decoding="async"
    />
  </div>
</Card>

{#if showModal}
  <DetailModal title="Software Developer Intern, NiChart" {origin} on:close={() => (showModal = false)}>
    <p slot="body" class="text-base leading-relaxed text-[#010313]/75">{description}</p>

    <svelte:fragment slot="media">
      <img
        src="/pictures/contract.png"
        alt="NiChart internship award letter"
        class="detail-modal-photo"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/pictures/certificate.png"
        alt="NiChart internship certificate"
        class="detail-modal-photo"
        loading="lazy"
        decoding="async"
      />
    </svelte:fragment>
  </DetailModal>
{/if}
