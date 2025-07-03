import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";

export function HeroSection() {
  return (
    <ProductPageSection
      className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28 xl:text-left"
      ariaLabel="Hero Section"
      gradientVariant="hero"
    >
      <header>
        <hgroup>
          <h1 className="font-heading mx-auto mb-6 max-w-sm text-5xl font-bold md:max-w-2xl md:text-7xl lg:max-w-3xl xl:mx-0">
            <span className="text-foreground">Financial independence.</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent dark:from-orange-400 dark:via-red-400 dark:to-pink-400">
              Personalized.
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mb-8 max-w-sm text-xl leading-relaxed md:max-w-2xl md:text-2xl lg:max-w-3xl xl:mx-0">
            Explore retirement timelines, run what-if projections, and get
            AI-powered insights — without the complexity of traditional tools.
          </p>
        </hgroup>

        <div className="flex flex-col justify-center gap-4 sm:flex-row xl:justify-start">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-base text-white hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              Create your plan
              <ArrowRight className="h-4 w-4" />
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
