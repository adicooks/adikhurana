<script>
  import Card from "../Card.svelte";
  import GalaxyBg from "$lib/assets/galaxygmails-bg.png";
</script>

<Card
  href="https://www.poof.io/@galaxygmails"
  additionalClasses="hover:scale-100 bg-[#322074]"
>
  <div
    class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Gmail"
      role="img"
      viewBox="0 0 512 512"
      class="absolute bottom-[40px] left-5 z-20 group-hover:-translate-y-6 transition-transform"
      width="35px"
      height="35px"
      fill="#000000"
      ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g><g id="SVGRepo_iconCarrier"
        ><rect></rect><path
          d="M158 391v-142l-82-63V361q0 30 30 30"
          fill="#4285f4"
        ></path><path
          d="M 154 248l102 77l102-77v-98l-102 77l-102-77"
          fill="#ea4335"
        ></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"
        ></path><path
          d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26"
          fill="#c5221f"
        ></path><path
          d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26"
          fill="#fbbc04"
        ></path></g
      ></svg
    >
    <span
      class="translate-y-6 z-10 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold text-white"
      >galaxy.gmails</span
    >
    <p
      class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition"
    >
      bots approved here
    </p>
    <img
      class="absolute -top-12 -right-10 group-hover:-translate-y-2 transition-transform scale-[1.75]"
      src={GalaxyBg}
      alt=""
    />
  </div>
</Card>
