import { Sparkles, Zap } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NanotuneSection() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div>
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="mb-2">
              Other Tools
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">Nanotune</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fine-tune and optimize your AI models for better performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-lg overflow-hidden border border-border/40 shadow-lg flex items-center justify-center">
              {/* biome-ignore lint/performance/noImgElement: GIF animation needs native img */}
              <img
                src="/nanotune/example.gif"
                alt="Nanotune CLI demonstration"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="space-y-4 flex flex-col">
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow flex-1">
                <CardHeader className="h-full flex flex-col">
                  <div className="flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <CardTitle className="text-lg">
                          Model Fine-tuning
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          MacOS
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed flex-1">
                        No YAML configs or complex flags. Just an interactive
                        CLI that guides you through LoRA fine-tuning on your own
                        data. Add training examples, validate data, and train
                        with live progress display, all locally and privately.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow flex-1">
                <CardHeader className="h-full flex flex-col">
                  <div className="flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <CardTitle className="text-lg">
                          Export & Benchmark
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          GGUF
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed flex-1">
                        Export trained models to GGUF format with automatic
                        llama.cpp binaries. Run benchmarks with detailed timing
                        metrics (TTFT, tokens/sec) and hardware presets for low
                        to ultra performance tiers.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              size="lg"
              variant="outline"
              className="group text-base w-full sm:w-auto"
              asChild
            >
              <a
                href="https://github.com/Nano-Collective/nanotune"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Nanotune
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
