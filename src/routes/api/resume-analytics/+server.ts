import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const headers = request.headers;

  return json({
    city: headers.get("x-vercel-ip-city") || "unknown",
    country: headers.get("x-vercel-ip-country") || "unknown",
    region: headers.get("x-vercel-ip-country-region") || "unknown"
  });
};
