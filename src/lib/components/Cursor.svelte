<script lang="ts">
  import clsx from "clsx";
  import { onMount } from "svelte";

  let left = "0";
  let top = "0";
  let clicked = false;
  let visible = false;

  onMount(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      visible = true;

      animationFrameId = requestAnimationFrame(() => {
        left = e.pageX + "px";
        top = e.pageY + "px";
      });
    };

    const handleMouseDown = () => (clicked = true);
    const handleMouseUp = () => (clicked = false);
    const handleMouseEnter = () => (visible = true);
    const handleMouseLeave = () => (visible = false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
</script>

<img
  style="left: {left}; top: {top}; display: {visible ? 'block' : 'none'}"
  class={clsx(
    "crt absolute drop-shadow-md z-10 pointer-events-none origin-top-left transition-transform opacity-0 md:opacity-50",
    clicked && "scale-105"
  )}
  src="/trail.svg"
  alt=""
/>
