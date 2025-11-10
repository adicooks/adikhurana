<script>
  export let text = "Promo";
</script>

<div class="banner-container bg-neutral-300 text-black overflow-hidden">
  <div class="banner-scroll">
    <div class="banner-track">
      <div class="banner-content font-bold">
        {text} • {text} • {text} • {text} • {text} • {text}
      </div>
      <div class="banner-content font-bold" aria-hidden="true">
        {text} • {text} • {text} • {text} • {text} • {text}
      </div>
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
    white-space: nowrap;
    animation: scroll 22.5s linear infinite;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    padding: 0.5rem 0;
    flex-shrink: 0;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
