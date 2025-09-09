<script>
  import Card from "../Card.svelte";

  export let text = "representing india";
  export let title = "hindi.usa";
  export let photo = "";
  export let hindidescp =
    'HindiUSA is a non-profit volunteer organization dedicated to teaching Hindi and promoting Indian culture in the U.S., with more than 4,000 students, 450 teachers, 250 student volunteers, and 30 schools nationwide. I graduated from HindiUSA Cherry Hill, NJ, in 2022 after completing nine years of formal Hindi language education.\n\nAfter graduation, I began assisting in teaching 15+ middle and high school students each year—reviewing assignments, reinforcing language skills, and supporting their growth in reading, writing, and speaking. I also help prepare students for cultural programs and poem competitions, promoting awareness of Indian culture while serving as a role model for younger learners.\n\nIn 2023, I was selected as one of 13 HindiUSA Student Ambassadors (from 400+ applicants) for a fully funded two-week cultural and educational immersion trip to India. During this program, I engaged with senior Indian government officials, collaborated with local high school students, and shared perspectives on Hindi education in the U.S. with national media, while also gaining firsthand insights into India’s K–12 system.';

  export let modalTitle = "Teaching Assisstant & Student Ambassador";
  let showModal = false;
</script>

<Card
  additionalClasses="hover:scale-100 relative overflow-hidden bg-transparent"
  onClick={() => (showModal = true)}
>
  {#if photo}
    <img
      src={photo}
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
    />
  {/if}

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
      {title}
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      {text}
    </p>
  </div>
</Card>

{#if showModal}
  <div class="modal-backdrop" on:click={() => (showModal = false)}>
    <div class="modal-content" on:click|stopPropagation tabindex="0">
      <button class="modal-close" on:click={() => (showModal = false)} aria-label="Close">×</button>

      <div class="modal-5050-inner">
        <div class="modal-5050-left">
          <h2 class="text-2xl font-bold mb-4">{modalTitle}</h2>
          <div class="whitespace-pre-wrap text-lg text-gray-700">
            {hindidescp}
          </div>
        </div>

        <div class="modal-5050-right">
            <img src="/pictures/hindi_piano.JPG" alt="adi_pic" class="modal-photo" />
            <img src="/pictures/hindi-COLLAGE.jpg" alt="Adi Governor" class="modal-photo" />
            <img src="/pictures/hindi-iccr.jpg" alt="iccr" class="modal-photo" />
            <img src="/pictures/iccr.jpg" alt="IMG_6744" class="modal-photo" />
            <img src="/pictures/wagah.jpg" alt="Wagah" class="modal-photo" />
            <img src="/pictures/hindi2.JPG" alt="0D5A7413" class="modal-photo" />
            <img src="/pictures/happy.JPG" alt="0D5A7417" class="modal-photo" />
            <img src="/pictures/Adi-Governor-AnandiBen.jpeg" alt="0D5A7451" class="modal-photo" />
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
</style>
