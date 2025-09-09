<script>
  import Card from "./Card.svelte";
  import clsx from "clsx";
  export let soft = false;

  // add this so you can pass a bg image
  export let photo = "";

  let showModal = false;

  const aboutDescription = `In my community, middle and elementary public schools lack computer science curriculum, leaving students without early exposure to coding, or a supportive tech community.

To address this gap, I co-founded For Kids By Kids, an organization where we created peer-led coding camps to teach students Scratch, Python, and AI fundamentals. We have taught more than 120 elementary and middle school students through free, in-person sessions at local public libraries. Designed to ignite curiosity in technology, these high-demand camps introduce students to foundational coding, problem-solving, and creative thinking skills.

With guidance from an industry mentor, we developed customized training materials built around real-life projects. Camps are intentionally small (15–20 students per session) to ensure personalized instruction, while interactive tools like Kahoot and Blooket keep classes engaging and fun.

We are now scaling this initiative by cultivating camp alumni as peer leaders and empowering them to carry the baton and expand coding opportunities for younger students across the broader community. View more @ https://forkidsbykids.org/`;
</script>

<Card
  {soft}
  additionalClasses={clsx("hover:scale-100 bg-[#081c5c] text-white")}
  onClick={() => (showModal = true)}
>
  <!-- keep this relative so the absolute image anchors correctly -->
  <div class="px-[22px] py-4 flex flex-col justify-end items-start h-full relative group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      class="translate-y-6 group-hover:translate-y-0 transition-transform"
      viewBox="0 0 64 64"
      fill="#ffffff"
      aria-hidden="true"
    >
      <g>
        <path d="M56,46V12c0-0.553-0.447-1-1-1H9c-0.553,0-1,0.447-1,1v34c0,0.553,0.447,1,1,1h46 C55.553,47,56,46.553,56,46z M54,45H10V13h44V45z" />
        <path d="M63,49h-3V11c0-2.211-1.789-4-4-4H8c-2.211,0-4,1.789-4,4v38H1c-0.553,0-1,0.447-1,1v3 c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4v-3C64,49.447,63.553,49,63,49z M6,11c0-1.104,0.896-2,2-2h48 c1.104,0,2,0.896,2,2v38H36c-0.553,0-1,0.447-1,1v1h-6v-1c0-0.553-0.447-1-1-1H6V11z M62,53c0,1.104-0.896,2-2,2H4 c-1.104,0-2-0.896-2-2v-2h25v1 c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-1h25V53z" />
      </g>
    </svg>

    <span class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold">
      teaching.kids
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      building for kids by kids
    </p>

    {#if photo}
      <img
        class="absolute -top-8 -right-10 group-hover:-translate-y-2 transition-transform scale-[1.75] z-0"
        src={photo}
        alt="Background"
      />
    {/if}
  </div>
</Card>

{#if showModal}
  <div class="modal-backdrop" role="dialog" aria-modal="true" on:click={() => (showModal = false)}>
    <div class="modal-content modal-5050" on:click|stopPropagation tabindex="0">
      <button class="modal-close" on:click={() => (showModal = false)} aria-label="Close">×</button>
      <div class="modal-5050-inner">
        <div class="modal-5050-left modal-about-scroll">
          <h2 class="text-2xl font-bold mb-4">Co-Founder &amp; Lead Instructor </h2>
          <pre class="whitespace-pre-wrap text-base text-gray-700">{aboutDescription}</pre>
        </div>
        <div class="modal-5050-right">
          <div class="modal-photo-list">
            <img src="/pictures/teaching1.jpg" alt="teaching1" class="modal-photo" />
            <img src="/pictures/teaching2.jpg" alt="teaching2" class="modal-photo" />
            <img src="/pictures/teaching3.jpg" alt="teaching3" class= "modal-photo" />
            <img src="/pictures/teaching4.jpg" alt="teaching4" class="modal-photo" />
            <img src="/pictures/teaching5.jpg" alt="teaching5" class="modal-photo" />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
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
  max-width: 900px;
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
  height: 100%;
}

.modal-5050-left {
  width: 50%;
  padding-right: 2rem;
  overflow-y: auto;
}

.modal-5050-right {
  width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.modal-photo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 60vh;
  overflow-y: auto;
  align-items: center;
  width: 100%;
}

.modal-photo {
  max-width: 90%;
  max-height: 200px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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

.modal-about-scroll {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
