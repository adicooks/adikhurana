<script>
  import Card from "../Card.svelte";

  export let text = "tackling alzheimers with ai";
  export let photo = "";

  const awardLetter = "/pictures/contract.png";
  const certification = "/pictures/certificate.png";

  let showModal = false;
</script>

<Card
  additionalClasses="hover:scale-100 bg-[#ffffff]"
  onClick={() => (showModal = true)}
>
  <div class="px-[22px] py-4 flex flex-col justify-end items-start text-black h-full relative group">
    <img
      class="translate-y-6 group-hover:translate-y-0 transition-transform mt1 z-10"
      src="https://neuroimagingchart.com/images/Logo/brain_transparent_logo_cropped.png"
      width="30"
      height="30"
      alt="Logo"
    />
    <span
      class="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-black z-10"
      >dev.nichart</span
    >
    <p
      class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-black/80 opacity-0 group-hover:opacity-100 transition"
    >
      {text}
    </p>
    {#if photo}
      <img
        class="absolute -bottom-12 -right-16 group-hover:-translate-y-2 transition-transform"
        src={photo}
        alt="Background"
      />
    {/if}
  </div>
</Card>

{#if showModal}
  <div class="modal-backdrop" on:click={() => (showModal = false)}>
    <div class="modal-content" on:click|stopPropagation tabindex="0">
      <button class="modal-close" on:click={() => (showModal = false)} aria-label="Close">×</button>

      <div class="modal-5050-inner">
        <!-- left: text (scrollable) -->
        <div class="modal-5050-left">
          <h2 class="text-2xl font-bold mb-4">
            Software Developer Intern, NiChart
          </h2>
          <div class="whitespace-pre-wrap text-lg text-gray-700">
            I collaborated with researchers at the Center for Biomedical Image Computing and Analytics (CBICA), which develops advanced computational methods to transform biomedical images into diagnostic and predictive tools for personalized medicine. My work focused on designing and developing an AI-powered mobile app for NiChart, a large and diverse collection of MRI images, to enable early detection of aging and neurodegenerative diseases through imaging biomarkers. The app is now in beta testing for clinical integration.
          </div>
        </div>

        <!-- right: images (scrollable) -->
        <div class="modal-5050-right">
          <img src={awardLetter} alt="Award Letter" class="modal-image modal-image-lg" />
          <img src={certification} alt="Certification" class="modal-image" />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    min-width: 600px;
    max-width: 1100px;
    width: 90vw;
    max-height: 80vh;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 24px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }

  .modal-5050-inner {
    display: flex;
    gap: 1.5rem;
    height: 60vh;
  }

  .modal-5050-left,
  .modal-5050-right {
    width: 50%;
    overflow-y: auto;
  }

  .modal-5050-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }

  .modal-image {
    max-width: 100%;
    max-height: 260px;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .modal-image-lg {
    max-height: 60vh;
  }
</style>
