<script>
  export let text = "Promo";

  const repeats = Array(6).fill(text);
</script>

<div class="banner-container bg-neutral-300 text-black overflow-hidden">
  <div class="banner-scroll">
    <div class="banner-track">
      {#each [false, true] as isCopy}
        <div class="banner-content font-bold" aria-hidden={isCopy}>
          {#each repeats as item}
            <span>{item}</span>
            <span class="banner-sep" aria-hidden="true">•</span>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .banner-container {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }

  .banner-scroll {
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .banner-track {
    display: flex;
    width: fit-content;
  }

  .banner-content {
    display: flex;
    gap: 0.75rem;
    white-space: nowrap;
    animation: scroll 22.5s linear infinite;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    padding: 0.5rem 0;
    padding-right: 0.75rem;
    flex-shrink: 0;
  }

  .banner-sep {
    opacity: 0.6;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .banner-content {
      animation: none;
    }
  }
</style>
