<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { browser, dev } from "$app/environment";
  import { page } from "$app/stores";
  import { hydrateAuth, isAuthenticated } from "$lib/auth";
  import Cursor from "$lib/components/Cursor.svelte";
  import Login from "$lib/components/Login.svelte";
  import ScrollingBanner from "$lib/components/ScrollingBanner.svelte";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  injectAnalytics({ mode: dev ? "development" : "production" });

  let authReady = !browser;

  $: isPublicResumeRoute = $page.url.pathname.startsWith("/adi-khurana-resume");

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
{#if isPublicResumeRoute}
  <slot />
{:else if authReady && $isAuthenticated}
  <div class="crt">
    <ScrollingBanner text="CLICK THE BOXES TO LEARN MORE • CLICK THE PLAY BUTTON FOR WII MUSIC" />
    <Cursor />
    <slot />
  </div>
{:else}
  <Login />
{/if}
