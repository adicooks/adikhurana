<script>
  import Card from "../Card.svelte";
  import Disc from "$lib/assets/disc.png";

  let showModal = false;
  const resumeUrl = "/Adi_Khurana_Resume.pdf";

  function openModal(event) {
    event.preventDefault();
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<Card additionalClasses="bg-[#F7F7F7] cursor-pointer">
  <div
    class="flex flex-col items-center justify-center relative"
    on:click|preventDefault={openModal}
  >
    <img
      class="relative -right-16 w-28 h-28 m-auto group-hover:rotate-180 duration-300"
      src={Disc}
      alt="Disc"
    />
    <p
      class="absolute bottom-4 left-[22px] text-lg text-[#010313]/50 font-bold"
    >
      view my resume
    </p>
  </div>
</Card>

{#if showModal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    on:click={closeModal}
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-[70%] h-[85%] flex flex-col relative"
      on:click|stopPropagation
    >
      <button
        class="absolute top-3 right-3 text-xl font-bold"
        on:click={closeModal}>&times;</button
      >
      <iframe
        src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        class="w-full h-full border-none rounded-md bg-white"
        frameborder="0"
        style="background-color: white;"
      ></iframe>
    </div>
  </div>
{/if}
