<script>
  import Card from "../Card.svelte";
  import WithCoverageLogo from "$lib/assets/withcoverage-logo.png";
</script>

<a href="https://www.withcoverage.com/" target="_blank" rel="noopener noreferrer">
  <Card additionalClasses="hover:scale-100 bg-[#0a1418] cursor-pointer">
    <div class="relative flex h-full w-full flex-col justify-between overflow-hidden px-[22px] py-4 text-white">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(174,172,246,0.38),transparent_31%),radial-gradient(circle_at_86%_20%,rgba(247,247,247,0.14),transparent_25%),linear-gradient(140deg,#061114_0%,#132327_48%,#090f17_100%)]"
        aria-hidden="true"
      />
      <div
        class="absolute right-0 top-0 h-24 w-24 rounded-bl-[42px] bg-[#aeacf6]/18 blur-[1px]"
        aria-hidden="true"
      />
      <div class="absolute inset-x-0 bottom-0 h-px bg-[#aeacf6]/45" aria-hidden="true" />
      <div class="absolute left-5 right-5 top-[72px] space-y-2 opacity-55" aria-hidden="true">
        <div class="h-px w-full bg-white/18" />
        <div class="h-px w-4/5 bg-[#aeacf6]/30" />
        <div class="h-px w-2/3 bg-white/14" />
      </div>
      <div class="absolute bottom-4 right-5 flex items-end gap-1.5 opacity-65" aria-hidden="true">
        <div class="h-5 w-2 rounded-full bg-[#aeacf6]" />
        <div class="h-9 w-2 rounded-full bg-white/35" />
        <div class="h-7 w-2 rounded-full bg-[#aeacf6]/70" />
        <div class="h-12 w-2 rounded-full bg-white/25" />
      </div>

      <div class="relative z-10 flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-lg shadow-black/20">
          <img
            class="h-6 w-6"
            src={WithCoverageLogo}
            alt="WithCoverage"
            width="96"
            height="96"
            decoding="async"
          />
        </span>
        <span class="text-lg font-semibold leading-5 tracking-normal text-[#f7f7f7]">
          withcoverage
        </span>
      </div>

      <div class="relative z-10 flex flex-col items-start">
        <span class="translate-y-6 text-xl font-semibold transition-transform group-hover:translate-y-0">
          adi.wc
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
