import { json, type RequestHandler } from "@sveltejs/kit";
import { isResumeAnalyticsConfigured, recordResumeEvent } from "$lib/server/resumeAnalytics";

const MAX_BODY_BYTES = 4096;

function isSameOrigin(request: Request, requestUrl: URL) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // sendBeacon/keepalive from same origin may omit it

  try {
    return new URL(origin).host === requestUrl.host;
  } catch {
    return false;
  }
}

export const POST: RequestHandler = async ({ request, url }) => {
  if (!isResumeAnalyticsConfigured()) {
    return json({ ok: false, error: "database_not_configured" }, { status: 503 });
  }

  if (!isSameOrigin(request, url)) {
    return json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }

    const payload = JSON.parse(raw);
    await recordResumeEvent(payload, request);
    return json({ ok: true });
  } catch (error) {
    console.error("Failed to record resume analytics event", error);
    return json({ ok: false }, { status: 400 });
  }
};
