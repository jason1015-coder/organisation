export interface ProductStats {
  stars: number;
  contributors: number;
  forks: number;
  discordMembers: number;
  redditSubscribers: number;
  error: string | null;
}

const DISCORD_INVITE = "ktPDV6rekE";

/**
 * Fetches public community stats for a Nano Collective product at build time.
 * Defaults every metric to 0 so a fetch failure shows honest data rather than
 * fabricated numbers.
 *
 * @param repo - GitHub "owner/name" slug, e.g. "Nano-Collective/nanocoder".
 * @param subreddit - Optional subreddit name (without "r/") whose subscriber
 *   count is folded into the community total.
 */
export async function fetchProductStats(
  repo: string,
  subreddit?: string,
): Promise<ProductStats> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const stats: ProductStats = {
    stars: 0,
    contributors: 0,
    forks: 0,
    discordMembers: 0,
    redditSubscribers: 0,
    error: null,
  };

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
    });
    if (repoRes.ok) {
      const repoData = await repoRes.json();
      stats.stars = repoData.stargazers_count || stats.stars;
      stats.forks = repoData.forks_count || stats.forks;
    }

    const contributorsRes = await fetch(
      `https://api.github.com/repos/${repo}/contributors?per_page=100`,
      { headers },
    );
    if (contributorsRes.ok) {
      const contributorsData = await contributorsRes.json();
      if (Array.isArray(contributorsData) && contributorsData.length > 0) {
        stats.contributors = contributorsData.length;
      }
    }

    const discordRes = await fetch(
      `https://discord.com/api/invites/${DISCORD_INVITE}?with_counts=true`,
    );
    if (discordRes.ok) {
      const data = await discordRes.json();
      if (data.approximate_member_count) {
        stats.discordMembers = data.approximate_member_count;
      }
    }

    if (subreddit) {
      stats.redditSubscribers = await fetchRedditSubscribers(subreddit);
    }
  } catch (error) {
    console.error(`Error fetching stats for ${repo}:`, error);
    stats.error = "Failed to fetch actual metrics";
  }

  return stats;
}

/**
 * Fetches a subreddit's subscriber count via the shields.io badge endpoint.
 * Reddit blocks unauthenticated and datacenter requests directly, but shields
 * reads the count server-side and is freely fetchable from CI. Returns 0 on any
 * failure, keeping the metric honest. Counts above 1,000 are SI-rounded by
 * shields (e.g. "1.2k"), so the figure is approximate at scale.
 */
export async function fetchRedditSubscribers(
  subreddit: string,
): Promise<number> {
  try {
    const res = await fetch(
      `https://img.shields.io/reddit/subreddit-subscribers/${subreddit}.json`,
    );
    if (!res.ok) {
      return 0;
    }
    const data = await res.json();
    return parseShieldsValue(data?.value);
  } catch (error) {
    console.error(`Error fetching Reddit stats for r/${subreddit}:`, error);
    return 0;
  }
}

/** Parses a shields.io message like "799" or "1.2k" into an integer. */
function parseShieldsValue(value: unknown): number {
  if (typeof value !== "string") {
    return 0;
  }
  const match = value
    .trim()
    .toLowerCase()
    .match(/^([\d.]+)([kmb]?)$/);
  if (!match) {
    return 0;
  }
  const n = Number.parseFloat(match[1]);
  if (Number.isNaN(n)) {
    return 0;
  }
  const multiplier =
    match[2] === "k"
      ? 1e3
      : match[2] === "m"
        ? 1e6
        : match[2] === "b"
          ? 1e9
          : 1;
  return Math.round(n * multiplier);
}
