import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BUTTON_ICON_SIZE,
  MAX_WIDTHS,
  GRADIENTS,
  TYPOGRAPHY,
  SPACING,
} from "@/lib/design-constants";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";

export function HeroSection() {
  return (
    <ProductPageSection
      className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment}`}
      ariaLabel="Hero Section"
      gradientVariant="subtleRose"
    >
      <header>
        <hgroup>
          <h1
            className={`font-heading mx-auto mb-6 ${MAX_WIDTHS.content} ${TYPOGRAPHY.heroTitle} xl:mx-0`}
          >
            <span className={GRADIENTS.text}>Design your life.</span>
            <br />
            <span className="text-foreground">
              Then plan your FIRE journey around it.
            </span>
          </h1>

          <p
            className={`text-muted-foreground mx-auto mb-8 ${MAX_WIDTHS.content} ${TYPOGRAPHY.heroSubtitle} xl:mx-0`}
          >
            Explore retirement timelines, run what-if projections, and get
            AI-powered insights — all built around the life you want to live.
          </p>
        </hgroup>

        <div className="flex flex-col justify-center gap-4 sm:flex-row xl:justify-start">
          <Button
            asChild
            size="lg"
            className={`${GRADIENTS.primaryReverse} text-base text-white hover:from-pink-600 hover:via-red-600 hover:to-orange-600`}
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
      </header>
    </ProductPageSection>
  );
}
