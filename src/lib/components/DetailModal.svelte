<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { fade } from "svelte/transition";

  export let title = "";
  /** The card element the modal zooms out of, Wii channel-style. @type {HTMLElement | null} */
  export let origin = null;

  const dispatch = createEventDispatcher();
  /** @type {HTMLDivElement | null} */
  let dialogEl = null;

  /**
   * Wii channel-zoom: FLIP from the clicked card's rect to the dialog's
   * final rect. Falls back to a plain fade without an origin or when the
   * user prefers reduced motion.
   * @param {HTMLElement} node
   */
  function channelZoom(node, { duration = 380 } = {}) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !origin) {
      return { duration: 150, css: (/** @type {number} */ t) => `opacity: ${t}` };
    }

    const to = node.getBoundingClientRect();
    const from = origin.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const sx = from.width / to.width;
    const sy = from.height / to.height;

    return {
      duration,
      easing: cubicOut,
      css: (/** @type {number} */ t, /** @type {number} */ u) => `
        transform: translate(${u * dx}px, ${u * dy}px) scale(${sx + (1 - sx) * t}, ${sy + (1 - sy) * t});
        opacity: ${Math.min(1, 0.35 + t)};
      `
    };
  }

  function close() {
    dispatch("close");
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e) {
    if (e.key === "Escape") close();
  }

  onMount(() => {
    const previouslyFocused = document.activeElement;
    dialogEl?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
  <button
    type="button"
    class="absolute inset-0 bg-[#010313]/40 backdrop-blur-[2px]"
    aria-label="Close dialog"
    transition:fade={{ duration: 150 }}
    on:click={close}
  />

  <div
    bind:this={dialogEl}
    role="dialog"
    aria-modal="true"
    aria-label={title}
    tabindex="-1"
    class="channel-shadow relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden whitespace-normal rounded-3xl bg-[#F7F7F7] outline-none"
    in:channelZoom
    out:channelZoom={{ duration: 260 }}
  >
    <div class="flex items-center justify-between gap-4 border-b border-[#010313]/10 px-6 py-4 sm:px-8">
      <h2 class="text-xl font-semibold text-[#010313] sm:text-2xl">{title}</h2>
      <button
        type="button"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-[#010313]/60 ring-1 ring-[#C5C7CA] transition hover:bg-[#EEEEEE] hover:text-[#010313]"
        aria-label="Close"
        on:click={close}
      >
        ×
      </button>
    </div>

    <div class="flex min-h-0 flex-col gap-6 overflow-y-auto p-6 sm:flex-row sm:p-8">
      <div class="min-w-0 sm:flex-1 sm:overflow-y-auto">
        <slot name="body" />
      </div>

      {#if $$slots.media}
        <div class="flex shrink-0 flex-col items-center gap-4 sm:w-2/5 sm:overflow-y-auto">
          <slot name="media" />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.detail-modal-photo) {
    max-width: 100%;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(1, 3, 19, 0.12);
  }
</style>
