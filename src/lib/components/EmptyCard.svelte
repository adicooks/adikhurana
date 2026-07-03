<script>
  import Card from "./Card.svelte";

  export let soft = false;
</script>

<Card
  {soft}
  additionalClasses={soft ? "bg-[#F7F7F7]/50" : "bg-[#F7F7F7]"}
>
  <p class="m-auto text-xl font-bold text-[#CFD0D8] animate-pulse">adi.khurana</p>
</Card>
