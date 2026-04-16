<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { browser, dev } from "$app/environment";
  import { hydrateAuth, isAuthenticated } from "$lib/auth";
  import Cursor from "$lib/components/Cursor.svelte";
  import Login from "$lib/components/Login.svelte";
  import ScrollingBanner from "$lib/components/ScrollingBanner.svelte";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });

  let authReady = !browser;

  onMount(() => {
    hydrateAuth();
    authReady = true;

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
{#if authReady && $isAuthenticated}
  <div class="crt">
    <ScrollingBanner text="CLICK THE BOXES TO LEARN MORE • CLICK THE PLAY BUTTON FOR WII MUSIC" />
    <Cursor />
    <slot />
  </div>
{:else}
  <Login />
{/if}
