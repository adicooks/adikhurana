import { json, type RequestHandler } from "@sveltejs/kit";
import { isResumeAnalyticsConfigured, recordResumeEvent } from "$lib/server/resumeAnalytics";

export const POST: RequestHandler = async ({ request }) => {
  if (!isResumeAnalyticsConfigured()) {
    return json({ ok: false, error: "database_not_configured" }, { status: 503 });
  }

  try {
    const payload = await request.json();
    await recordResumeEvent(payload, request);
    return json({ ok: true });
  } catch (error) {
    console.error("Failed to record resume analytics event", error);
    return json({ ok: false }, { status: 400 });
  }
};
