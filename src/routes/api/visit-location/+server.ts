import { json, type RequestHandler } from "@sveltejs/kit";

function decodeHeader(value: string | null) {
  if (!value) return "unknown";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeRegion(region: string) {
  return region === "unknown" ? "" : region;
}

function normalizeCountry(country: string) {
  return country === "unknown" ? "" : country;
}

function formatLocation(city: string, region: string, country: string) {
  const locationCity = city === "unknown" ? "" : city;
  const locationRegion = normalizeRegion(region);
  const locationCountry = normalizeCountry(country);

  if (!locationCity) {
    return locationCountry || "unknown";
  }

  if (locationCountry === "US") {
    return [locationCity, locationRegion].filter(Boolean).join(", ") || locationCity;
  }

  return [locationCity, locationCountry].filter(Boolean).join(", ");
}

export const GET: RequestHandler = async ({ request }) => {
  const headers = request.headers;
  const city = decodeHeader(headers.get("x-vercel-ip-city"));
  const country = decodeHeader(headers.get("x-vercel-ip-country"));
  const region = decodeHeader(headers.get("x-vercel-ip-country-region"));

  return json({
    city,
    country,
    region,
    location: formatLocation(city, region, country)
  });
};
