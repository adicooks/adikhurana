import type { RequestHandler } from "@sveltejs/kit";

const GITHUB_CONTRIBUTIONS_URL = "https://github.com/users/adicooks/contributions";
const COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const CELL_SIZE = 10;
const CELL_GAP = 3;
const WEEKS = 53;
const DAYS = 7;
const WIDTH = WEEKS * (CELL_SIZE + CELL_GAP) - CELL_GAP;
const HEIGHT = DAYS * (CELL_SIZE + CELL_GAP) - CELL_GAP;

type ContributionDay = {
  date: string;
  level: number;
};

function parseContributionDays(html: string) {
  const days: ContributionDay[] = [];
  const dayPattern = /data-date="([^"]+)"[^>]*data-level="([0-4])"/g;
  let match: RegExpExecArray | null;

  while ((match = dayPattern.exec(html))) {
    days.push({
      date: match[1],
      level: Number(match[2])
    });
  }

  return days;
}

function parseContributionCount(html: string) {
  const match = html.match(/<h2[^>]*>\s*([\d,]+)\s+contributions/);
  return match?.[1] || "";
}

function getWeekOffset(date: string, firstDate: string) {
  const current = Date.parse(`${date}T00:00:00Z`);
  const first = Date.parse(`${firstDate}T00:00:00Z`);

  return Math.floor((current - first) / (7 * 24 * 60 * 60 * 1000));
}

function renderContributionSvg(days: ContributionDay[], contributionCount: string) {
  const firstDate = days[0]?.date || "";
  const rects = days
    .map(({ date, level }) => {
      const day = new Date(`${date}T00:00:00Z`).getUTCDay();
      const week = firstDate ? getWeekOffset(date, firstDate) : 0;

      if (week < 0 || week >= WEEKS) return "";

      const x = week * (CELL_SIZE + CELL_GAP);
      const y = day * (CELL_SIZE + CELL_GAP);
      const color = COLORS[level] || COLORS[0];

      return `<rect x="${x}" y="${y}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="2" fill="${color}" />`;
    })
    .join("");

  const label = contributionCount
    ? `${contributionCount} GitHub contributions in the last year`
    : "GitHub contributions in the last year";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="${label}">
  <rect width="${WIDTH}" height="${HEIGHT}" rx="8" fill="#0d1117" />
  ${rects}
</svg>`;
}

function renderFallbackSvg() {
  const rects = Array.from({ length: WEEKS * DAYS }, (_, index) => {
    const week = Math.floor(index / DAYS);
    const day = index % DAYS;
    const level = (week + day) % 5 === 0 ? 1 : 0;
    const x = week * (CELL_SIZE + CELL_GAP);
    const y = day * (CELL_SIZE + CELL_GAP);

    return `<rect x="${x}" y="${y}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="2" fill="${COLORS[level]}" />`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="GitHub contributions unavailable">
  <rect width="${WIDTH}" height="${HEIGHT}" rx="8" fill="#0d1117" />
  ${rects}
</svg>`;
}

export const GET: RequestHandler = async () => {
  try {
    const response = await fetch(GITHUB_CONTRIBUTIONS_URL, {
      headers: {
        Accept: "text/html",
        "User-Agent": "adicooks-site"
      }
    });

    if (!response.ok) {
      throw new Error(`github_contributions_failed_${response.status}`);
    }

    const html = await response.text();
    const days = parseContributionDays(html);

    if (!days.length) {
      throw new Error("github_contributions_empty");
    }

    return new Response(renderContributionSvg(days, parseContributionCount(html)), {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    console.warn(
      "github-contributions failed",
      error instanceof Error ? error.message : "unknown_error"
    );

    return new Response(renderFallbackSvg(), {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300"
      }
    });
  }
};
