<script>
  import Card from "../Card.svelte";
  import Disc from "$lib/assets/disc.png";

  import ResumePDF from "$lib/assets/Adi_Khurana_Resume.pdf";
</script>

<Card additionalClasses="bg-[#F7F7F7] cursor-pointer">
  <a
    href={ResumePDF}
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col items-center justify-center relative w-full h-full"
  >
    <img
      class="w-28 h-28 m-auto group-hover:rotate-180 duration-300"
      src={Disc}
      alt="Disc"
    />
    <p
      class="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg text-[#010313]/50 font-bold"
    >
      view my resume
    </p>
  </a>
</Card>
