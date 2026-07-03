<script>
  import Card from "../Card.svelte";
</script>

<a href="https://www.withcoverage.com/" target="_blank" rel="noopener noreferrer">
  <Card additionalClasses="hover:scale-100 bg-[#07131f] cursor-pointer">
    <div class="relative flex h-full w-full flex-col justify-end overflow-hidden px-[22px] py-4 text-white">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(36,151,255,0.34),transparent_30%),linear-gradient(135deg,#07131f_0%,#112a3a_46%,#05211a_100%)]"
        aria-hidden="true"
      />
      <div
        class="absolute right-3 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold tracking-normal text-white ring-1 ring-white/20 transition-transform group-hover:-translate-y-1"
        aria-hidden="true"
      >
        wc
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-12 opacity-70" aria-hidden="true">
        <div class="absolute bottom-0 left-5 h-8 w-5 rounded-t-sm bg-white/10" />
        <div class="absolute bottom-0 left-12 h-12 w-7 rounded-t-sm bg-white/15" />
        <div class="absolute bottom-0 left-24 h-7 w-8 rounded-t-sm bg-white/10" />
        <div class="absolute bottom-0 right-16 h-10 w-6 rounded-t-sm bg-white/15" />
        <div class="absolute bottom-0 right-7 h-6 w-8 rounded-t-sm bg-white/10" />
      </div>

      <div class="relative z-10 flex flex-col items-start">
        <span class="translate-y-6 text-xl font-semibold transition-transform group-hover:translate-y-0">
          withcoverage
        </span>
        <p
          class="translate-y-6 text-sm font-medium leading-5 text-white/75 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          swe intern in nyc this summer
        </p>
      </div>
    </div>
  </Card>
</a>
