<script>
  import Card from "./Card.svelte";
  export let soft = false;
  import clsx from "clsx";

  // function randomHue() {
  //   return Math.floor(Math.random() * 360);
  // }

  // const hue = randomHue();
  // const color = `hsl(${hue}, 100%, 50%)`;
</script>

<Card
  {soft}
  additionalClasses={clsx(
    "hover:scale-100",
    soft ? "bg-[#F7F7F7]/50" : "bg-[#F7F7F7]"
  )}
>
  <p class="m-auto text-center text-xl font-bold text-[#CFD0D8]">
    adi.khurana<br />
    moorestown, nj
  </p>
</Card>
