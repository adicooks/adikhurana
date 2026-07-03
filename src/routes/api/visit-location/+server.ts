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
    if (locationCountry === "US") {
      return locationRegion || "unknown";
    }

    return locationCountry || "unknown";
  }

  if (locationCountry === "US") {
    return [locationCity, locationRegion].filter(Boolean).join(", ") || locationCity;
  }

  return [locationCity, locationCountry].filter(Boolean).join(", ");
}

function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    ""
  );
}

async function getFallbackLocation(ip: string) {
  if (!ip) return null;

  try {
    const response = await fetch(`https://ipwho.is/${ip}`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) return null;

    const location = await response.json();

    if (!location.success) return null;

    return {
      city: location.city || "unknown",
      country: location.country_code || "unknown",
      region: location.region_code || location.region || "unknown"
    };
  } catch {
    return null;
  }
}

export const GET: RequestHandler = async ({ request }) => {
  const headers = request.headers;
  let city = decodeHeader(headers.get("x-vercel-ip-city"));
  let country = decodeHeader(headers.get("x-vercel-ip-country"));
  let region = decodeHeader(headers.get("x-vercel-ip-country-region"));

  if (city === "unknown") {
    const fallbackLocation = await getFallbackLocation(getClientIp(headers));

    if (fallbackLocation?.city && fallbackLocation.city !== "unknown") {
      city = fallbackLocation.city;
      country = fallbackLocation.country;
      region = fallbackLocation.region;
    }
  }

  return json({
    city,
    country,
    region,
    location: formatLocation(city, region, country)
  });
};
