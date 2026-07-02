import { json, type RequestHandler } from "@sveltejs/kit";

function decodeHeader(value: string | null) {
  if (!value) return "unknown";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export const GET: RequestHandler = async ({ request }) => {
  const headers = request.headers;

  return json({
    city: decodeHeader(headers.get("x-vercel-ip-city")),
    country: decodeHeader(headers.get("x-vercel-ip-country")),
    region: decodeHeader(headers.get("x-vercel-ip-country-region"))
  });
};
