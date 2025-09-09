<script>
  import Card from "../Card.svelte";
  import JordanBackground from "$lib/assets/jordan-bg.jpg";
  let showModal = false;
</script>

<Card
  additionalClasses="hover:scale-100 bg-[#010313]"
  on:click={() => (showModal = true)}
>
  <div
    class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full relative group"
  >
    <svg
      class="absolute top-[70px] left-5 w-[40px] h-[40px] z-20 group-hover:-translate-y-6 transition-transform"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.9871,29.8559c-.5827.2416-1.18.4464-1.7836.6305a19.2488,19.2488,0,0,1-2.39.5714,8.7143,8.7143,0,0,1-1.9717.1448,5.2621,5.2621,0,0,1-2.1139-.5681,4.1281,4.1281,0,0,1-1.96-2.1123,5.1361,5.1361,0,0,1-.11-2.9227,11.8479,11.8479,0,0,1,1.85-4.0986c.5727-.8469,1.2181-1.642,1.8719-2.428q.96-1.1543,1.9466-2.2862a12.4866,12.4866,0,0,0-1.0551,2.2024,8.4194,8.4194,0,0,0-.476,1.9091,4.3,4.3,0,0,0,.262,2.1957,3.5242,3.5242,0,0,0,1.9552,1.8407,5.0891,5.0891,0,0,0,1.8939.3019A14.0442,14.0442,0,0,0,14.88,24.795c1.09-.25,2.1745-.5251,3.2538-.8187C24.7215,22.1838,44.5,16.8589,44.5,16.8589S21.6463,26.68,13.9871,29.8559Z"
        ></path>
      </g>
    </svg>

    <span
      class="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold z-10"
      >ak.soles</span
    >
    <p
      class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition"
    >
      resell, sleep, repeat
    </p>
    <img
      class="absolute top-0.5 right-[-110px] w-[280px] h-[220px] object-cover rounded-md group-hover:-translate-y-2 transition-transform opacity-120"
      src={JordanBackground}
      alt=""
    />
  </div>
</Card>

{#if showModal}
  <div class="modal-backdrop" role="dialog" aria-modal="true" on:click={() => (showModal = false)}>
    <div class="modal-content modal-5050" on:click|stopPropagation tabindex="-1">
      <button class="modal-close" on:click={() => (showModal = false)} aria-label="Close">×</button>
      <div class="modal-5050-inner">
        <div class="modal-5050-left modal-about-scroll">
          <h2 class="text-2xl font-bold mb-4">About</h2>
          <pre class="whitespace-pre-wrap text-base text-gray-700">hello im adi</pre>
        </div>
        <div class="modal-5050-right"></div>
      </div>
    </div>
  </div>
{/if}
