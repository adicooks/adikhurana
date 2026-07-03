<script>
  import Card from "../Card.svelte";
  import Github from "$lib/assets/github.svg";

  export let text = "pip install code";
</script>

<a href="https://github.com/adicooks" target="_blank" rel="noopener noreferrer">
  <Card additionalClasses="hover:scale-100 bg-[#010313] cursor-pointer">
    <div class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full">
      <img
        class="relative z-10 translate-y-6 group-hover:translate-y-0 transition-transform"
        src={Github}
        width="30"
        height="30"
        alt="GitHub Logo"
        decoding="async"
      />
      <span
        class="relative z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold"
        >adicooks.git</span
      >
      <p
        class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition"
      >
        {text}
      </p>
      <img
        class="absolute -right-14 top-5 z-0 h-[84px] w-[638px] max-w-none opacity-65 transition-transform group-hover:-translate-y-2"
        src="/api/github-contributions.svg"
        alt=""
        width="686"
        height="88"
        decoding="async"
      />
    </div>
  </Card>
</a>
