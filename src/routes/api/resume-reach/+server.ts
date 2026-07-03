import { json, type RequestHandler } from "@sveltejs/kit";
import { getResumeReachStats, isResumeAnalyticsConfigured } from "$lib/server/resumeAnalytics";

export const GET: RequestHandler = async () => {
  if (!isResumeAnalyticsConfigured()) {
    return json({ configured: false, views: 0, countries: 0 });
  }

  try {
    const stats = await getResumeReachStats();

    return json(
      { configured: true, ...stats },
      {
        headers: {
          // Serve from the edge cache for 5 minutes so homepage loads
          // don't add a DB round-trip per visitor.
          "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
        }
      }
    );
  } catch (error) {
    console.error(
      "resume-reach failed",
      error instanceof Error ? error.message : "unknown_error"
    );
    return json({ configured: false, views: 0, countries: 0 });
  }
};
