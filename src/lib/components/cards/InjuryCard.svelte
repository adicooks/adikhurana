<script>
  import Card from "../Card.svelte";

  export let text = "injury trends decoded";
  export let title = "data.pisc";
  export let piscDescription = `Philadelphia faces acute challenges with firearm violence, disproportionately affecting young people of color in vulnerable communities, both as victims and as perpetrators.

Through my PISC internship with the Penn Community Violence Prevention Program, I visit West Philadelphia communities, including local high schools, with PISC social workers to identify and connect with individuals at highest risk. I also analyze shooting incidents to uncover demographic, spatial, and temporal patterns, generating actionable insights for violence prevention strategies and timely public health interventions.`;

  export let photo = "";

  const awardLetter = "/pictures/contract.png";
  const certification = "/pictures/certificate.png";

  let showModal = false;
</script>

<Card additionalClasses="hover:scale-100 bg-[#081c5c]" onClick={() => (showModal = true)}>
  <div class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full relative group">
    <!-- icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      class="translate-y-6 group-hover:translate-y-0 transition-transform"
      viewBox="0 0 64 64"
      fill="#ffffff"
    >
      <g>
        <path
          fill="#FFFFFF"
          d="M56,46V12c0-0.553-0.447-1-1-1H9c-0.553,0-1,0.447-1,1v34c0,0.553,0.447,1,1,1h46
             C55.553,47,56,46.553,56,46z M54,45H10V13h44V45z"
        />
        <path
          fill="#FFFFFF"
          d="M63,49h-3V11c0-2.211-1.789-4-4-4H8c-2.211,0-4,1.789-4,4v38H1c-0.553,0-1,0.447-1,1v3
             c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4v-3C64,49.447,63.553,49,63,49z M6,11c0-1.104,0.896-2,2-2h48
             c1.104,0,2,0.896,2,2v38H36c-0.553,0-1,0.447-1,1v1h-6v-1c0-0.553-0.447-1-1-1H6V11z M62,53c0,1.104-0.896,2-2,2H4
             c-1.104,0-2-0.896-2-2v-2h25v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-1h25V53z"
        />
      </g>
    </svg>

    <!-- card title -->
    <span class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold">
      {title}
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      {text}
    </p>

    {#if photo}
      <img
        class="absolute top-6 -right-20 group-hover:-translate-y-2 transition-transform scale-[1.05]"
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
        <div class="modal-5050-left">
          <h2 class="text-2xl font-bold mb-4">
            Data Analyst &amp; Social Worker Intern,<br />Penn Injury Science Center
          </h2>
          <div class="whitespace-pre-wrap text-lg text-gray-700">
            {piscDescription}
          </div>
        </div>

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
    box-shadow: 0 2px 24px rgba(0,0,0,0.2);
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
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .modal-image-lg {
    max-height: 60vh;
  }
</style>
