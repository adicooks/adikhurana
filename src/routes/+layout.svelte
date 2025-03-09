<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import Cursor from "$lib/components/Cursor.svelte";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });

  onMount(() => {
    if ("paintWorklet" in CSS) {
      //@ts-ignore
      CSS.paintWorklet.addModule("/squircle.js");
    }
  });
</script>

<svelte:head>
  <title>adi</title>
  <meta name="description" content="fun guy" />
</svelte:head>
<div class="crt">
  <Cursor />
  <slot />
</div>
