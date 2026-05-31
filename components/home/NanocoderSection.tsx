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
        <div>
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="mb-2">
              Featured Project
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">Nanocoder</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A beautiful coding agent in your terminal, running on any model
              you choose
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
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">Skills</CardTitle>
                      <CardDescription>
                        One extension model for commands, subagents, tools, and
                        event triggers. Ship a single file or a bundle that
                        wires them together.
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
                      <CardTitle className="mb-2">
                        Event-Driven Automation
                      </CardTitle>
                      <CardDescription>
                        A per-project daemon fires skills on file changes and
                        cron schedules. Wake an agent the moment a manifest
                        changes; run a weekly digest while you sleep.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

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
                        Anthropic, Google, OpenAI, ChatGPT/Codex, GitHub
                        Copilot, OpenRouter, Mistral, Z.ai, MiniMax, Kimi — plus
                        local runners like Ollama, LM Studio, llama.cpp, and
                        MLX.
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
                      <CardTitle className="mb-2">Tools, Your Way</CardTitle>
                      <CardDescription>
                        Built-in file operations and command execution,
                        markdown-defined custom tools, and Model Context
                        Protocol (MCP) servers — all in one unified registry the
                        model can call.
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
