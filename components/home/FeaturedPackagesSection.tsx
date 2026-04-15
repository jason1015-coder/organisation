import { Package } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturedPackagesSection() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Featured Packages
            </h2>
            <p className="text-base text-muted-foreground">
              Lightweight utilities built by the community
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <CardTitle className="text-lg">get-md</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        TypeScript
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      A fast, lightweight HTML to Markdown converter optimized
                      for LLM consumption. Clean, well-structured markdown with
                      intelligent content extraction.
                    </CardDescription>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="group"
                        asChild
                      >
                        <a
                          href="https://github.com/Nano-Collective/get-md"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          View on GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <CardTitle className="text-lg">json-up</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        TypeScript
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      A fast, type-safe JSON migration tool with Zod schema
                      validation. Fluent builder API with automatic version
                      tracking and full TypeScript type inference.
                    </CardDescription>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="group"
                        asChild
                      >
                        <a
                          href="https://github.com/Nano-Collective/json-up"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          View on GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
