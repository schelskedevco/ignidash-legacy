import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BUTTON_ICON_SIZE = "h-4 w-4";

export function HeroSection() {
  return (
    <>
      <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6 max-w-4xl mx-auto xl:mx-0">
        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          <em>Design your life.</em>
        </span>
        <br />
        <span className="text-foreground">
          Then plan your FIRE journey around it.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground max-w-sm md:max-w-3xl mx-auto xl:mx-0 leading-relaxed mb-8">
        Explore retirement timelines, run what-if projections, and get
        AI-powered insights — all tailored to your values and goals.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
        <Button
          asChild
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-base"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            Create your plan
            <ArrowRight className={BUTTON_ICON_SIZE} />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="text-base">
          <Link href="/demo">See how it works</Link>
        </Button>
      </div>
    </>
  );
}
