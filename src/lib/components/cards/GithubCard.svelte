<script>
  import Card from "../Card.svelte";
  import Github from "$lib/assets/github.svg";

  export let text = "pip install code";
  export let photo = "";
</script>

<a href="https://github.com/adicooks" target="_blank" rel="noopener noreferrer">
  <Card additionalClasses="hover:scale-100 bg-[#010313] cursor-pointer">
    <div class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full">
      <img
        class="translate-y-6 group-hover:translate-y-0 transition-transform"
        src={Github}
        width="30"
        height="30"
        alt="GitHub Logo"
      />
      <span
        class="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold"
        >adicooks.git</span
      >
      <p
        class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition"
      >
        {text}
      </p>
      {#if photo}
        <img
          class="absolute top-5 left-20 w-[256px] h-[158px] group-hover:-translate-y-2 transition-transform opacity-60"
          src={photo}
          alt="Background"
        />
      {/if}
    </div>
  </Card>
</a>
