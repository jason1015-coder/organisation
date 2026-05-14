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
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden card-hover-glow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Privacy-Respecting</CardTitle>
              <CardDescription className="text-base">
                Your data stays on your machine. We build tools that respect
                your privacy and keep you in control.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden card-hover-glow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Open for All</CardTitle>
              <CardDescription className="text-base">
                Built by the community, for the community. Open source and
                transparent from day one.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden card-hover-glow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Local-First</CardTitle>
              <CardDescription className="text-base">
                Powerful AI tools that run locally and offline. No cloud
                required, no data leaves your machine.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
