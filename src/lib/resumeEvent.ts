import { browser } from "$app/environment";

const SESSION_STORAGE_KEY = "adi-resume-session-id";

type ResumeEventPayload = {
  eventName: "resume_click" | "resume_view" | "resume_duration";
  source?: string;
  route?: string;
  durationSeconds?: number;
  durationBucket?: string;
};

function getSessionId() {
  if (!browser) return "";

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const sessionId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

export function sendResumeEvent(payload: ResumeEventPayload) {
  if (!browser) return;

  const body = JSON.stringify({
    ...payload,
    sessionId: getSessionId(),
    route: payload.route || window.location.pathname,
    referrer: document.referrer || ""
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/resume-event", blob);
    return;
  }

  fetch("/api/resume-event", {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json"
    },
    keepalive: true
  }).catch(() => {
    // Analytics should never interrupt the visitor's resume flow.
  });
}
