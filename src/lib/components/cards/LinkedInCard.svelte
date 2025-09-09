<script>
  import Card from "../Card.svelte";
  import Pfp from "$lib/assets/adi.png";

  export let text = "my resume, but cooler";
  export let photo = "";
</script>

<a href="https://www.linkedin.com/in/adi-khurana1/" target="_blank" rel="noopener noreferrer">
  <Card additionalClasses="hover:scale-100 bg-[#091f2d] cursor-pointer">
    <div class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full">
      <img
        class="translate-y-6 group-hover:translate-y-0 transition-transform z-10"
        src={Pfp}
        width="30"
        height="30"
        alt="LinkedIn Profile"
      />
      <span
        class="translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-white-800 z-10"
        >adi.lnkd</span
      >
      <p
        class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white-800/80 opacity-0 group-hover:opacity-100 transition"
      >
        {text}
      </p>
      {#if photo}
        <img
          class="absolute top-1 -right-16 group-hover:-translate-y-2 transition-transform"
          src={photo}
          alt=""
        />
      {/if}
    </div>
  </Card>
</a>
