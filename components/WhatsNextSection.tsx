import { ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { generateBlogSlug } from "@/lib/slugify";
import type { Discussion } from "@/types/discussion";

interface WhatsNextSectionProps {
  discussions: Discussion[];
}

export default function WhatsNextSection({
  discussions,
}: WhatsNextSectionProps) {
  // Get 5 most recent discussions (already sorted by newest first from index.tsx)
  const recentDiscussions = discussions.slice(0, 5);

  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold">What's Next</h2>
            <p className="text-xl text-muted-foreground">
              See what we're planning and join the discussion
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild variant="default">
                <Link href="/blog">View All Posts</Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://github.com/Nano-Collective/organisation/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  GitHub Discussions
                </a>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="py-3">
              {recentDiscussions.length > 0 ? (
                <div className="space-y-2">
                  {recentDiscussions.map((discussion) => (
                    <Link
                      key={discussion.id}
                      href={`/blog/${generateBlogSlug(discussion.title, discussion.number)}`}
                      className="flex items-start gap-3 py-3 group hover:bg-accent/5 -mx-4 px-4 rounded transition-colors cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {discussion.title}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {discussion.labels?.map((label) => (
                            <Badge
                              key={label.id}
                              variant="outline"
                              style={{
                                borderColor: `#${label.color}`,
                                color: `#${label.color}`,
                              }}
                              className="text-[10px] h-4 px-1.5"
                            >
                              {label.name}
                            </Badge>
                          ))}
                          {discussion.comments > 0 && (
                            <div className="flex items-center gap-1 text-xs opacity-50 whitespace-nowrap">
                              <MessageCircle
                                className="h-3 w-3 transform -translate-y-0.25"
                                strokeWidth={3}
                              />
                              <span className="font-bold">
                                {discussion.comments}{" "}
                                {discussion.comments > 1
                                  ? "comments"
                                  : "comment"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                        <span>
                          {new Date(discussion.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <CardDescription className="text-center text-sm py-2">
                  No posts yet. Check back soon!
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
