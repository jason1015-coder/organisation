export interface ProductStats {
  stars: number;
  contributors: number;
  forks: number;
  releases: number;
  discordMembers: number;
  error: string | null;
}

const DISCORD_INVITE = "ktPDV6rekE";

/**
 * Fetches public community stats for a Nano Collective product at build time.
 * Defaults every metric to 0 so a fetch failure shows honest data rather than
 * fabricated numbers.
 *
 * @param repo - GitHub "owner/name" slug, e.g. "Nano-Collective/nanocoder".
 */
export async function fetchProductStats(repo: string): Promise<ProductStats> {
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
    releases: 0,
    discordMembers: 0,
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

    const releasesRes = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=100`,
      { headers },
    );
    if (releasesRes.ok) {
      const releasesData = await releasesRes.json();
      if (Array.isArray(releasesData) && releasesData.length > 0) {
        stats.releases = releasesData.length;
      }
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
  } catch (error) {
    console.error(`Error fetching stats for ${repo}:`, error);
    stats.error = "Failed to fetch actual metrics";
  }

  return stats;
}
