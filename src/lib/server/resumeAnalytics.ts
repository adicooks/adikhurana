import { neon } from "@neondatabase/serverless";
import { env } from "$env/dynamic/private";

export type ResumeEventName = "resume_click" | "resume_view" | "resume_duration";

export type ResumeAnalyticsEvent = {
  id: number;
  event_name: ResumeEventName;
  session_id: string | null;
  route: string | null;
  source: string | null;
  duration_seconds: number | null;
  duration_bucket: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type ResumeSessionTimeline = {
  sessionId: string;
  startedAt: string;
  endedAt: string;
  location: string;
  referrer: string;
  events: Array<{
    eventName: ResumeEventName;
    createdAt: string;
    durationSeconds: number | null;
    source: string | null;
  }>;
};

export type ResumeAnalyticsSummary = {
  totalEvents: number;
  totalViews: number;
  totalClicks: number;
  uniqueResumeViewers: number;
  uniqueSessions: number;
  averageDurationSeconds: number;
  byCountry: Array<{ country: string; count: number }>;
  byCity: Array<{ city: string; region: string; country: string; count: number }>;
  byReferrer: Array<{ referrer: string; count: number }>;
  durationBuckets: Array<{ bucket: string; count: number }>;
  sessionTimelines: ResumeSessionTimeline[];
  recentEvents: ResumeAnalyticsEvent[];
};

type IncomingResumeEvent = {
  eventName?: string;
  sessionId?: string;
  route?: string;
  source?: string;
  durationSeconds?: number;
  durationBucket?: string;
  referrer?: string;
};

const VALID_EVENT_NAMES = new Set(["resume_click", "resume_view", "resume_duration"]);
let tableReady: Promise<void> | null = null;

function getDatabaseUrl() {
  return env.DATABASE_URL || env.POSTGRES_URL || "";
}

function getSql() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) return null;
  return neon(databaseUrl);
}

export function isResumeAnalyticsConfigured() {
  return Boolean(getDatabaseUrl());
}

function cleanString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.slice(0, 500);
}

function cleanNullableString(value: unknown) {
  const cleaned = cleanString(value).trim();
  return cleaned || null;
}

function decodeHeader(value: string | null) {
  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function ensureTable() {
  const sql = getSql();
  if (!sql) {
    throw new Error("Resume analytics database is not configured.");
  }

  tableReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS resume_analytics_events (
        id SERIAL PRIMARY KEY,
        event_name TEXT NOT NULL,
        session_id TEXT,
        route TEXT,
        source TEXT,
        duration_seconds INTEGER,
        duration_bucket TEXT,
        city TEXT,
        region TEXT,
        country TEXT,
        referrer TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  })();

  await tableReady;
}

export async function recordResumeEvent(payload: IncomingResumeEvent, request: Request) {
  const eventName = cleanString(payload.eventName) as ResumeEventName;

  if (!VALID_EVENT_NAMES.has(eventName)) {
    throw new Error("Invalid resume analytics event.");
  }

  const durationSeconds =
    typeof payload.durationSeconds === "number" && Number.isFinite(payload.durationSeconds)
      ? Math.max(0, Math.round(payload.durationSeconds))
      : null;

  const city = decodeHeader(request.headers.get("x-vercel-ip-city"));
  const region = decodeHeader(request.headers.get("x-vercel-ip-country-region"));
  const country = decodeHeader(request.headers.get("x-vercel-ip-country"));
  const userAgent = request.headers.get("user-agent");
  const sessionId = cleanNullableString(payload.sessionId);
  const route = cleanNullableString(payload.route);
  const source = cleanNullableString(payload.source);
  const durationBucket = cleanNullableString(payload.durationBucket);
  const referrer = cleanNullableString(payload.referrer);

  await ensureTable();
  const sql = getSql();
  if (!sql) {
    throw new Error("Resume analytics database is not configured.");
  }

  if (eventName === "resume_duration") {
    const updatedRows = await sql`
      UPDATE resume_analytics_events
      SET
        duration_seconds = ${durationSeconds},
        duration_bucket = ${durationBucket}
      WHERE id = (
        SELECT id
        FROM resume_analytics_events
        WHERE event_name = 'resume_view'
          AND session_id IS NOT DISTINCT FROM ${sessionId}
        ORDER BY created_at DESC
        LIMIT 1
      )
      RETURNING id
    `;

    if (updatedRows.length > 0) return;
  }

  await sql`
    INSERT INTO resume_analytics_events (
      event_name,
      session_id,
      route,
      source,
      duration_seconds,
      duration_bucket,
      city,
      region,
      country,
      referrer,
      user_agent
    )
    VALUES (
      ${eventName === "resume_duration" ? "resume_view" : eventName},
      ${sessionId},
      ${route},
      ${eventName === "resume_duration" ? source || "duration_only" : source},
      ${durationSeconds},
      ${durationBucket},
      ${city},
      ${region},
      ${country},
      ${referrer},
      ${userAgent}
    )
  `;
}

export async function deleteResumeEvent(eventId: number) {
  await ensureTable();
  const sql = getSql();
  if (!sql) {
    throw new Error("Resume analytics database is not configured.");
  }

  await sql`
    DELETE FROM resume_analytics_events
    WHERE id = ${eventId}
  `;
}

export async function deleteResumeSession(sessionId: string) {
  await ensureTable();
  const sql = getSql();
  if (!sql) {
    throw new Error("Resume analytics database is not configured.");
  }

  await sql`
    DELETE FROM resume_analytics_events
    WHERE session_id = ${sessionId}
  `;
}

function increment(map: Map<string, number>, key: string) {
  map.set(key, (map.get(key) || 0) + 1);
}

function topEntries(map: Map<string, number>, limit = 10) {
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function normalizeReferrer(referrer: string | null) {
  if (!referrer) return "direct";

  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "") || referrer;
  } catch {
    return referrer;
  }
}

function formatLocation(event: ResumeAnalyticsEvent) {
  const parts = [event.city, event.region, event.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "unknown";
}

function buildSessionTimelines(rows: ResumeAnalyticsEvent[]) {
  const sessions = new Map<string, ResumeAnalyticsEvent[]>();

  for (const event of rows) {
    const sessionId = event.session_id || `event-${event.id}`;
    const events = sessions.get(sessionId) || [];
    events.push(event);
    sessions.set(sessionId, events);
  }

  return Array.from(sessions.entries())
    .map(([sessionId, events]) => {
      const sortedEvents = [...events].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      const firstEvent = sortedEvents[0];
      const lastEvent = sortedEvents[sortedEvents.length - 1];
      const referrerEvent = sortedEvents.find((event) => event.referrer);
      const locationEvent =
        sortedEvents.find((event) => event.city || event.region || event.country) || firstEvent;

      return {
        sessionId,
        startedAt: firstEvent.created_at,
        endedAt: lastEvent.created_at,
        location: formatLocation(locationEvent),
        referrer: normalizeReferrer(referrerEvent?.referrer || null),
        events: sortedEvents.map((event) => ({
          eventName: event.event_name,
          createdAt: event.created_at,
          durationSeconds: event.duration_seconds,
          source: event.source
        }))
      };
    })
    .sort((a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime())
    .slice(0, 12);
}

export async function getResumeAnalyticsSummary(): Promise<ResumeAnalyticsSummary> {
  await ensureTable();
  const sql = getSql();
  if (!sql) {
    throw new Error("Resume analytics database is not configured.");
  }

  const rows = (await sql`
    SELECT
      id,
      event_name,
      session_id,
      route,
      source,
      duration_seconds,
      duration_bucket,
      city,
      region,
      country,
      referrer,
      user_agent,
      created_at
    FROM resume_analytics_events
    ORDER BY created_at DESC
    LIMIT 250
  `) as ResumeAnalyticsEvent[];

  const sessions = new Set<string>();
  const resumeViewers = new Set<string>();
  const byCountry = new Map<string, number>();
  const byCity = new Map<string, number>();
  const byReferrer = new Map<string, number>();
  const durationBuckets = new Map<string, number>();
  let durationTotal = 0;
  let durationCount = 0;

  for (const event of rows) {
    if (event.session_id) {
      sessions.add(event.session_id);

      if (event.event_name === "resume_view") {
        resumeViewers.add(event.session_id);
      }
    }

    if (event.country) increment(byCountry, event.country);

    if (event.event_name === "resume_view") {
      increment(byReferrer, normalizeReferrer(event.referrer));
    }

    if (event.city || event.region || event.country) {
      increment(
        byCity,
        [event.city || "unknown", event.region || "unknown", event.country || "unknown"].join("|")
      );
    }

    if (event.event_name === "resume_view" && event.duration_bucket) {
      increment(durationBuckets, event.duration_bucket);
    }

    if (event.event_name === "resume_view" && typeof event.duration_seconds === "number") {
      durationTotal += event.duration_seconds;
      durationCount += 1;
    }
  }

  return {
    totalEvents: rows.length,
    totalViews: rows.filter((event) => event.event_name === "resume_view").length,
    totalClicks: rows.filter((event) => event.event_name === "resume_click").length,
    uniqueResumeViewers: resumeViewers.size,
    uniqueSessions: sessions.size,
    averageDurationSeconds: durationCount ? Math.round(durationTotal / durationCount) : 0,
    byCountry: topEntries(byCountry).map(({ key, count }) => ({ country: key, count })),
    byCity: topEntries(byCity).map(({ key, count }) => {
      const [city, region, country] = key.split("|");
      return { city, region, country, count };
    }),
    byReferrer: topEntries(byReferrer).map(({ key, count }) => ({ referrer: key, count })),
    durationBuckets: topEntries(durationBuckets).map(({ key, count }) => ({ bucket: key, count })),
    sessionTimelines: buildSessionTimelines(rows),
    recentEvents: rows
  };
}
