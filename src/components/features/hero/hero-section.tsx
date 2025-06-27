import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BUTTON_ICON_SIZES,
  MAX_WIDTHS,
  GRADIENTS,
} from "@/lib/design-constants";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { GradientBackground } from "@/components/layout/effects/gradient-background";

export function HeroSection() {
  return (
    <ProductPageSection
      ariaLabel="Hero Section"
      topBackgroundComponents={<GradientBackground variant="hero" />}
    >
      <h1
        className={`font-heading mx-auto mb-6 ${MAX_WIDTHS.content} text-5xl leading-tight font-bold md:text-7xl xl:mx-0`}
      >
        <span className={GRADIENTS.text}>Design your life.</span>
        <br />
        <span className="text-foreground">
          Then plan your FIRE journey around it.
        </span>
      </h1>

      <p
        className={`text-muted-foreground mx-auto mb-8 ${MAX_WIDTHS.contentSm} text-xl leading-relaxed md:text-2xl xl:mx-0`}
      >
        Explore retirement timelines, run what-if projections, and get
        AI-powered insights — all built around the life you want to live.
      </p>

      <div className="flex flex-col justify-center gap-4 sm:flex-row xl:justify-start">
        <Button
          asChild
          size="lg"
          className={`${GRADIENTS.primaryReverse} text-base text-white hover:from-pink-600 hover:via-red-600 hover:to-orange-600`}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            Create your plan
            <ArrowRight className={BUTTON_ICON_SIZES.md} />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="text-base">
          <Link href="/demo">See how it works</Link>
        </Button>
      </div>
    </ProductPageSection>
  );
}
