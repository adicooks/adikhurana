<script>
  import Card from "./Card.svelte";
  import clsx from "clsx";
  export let soft = false;
  export let photo = "";

  let showModal = false;

  const aboutDescription = `I am entrepreneur with passion for technology, public safety and teaching young students.

At age 12, I launched a sneaker reselling business that grew into six-figure annual sales with 3,000+ Discord community members. Recently, I filed for a patent associated with novel gun threat detection technology, published peer-reviewed research papers on public safety and eldercare, and lead free coding and AI camps for elementary and middle school students to inspire the next generation of builders.

I am fortunate to have an opportunity to collaborate with researchers at Penn’s Injury Science Center on public safety initiatives and at the Perelman School of Medicine on an AI-powered neuroimaging app during my internships.

I’m driven to build innovative technologies that bridge entrepreneurship, research, and social good by creating solutions that help communities like my own become safer, smarter, and more connected.`;
</script>

<Card
  {soft}
  additionalClasses={clsx(
    "hover:scale-100 relative overflow-hidden",
    soft ? "bg-[#F7F7F7]/50" : "bg-[#F7F7F7]"
  )}
  onClick={() => (showModal = true)}
>
  <div class="px-[22px] py-4 flex flex-col justify-end items-start h-full relative group z-10">
    <span class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-white">
      about.adi
    </span>

    <p class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition">
      who am i?
    </p>
  </div>

  {#if photo}
    <img
      class="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-300 z-0"
      src={photo}
      alt="Background"
    />
  {/if}
</Card>

{#if showModal}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    on:click={() => (showModal = false)}
  >
    <div class="modal-content modal-5050" on:click|stopPropagation tabindex="0">
      <button class="modal-close" on:click={() => (showModal = false)} aria-label="Close">×</button>
      <div class="modal-5050-inner">
        <div class="modal-5050-left modal-about-scroll">
          <h2 class="text-2xl font-bold mb-4">About Adi! </h2>
          <pre class="whitespace-pre-wrap text-base text-gray-700">{aboutDescription}</pre>
        </div>
        <div class="modal-5050-right">
          <div class="modal-photo-list">
            <img src="/pictures/adi_pic.jpg" alt="adi_pic" class="modal-photo" />
            <img src="/pictures/teaching5.jpg" alt="Adi Governor" class="modal-photo" />
            <img src="/pictures/iccr.jpg" alt="iccr" class="modal-photo" />
            <img src="/pictures/hindi_piano.JPG" alt="IMG_6744" class="modal-photo" />
            <img src="/pictures/award.jpg" alt="Wagah" class="modal-photo" />
            <img src="/pictures/carnegie.jpg" alt="0D5A7413" class="modal-photo" />
            <img src="/pictures/columbia.jpg" alt="0D5A7417" class="modal-photo" />
            <img src="/pictures/hindi2.JPG" alt="0D5A7451" class="modal-photo" />
            <img src="/pictures/jshs_award.jpg" alt="0D5A8816" class="modal-photo" />
            <img src="/pictures/happy.JPG" alt="0D5A8832" class="modal-photo" />
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
