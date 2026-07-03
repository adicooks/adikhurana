<script>
  export let additionalClasses = "";
  export let soft = false;
  export let href = "";
  export let external = false;
  export let label = "";
  export let onClick = undefined;

  import clsx from "clsx";

  $: interactive = Boolean(href || onClick);
  $: classes = clsx(
    "rounded-3xl flex relative w-64 h-36 group transition-transform text-left",
    interactive && "hover:scale-[1.01] cursor-pointer",
    additionalClasses,
    soft ? "soft-channel-shadow" : "channel-shadow"
  );
</script>

{#if href}
  <a
    {href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    class={classes}
    aria-label={label || undefined}
    on:click
  >
    <div class="overflow-hidden flex relative w-full rounded-3xl">
      <slot />
    </div>
  </a>
{:else if onClick}
  <button type="button" class={classes} aria-label={label || undefined} on:click={onClick}>
    <div class="overflow-hidden flex relative w-full rounded-3xl">
      <slot />
    </div>
  </button>
{:else}
  <div class={classes}>
    <div class="overflow-hidden flex relative w-full rounded-3xl">
      <slot />
    </div>
  </div>
{/if}
