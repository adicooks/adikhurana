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

  const siteUrl = "https://adicooks.vercel.app";
  const title = "adi khurana";
  const description =
    "Adi Khurana — builder, researcher, and teacher. A Wii Menu-inspired portfolio of engineering, public-safety research, and entrepreneurship.";

  const personSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adi Khurana",
    url: siteUrl,
    email: "mailto:theadikhurana@gmail.com",
    sameAs: [
      "https://github.com/adicooks",
      "https://www.linkedin.com/in/adi-khurana1/",
      "https://www.chess.com/member/adicooks"
    ]
  });

  let authReady = !browser;

  $: isPublicRoute =
    $page.url.pathname.startsWith("/adi-khurana-resume") ||
    $page.url.pathname.startsWith("/resume-stats");

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
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="theme-color" content="#EEEEEE" />
  <link rel="canonical" href={siteUrl + $page.url.pathname} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="adi khurana" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={siteUrl + $page.url.pathname} />
  <meta property="og:image" content="{siteUrl}/og.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{siteUrl}/og.png" />

  {@html `<script type="application/ld+json">${personSchema}</script>`}
</svelte:head>

{#if isPublicRoute}
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
