<script>
  export let additionalClasses = "";
  export let soft = false;
  export let onClick = () => {};

  import clsx from "clsx";
</script>

<div
  class={clsx(
    "rounded-3xl flex relative w-64 h-36 group hover:scale-[1.01] transition-transform cursor-pointer",
    additionalClasses,
    soft ? "soft-channel-shadow" : "channel-shadow"
  )}
  role="button"
  tabindex="0"
  aria-label="Open card popup"
  on:click={onClick}
  on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
>
  <div class="overflow-hidden flex relative w-full rounded-3xl">
    <slot />
  </div>
</div>
