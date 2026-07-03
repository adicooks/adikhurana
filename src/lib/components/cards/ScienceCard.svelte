<script>
  import Card from "../Card.svelte";
  import DetailModal from "../DetailModal.svelte";
  import ScienceBG from "$lib/assets/cards/science-card.webp";

  let showModal = false;

  const paragraphs = [
    "I developed SeniorConnect, a low-cost, wearable, real-time alert system connecting seniors with cognitive disabilities to their caregivers via a custom mobile app and worked on fit from 2022–2024. The system integrates an IoT device, programmed using Python and AWS cloud services, to send instant notifications to a Swift-built iOS app on caregivers' smartphones upon activation by the senior. SeniorConnect was beta tested with seniors and caregivers. This prototype earned top awards at ISEF-affiliated and JSHS national science competitions. This paper has been published in the Journal of Emerging Investigators (JEI).",
    "After SeniorConnect, I developed AlertNow, a patent-pending, low-cost, real-time gunshot and firearm detection system leveraging multi-modal deep learning (CNN, YOLOv8) that notifies authorities in real time to enhance school safety; currently evaluating its commercial viability. This award-winning research was presented at the 2025 IEEE Integrated STEM Education Conference held at Princeton University. The AlertNow research paper was accepted for publication in IEEE Xplore."
  ];

  const photos = [
    { src: "/pictures/adi-coriell-seniorconnect.jpg", alt: "Adi presenting SeniorConnect" },
    { src: "/pictures/Adi-dvsf-2025-pic.jpg", alt: "Adi at the Delaware Valley Science Fair 2025" },
    { src: "/pictures/award.jpg", alt: "Adi receiving a science fair award" },
    { src: "/pictures/dvsf.jpg", alt: "Adi at DVSF" },
    { src: "/pictures/jshs.jpg", alt: "Adi presenting at JSHS" },
    { src: "/pictures/jshs_award.jpg", alt: "Adi receiving the JSHS award" }
  ];
</script>

<Card
  additionalClasses="hover:scale-100 relative overflow-hidden bg-transparent"
  label="Science research details"
  onClick={() => (showModal = true)}
>
  <img
    src={ScienceBG}
    alt=""
    class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
    style="object-position: center 30%;"
    width="640"
    height="854"
    decoding="async"
  />

  <div class="absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-black/10 to-transparent"></div>

  <div class="px-[22px] pb-3 flex flex-col justify-end items-start text-white h-full relative z-[2] group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      class="mb-2 translate-y-6 group-hover:translate-y-0 transition-transform"
      viewBox="0 0 64 64"
      fill="#ffffff"
      aria-hidden="true"
    >
      <g>
        <path d="M56,46V12c0-0.553-0.447-1-1-1H9c-0.553,0-1,0.447-1,1v34c0,0.553,0.447,1,1,1h46 C55.553,47,56,46.553,56,46z M54,45H10V13h44V45z" />
        <path d="M63,49h-3V11c0-2.211-1.789-4-4-4H8c-2.211,0-4,1.789-4,4v38H1c-0.553,0-1,0.447-1,1v3 c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4v-3C64,49.447,63.553,49,63,49z M6,11c0-1.104,0.896-2,2-2h48 c1.104,0,2,0.896,2,2v38H36c-0.553,0-1,0.447-1,1v1h-6v-1c0-0.553-0.447-1-1-1H6V11z M62,53c0,1.104-0.896,2-2,2H4 c-1.104,0-2-0.896-2-2v-2h25v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-1h25V53z" />
      </g>
    </svg>

    <span class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl font-semibold">
      adi.science
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      exploring ideas thru science
    </p>
  </div>
</Card>

{#if showModal}
  <DetailModal title="SeniorConnect & AlertNow" on:close={() => (showModal = false)}>
    <div slot="body" class="flex flex-col gap-4 text-base leading-relaxed text-[#010313]/75">
      {#each paragraphs as paragraph}
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
