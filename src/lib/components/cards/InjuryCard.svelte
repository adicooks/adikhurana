<script>
  import Card from "../Card.svelte";
  import PiscBackground from "$lib/assets/pisc-bg.png";
</script>

<Card href="https://vanish.so" additionalClasses="hover:scale-100 bg-[#081c5c]">
  <div
    class="px-[22px] py-4 flex flex-col justify-end items-start text-white h-full relative"
  >
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="30px"
      height="30px"
      class="translate-y-6 group-hover:translate-y-0 transition-transform"
      viewBox="0 0 64 64"
      enable-background="new 0 0 64 64"
      xml:space="preserve"
      fill="#ffffff"
      ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g><g id="SVGRepo_iconCarrier">
        <g>
          <path
            fill="#FFFFFF"
            d="M56,46V12c0-0.553-0.447-1-1-1H9c-0.553,0-1,0.447-1,1v34c0,0.553,0.447,1,1,1h46 C55.553,47,56,46.553,56,46z M54,45H10V13h44V45z"
          ></path>
          <path
            fill="#FFFFFF"
            d="M63,49h-3V11c0-2.211-1.789-4-4-4H8c-2.211,0-4,1.789-4,4v38H1c-0.553,0-1,0.447-1,1v3c0,2.211,1.789,4,4,4 h56c2.211,0,4-1.789,4-4v-3C64,49.447,63.553,49,63,49z M6,11c0-1.104,0.896-2,2-2h48c1.104,0,2,0.896,2,2v38H36 c-0.553,0-1,0.447-1,1v1h-6v-1c0-0.553-0.447-1-1-1H6V11z M62,53c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2v-2h25v1 c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-1h25V53z"
          ></path>
        </g>
      </g></svg
    >
    <span
      class="z-10 translate-y-6 group-hover:translate-y-0 transition-transform text-xl mt-1 font-semibold"
      >data.pisc</span
    >
    <p
      class="font-medium translate-y-6 group-hover:translate-y-0 z-10 text-white/80 opacity-0 group-hover:opacity-100 transition"
    >
      injury trends decoded
    </p>
    <img
      class="absolute top-6 -right-20 group-hover:-translate-y-2 transition-transform scale-[1.05]"
      src={PiscBackground}
      alt=""
    />
  </div>
</Card>
