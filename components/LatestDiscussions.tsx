import Link from "next/link";
import { generateBlogSlug } from "@/lib/slugify";
import type { Discussion } from "@/types/discussion";

interface LatestDiscussionsProps {
  discussions: Discussion[];
}

export function LatestDiscussions({ discussions }: LatestDiscussionsProps) {
  // Take only the top 5 for a clean editorial feed
  const recentDiscussions = discussions.slice(0, 5);

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 container mx-auto max-w-4xl bg-background">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 gap-4 border-b border-foreground/20 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Latest Updates
          </h2>
          <p className="text-foreground/70 font-mono text-sm">
            From the community discussions.
          </p>
        </div>
        <Link
          href="/blog"
          className="text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA] hover:underline underline-offset-4 tracking-wide uppercase font-mono"
        >
          [ View All ]
        </Link>
      </div>

      <div className="flex flex-col">
        {recentDiscussions.map((discussion, index) => (
          <Link
            key={discussion.id}
            href={`/blog/${generateBlogSlug(discussion.title, discussion.number)}`}
            className={`group flex flex-col md:flex-row md:items-center justify-between py-6 transition-colors ${index !== recentDiscussions.length - 1 ? "border-b border-foreground/20" : ""}`}
          >
            <div className="space-y-1 mb-2 md:mb-0 pr-4">
              <h3 className="font-bold text-md sm:text-lg text-foreground group-hover:text-[#0000EE] dark:group-hover:text-[#A1A1AA] transition-colors leading-tight">
                {discussion.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-foreground/60 font-mono mt-2">
                <span className="uppercase tracking-widest font-bold text-foreground/80">
                  {discussion.category.name}
                </span>
                <span>/</span>
                <span>by {discussion.user?.login || "Unknown"}</span>
              </div>
            </div>

            <time
              className="text-xs sm:text-sm text-foreground/60 font-mono shrink-0 uppercase tracking-widest"
              dateTime={discussion.created_at}
            >
              {new Date(discussion.created_at).toLocaleDateString("en-US", {
                timeZone: "UTC",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </time>
          </Link>
        ))}
        {recentDiscussions.length === 0 && (
          <div className="py-12 text-center text-foreground/60 font-mono text-sm border-b border-foreground/20">
            No recent discussions found.
          </div>
        )}
      </div>
    </section>
  );
}
