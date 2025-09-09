<script>
  import Card from "../Card.svelte";
  import JordanBackground from "$lib/assets/jordan-bg.jpg";
</script>

<a
  href="https://adicooks.com/"
  target="_blank"
  rel="noopener noreferrer"
  class="block w-full h-full"
>
  <Card additionalClasses="hover:scale-100 bg-[#010313] relative overflow-hidden cursor-pointer">
    <!-- background image -->
    <img
  class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none transform translate-x-[40px]"
  src={JordanBackground}
  alt="Sneaker background"
    />

    <!-- dark gradient overlay -->
    <div class="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

    <!-- foreground content -->
    <div
      class="px-[22px] pb-3 flex flex-col justify-end items-start text-white h-full relative z-[2] group"
    >
      <svg
        class="mb-2 translate-y-6 group-hover:translate-y-0 transition-transform w-[36px] h-[36px]"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#ffffff"
      >
        <path
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.9871,29.8559c-.5827.2416-1.18.4464-1.7836.6305a19.2488,19.2488,0,0,1-2.39.5714,8.7143,8.7143,0,0,1-1.9717.1448,5.2621,5.2621,0,0,1-2.1139-.5681,4.1281,4.1281,0,0,1-1.96-2.1123,5.1361,5.1361,0,0,1-.11-2.9227,11.8479,11.8479,0,0,1,1.85-4.0986c.5727-.8469,1.2181-1.642,1.8719-2.428q.96-1.1543,1.9466-2.2862a12.4866,12.4866,0,0,0-1.0551,2.2024,8.4194,8.4194,0,0,0-.476,1.9091,4.3,4.3,0,0,0,.262,2.1957,3.5242,3.5242,0,0,0,1.9552,1.8407,5.0891,5.0891,0,0,0,1.8939.3019A14.0442,14.0442,0,0,0,14.88,24.795c1.09-.25,2.1745-.5251,3.2538-.8187C24.7215,22.1838,44.5,16.8589,44.5,16.8589S21.6463,26.68,13.9871,29.8559Z"
        />
      </svg>

      <span class="translate-y-6 group-hover:translate-y-0 transition-transform text-xl font-semibold">
        ak.soles
      </span>
      <p class="font-medium translate-y-6 group-hover:translate-y-0 text-white/80 opacity-0 group-hover:opacity-100 transition">
        resell, sleep, repeat
      </p>
    </div>
  </Card>
</a>
