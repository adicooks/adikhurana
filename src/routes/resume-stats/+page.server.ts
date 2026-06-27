import { createHash } from "node:crypto";
import { fail, type Actions, type Cookies } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import {
  getResumeAnalyticsSummary,
  isResumeAnalyticsConfigured
} from "$lib/server/resumeAnalytics";
import type { PageServerLoad } from "./$types";

const AUTH_COOKIE = "resume-stats-auth";

function getStatsPassword() {
  return env.RESUME_STATS_PASSWORD || "";
}

function getAuthToken() {
  const password = getStatsPassword();
  if (!password) return "";

  return createHash("sha256").update(`resume-stats:${password}`).digest("hex");
}

function isAuthenticated(cookies: Cookies) {
  const token = getAuthToken();
  return Boolean(token && cookies.get(AUTH_COOKIE) === token);
}

export const load: PageServerLoad = async ({ cookies }) => {
  const passwordConfigured = Boolean(getStatsPassword());
  const databaseConfigured = isResumeAnalyticsConfigured();
  const authenticated = passwordConfigured && isAuthenticated(cookies);

  return {
    passwordConfigured,
    databaseConfigured,
    authenticated,
    summary: authenticated && databaseConfigured ? await getResumeAnalyticsSummary() : null
  };
};

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const password = getStatsPassword();
    if (!password) {
      return fail(500, { error: "Set RESUME_STATS_PASSWORD in Vercel first." });
    }

    const formData = await request.formData();
    const submittedPassword = String(formData.get("password") || "");

    if (submittedPassword !== password) {
      return fail(401, { error: "Wrong password." });
    }

    cookies.set(AUTH_COOKIE, getAuthToken(), {
      path: "/resume-stats",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30
    });

    return { success: true };
  },
  logout: async ({ cookies }) => {
    cookies.delete(AUTH_COOKIE, { path: "/resume-stats" });
    return { success: true };
  }
};
