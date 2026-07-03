<script>
  import Card from "../Card.svelte";
  import DetailModal from "../DetailModal.svelte";
  import PiscBG from "$lib/assets/pisc-bg.png";

  let showModal = false;
  /** @type {HTMLElement | null} */
  let origin = null;

  /** @param {Event} e */
  function open(e) {
    origin = /** @type {HTMLElement} */ (e.currentTarget);
    showModal = true;
  }

  const paragraphs = [
    "Philadelphia faces acute challenges with firearm violence, disproportionately affecting young people of color in vulnerable communities, both as victims and as perpetrators.",
    "Through my PISC internship with the Penn Community Violence Prevention Program, I visit West Philadelphia communities, including local high schools, with PISC social workers to identify and connect with individuals at highest risk. I also analyze shooting incidents to uncover demographic, spatial, and temporal patterns, generating actionable insights for violence prevention strategies and timely public health interventions."
  ];
</script>

<Card
  additionalClasses="bg-[#081c5c]"
  label="Penn Injury Science Center internship details"
  onClick={open}
>
  <div class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full relative group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      class="translate-y-6 group-hover:translate-y-0 transition-transform"
      viewBox="0 0 64 64"
      fill="#ffffff"
      aria-hidden="true"
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

    <span class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold">
      adi.pisc
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      injury trends decoded
    </p>

    <img
      class="absolute top-6 -right-20 group-hover:-translate-y-2 transition-transform scale-[1.05]"
      src={PiscBG}
      alt=""
      width="640"
      height="426"
      decoding="async"
    />
  </div>
</Card>

{#if showModal}
  <DetailModal
    title="Data Analyst & Social Worker Intern, Penn Injury Science Center"
    {origin}
    on:close={() => (showModal = false)}
  >
    <div slot="body" class="flex flex-col gap-4 text-base leading-relaxed text-[#010313]/75">
      {#each paragraphs as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    <svelte:fragment slot="media">
      <img
        src="/pictures/contract.png"
        alt="PISC internship award letter"
        class="detail-modal-photo"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/pictures/certificate.png"
        alt="PISC internship certificate"
        class="detail-modal-photo"
        loading="lazy"
        decoding="async"
      />
    </svelte:fragment>
  </DetailModal>
{/if}
