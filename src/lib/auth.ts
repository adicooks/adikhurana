import { browser } from "$app/environment";
import { writable } from "svelte/store";

const AUTH_STORAGE_KEY = "adi-site-authenticated";
const SITE_PASSWORD = "hello";

export const isAuthenticated = writable(false);

export function hydrateAuth() {
  if (!browser) return;

  isAuthenticated.set(window.localStorage.getItem(AUTH_STORAGE_KEY) === "true");
}

export function unlockSite(password: string) {
  const isValid = password === SITE_PASSWORD;

  if (!browser) {
    isAuthenticated.set(isValid);
    return isValid;
  }

  if (isValid) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    isAuthenticated.set(true);
    return true;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  isAuthenticated.set(false);
  return false;
}

export function lockSite() {
  if (browser) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  isAuthenticated.set(false);
}
