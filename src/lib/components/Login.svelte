<script lang="ts">
  import { onMount } from "svelte";
  import { unlockSite } from "$lib/auth";

  let password = "";
  let error = "";
  let passwordInput: HTMLInputElement | null = null;

  function handleSubmit() {
    error = "";

    if (unlockSite(password.trim())) {
      password = "";
      return;
    }

    error = "Wrong password";
    password = "";
    passwordInput?.focus();
  }

  onMount(() => {
    passwordInput?.focus();
  });
</script>

<div class="auth-screen">
  <div class="auth-panel channel-shadow">
    <p class="auth-eyebrow">private access</p>
    <h1 class="auth-title">Enter password to view the site</h1>
    <p class="auth-copy">The homepage stays hidden until the correct password is entered.</p>

    <form class="mt-8 flex flex-col gap-3" on:submit|preventDefault={handleSubmit}>
      <label class="auth-label" for="site-password">Password</label>
      <input
        bind:this={passwordInput}
        bind:value={password}
        id="site-password"
        type="password"
        autocomplete="current-password"
        class="auth-input"
        placeholder="Enter password"
      />

      <button class="auth-button" type="submit">Unlock</button>
    </form>

    {#if error}
      <p class="auth-error" role="alert">{error}</p>
    {/if}
  </div>
</div>
