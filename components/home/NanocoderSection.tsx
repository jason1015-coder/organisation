import { Code2, Sparkles, Terminal, Zap } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import NanocoderTerminal from "@/components/NanocoderTerminal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NanocoderSectionProps {
  nanocoderVersion: string;
}

export function NanocoderSection({ nanocoderVersion }: NanocoderSectionProps) {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="mb-2">
              Featured Project
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">Nanocoder</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A beautiful, local-first coding agent running in your terminal
            </p>
          </div>

          <div className="space-y-8">
            {/* Terminal Demo */}
            <NanocoderTerminal version={nanocoderVersion} />

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Code2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">
                        Multi-Provider Support
                      </CardTitle>
                      <CardDescription>
                        Works with OpenAI-style APIs, local models (Ollama, LM
                        Studio), and cloud providers (OpenRouter)
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Terminal className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">
                        Advanced Tool System
                      </CardTitle>
                      <CardDescription>
                        Built-in file operations and command execution,
                        extensible via Model Context Protocol (MCP)
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">Custom Commands</CardTitle>
                      <CardDescription>
                        Create markdown-based custom prompts with template
                        variables and namespace support
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">Enhanced UX</CardTitle>
                      <CardDescription>
                        Smart autocomplete, configurable logging, and
                        development mode toggles for best experience
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <Button
                size="lg"
                className="group text-base w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://github.com/Nano-Collective/nanocoder"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Nanocoder
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
