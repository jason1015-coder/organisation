// Cloudflare zone (HTTP/edge) analytics, fetched at build time via the GraphQL
// Analytics API. Mirrors the build-time pattern used by lib/npm-stats.ts.
//
// This uses server-side zone analytics (no Web Analytics beacon). Every active
// zone on the account is auto-discovered and aggregated, so there is no per-site
// configuration to maintain.
//
// Required environment variables (set as GitHub Actions secrets for CI builds):
//   CLOUDFLARE_ACCOUNT_ID       - the Cloudflare account ID (already used for Pages deploys)
//   CLOUDFLARE_ANALYTICS_TOKEN  - API token scoped to "All zones" with:
//                                   - Zone › Zone › Read          (to list zones)
//                                   - Zone › Analytics › Read     (to read traffic)
//                                 (falls back to CLOUDFLARE_API_TOKEN if unset)
//
// Optional:
//   CF_ZONE_IDS        - comma-separated zone IDs to restrict to (skips auto-discovery)
//   CF_ANALYTICS_DAYS  - rolling window in days to fetch (default 364; the
//                        httpRequests1dGroups dataset retains ~365 days and caps
//                        a single query at 52 weeks + 1 day)
//
// When the token or account ID is absent, every function degrades gracefully to
// empty results so the site still builds.

const API_BASE = "https://api.cloudflare.com/client/v4";
const GRAPHQL_ENDPOINT = `${API_BASE}/graphql`;

export interface TrafficPoint {
  date: string;
  pageViews: number;
  visits: number;
}

export interface SiteTraffic {
  label: string;
  data: TrafficPoint[];
  totalPageViews: number;
  totalVisits: number;
}

interface Zone {
  id: string;
  name: string;
}

interface HttpRequestsGroup {
  dimensions: { date: string };
  sum: { pageViews: number } | null;
  uniq: { uniques: number } | null;
}

interface GraphQLResponse {
  data?: {
    viewer?: {
      zones?: Array<{ httpRequests1dGroups?: HttpRequestsGroup[] }>;
    };
  };
  errors?: Array<{ message: string }>;
}

interface ZonesListResponse {
  success: boolean;
  result?: Zone[];
  errors?: Array<{ message: string }>;
}

const ANALYTICS_DAYS = Number(process.env.CF_ANALYTICS_DAYS ?? "364");

// The sponsor-page "monthly visitors" headline is always a true 30-day figure,
// independent of how wide a window the growth chart fetches.
const HEADLINE_DAYS = 30;

function getToken(): string | undefined {
  return (
    process.env.CLOUDFLARE_ANALYTICS_TOKEN || process.env.CLOUDFLARE_API_TOKEN
  );
}

function dateRange(days: number): { start: string; end: string } {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  return { start: fmt(start), end: fmt(end) };
}

// Discover every active zone on the account, or use CF_ZONE_IDS when set.
async function listZones(token: string, accountId: string): Promise<Zone[]> {
  const override = process.env.CF_ZONE_IDS?.trim();
  if (override) {
    return override
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .map((id) => ({ id, name: id }));
  }

  try {
    const response = await fetch(
      `${API_BASE}/zones?account.id=${accountId}&status=active&per_page=50`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!response.ok) {
      console.error(`Cloudflare zones list HTTP error: ${response.status}`);
      return [];
    }

    const json = (await response.json()) as ZonesListResponse;
    if (!json.success || !json.result) {
      console.error(
        "Cloudflare zones list error:",
        json.errors?.map((e) => e.message).join("; "),
      );
      return [];
    }

    return json.result.map((z) => ({ id: z.id, name: z.name }));
  } catch (error) {
    console.error("Error listing Cloudflare zones:", error);
    return [];
  }
}

const TRAFFIC_QUERY = `query Traffic($zoneTag: String!, $start: Date!, $end: Date!) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      httpRequests1dGroups(
        limit: 1000
        filter: { date_geq: $start, date_leq: $end }
        orderBy: [date_ASC]
      ) {
        dimensions { date }
        sum { pageViews }
        uniq { uniques }
      }
    }
  }
}`;

async function fetchZoneTraffic(
  zone: Zone,
  token: string,
  range: { start: string; end: string },
): Promise<SiteTraffic | null> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: TRAFFIC_QUERY,
        variables: { zoneTag: zone.id, start: range.start, end: range.end },
      }),
    });

    if (!response.ok) {
      console.error(
        `Cloudflare Analytics HTTP error for ${zone.name}: ${response.status}`,
      );
      return null;
    }

    const json = (await response.json()) as GraphQLResponse;

    if (json.errors?.length) {
      console.error(
        `Cloudflare Analytics GraphQL error for ${zone.name}:`,
        json.errors.map((e) => e.message).join("; "),
      );
      return null;
    }

    const groups = json.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];

    const data: TrafficPoint[] = groups.map((g) => ({
      date: g.dimensions.date,
      pageViews: g.sum?.pageViews ?? 0,
      visits: g.uniq?.uniques ?? 0,
    }));

    const totalPageViews = data.reduce((sum, d) => sum + d.pageViews, 0);
    const totalVisits = data.reduce((sum, d) => sum + d.visits, 0);

    return { label: zone.name, data, totalPageViews, totalVisits };
  } catch (error) {
    console.error(
      `Error fetching Cloudflare Analytics for ${zone.name}:`,
      error,
    );
    return null;
  }
}

// Fetches per-zone daily traffic for the rolling window, aggregated across every
// zone on the account. Returns [] when the token or account ID is missing.
export async function fetchTraffic(): Promise<SiteTraffic[]> {
  const token = getToken();
  const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!token || !accountTag) {
    return [];
  }

  const zones = await listZones(token, accountTag);
  const range = dateRange(ANALYTICS_DAYS);

  const results: SiteTraffic[] = [];
  for (const zone of zones) {
    const traffic = await fetchZoneTraffic(zone, token, range);
    // Keep only zones that actually served traffic in the window.
    if (traffic && (traffic.totalPageViews > 0 || traffic.totalVisits > 0)) {
      results.push(traffic);
    }
  }

  return results;
}

// Total visits across all zones over the last 30 days. Used as the
// "monthly visitors" headline figure on the sponsor page.
export async function fetchTotalVisits(): Promise<number> {
  const traffic = await fetchTraffic();
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - HEADLINE_DAYS);
  const cutoffStr = cutoff.toISOString().split("T")[0];

  return traffic.reduce(
    (sum, t) =>
      sum +
      t.data
        .filter((d) => d.date >= cutoffStr)
        .reduce((s, d) => s + d.visits, 0),
    0,
  );
}
