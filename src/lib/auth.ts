import { browser } from "$app/environment";
import { writable } from "svelte/store";

const AUTH_STORAGE_KEY = "adi-site-authenticated";
const SITE_PASSWORD = "hello";

// Set to false to disable authentication
export const AUTH_ENABLED = false;

export const isAuthenticated = writable(false);

export function hydrateAuth() {
  if (!browser) return;

  if (!AUTH_ENABLED) {
    isAuthenticated.set(true);
    return;
  }

  isAuthenticated.set(window.localStorage.getItem(AUTH_STORAGE_KEY) === "true");
}

export function unlockSite(password: string) {
  if (!AUTH_ENABLED) {
    isAuthenticated.set(true);
    return true;
  }

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
  if (!AUTH_ENABLED) {
    isAuthenticated.set(true);
    return;
  }

  if (browser) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  isAuthenticated.set(false);
}
