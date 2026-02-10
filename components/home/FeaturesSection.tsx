import { Lock, Users, Zap } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="relative overflow-hidden card-hover-glow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Privacy First</CardTitle>
              <CardDescription className="text-base">
                Your data should stay on your machine. We&apos;re building
                privacy-first architectures to ensure complete control.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden card-hover-glow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Community Driven</CardTitle>
              <CardDescription className="text-base">
                Built by developers, for developers. We&apos;re doing true open
                source and transparent work from day one.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden card-hover-glow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>New Capabilities</CardTitle>
              <CardDescription className="text-base">
                We&apos;re building next generation of AI tools that run locally
                and offline. Powerful, flexible, and private.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
