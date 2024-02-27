import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { Command } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { ThemeToggle } from "./resources.theme-toggle";
import { Hero3DCard } from "~/components/hero-3d-card";
import { TextRevealCardPreview } from "~/components/text-reveal-preview";
import { AnimatedTooltipPreview } from "~/components/animated-preview";
import { HeroParallaxDemo } from "~/components/parallax-preview";
import { AnimatedPinDemo } from "~/components/animated-3d-pin";

export default function Index() {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <nav className="flex items-center justify-between p-4 w-full">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">ap3x</h1>
        </Link>
        <Button />
      </nav>
      <div className="container flex justify-center px-4 md:px-6 flex-1 py-8 overflow-x-hidden">
        <div className="flex flex-col items-center space-y-4 text-center p-4 md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Hello
          </h1>

          <p className="text-muted-foreground font-bold mt-2">
            With optimistic dark-mode.
          </p>
          <p className="text-muted-foreground mt-2">
            (On mobile, tap for animations.)
          </p>

          <div className="px-4">
            <AnimatedTooltipPreview />
            <AnimatedPinDemo />
            <Hero3DCard />
          </div>
        </div>
      </div>
    </section>
  );
}
