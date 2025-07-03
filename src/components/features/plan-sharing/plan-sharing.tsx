import { Share2 } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { MockBrowser } from "./components/mock-browser";
import { MockReddit } from "./components/mock-reddit";
import { MockiMessage } from "./components/mock-imessage";

export function PlanSharingSection() {
  return (
    <ProductPageSection
      className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28 xl:text-left"
      id="plan-sharing"
      ariaLabel="Plan Sharing Section"
      gradientVariant="primary"
    >
      <ProductPageSectionHeader
        icon={Share2}
        title={
          <>
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent dark:from-orange-400 dark:via-red-400 dark:to-pink-400">
              Share
            </span>{" "}
            Your Plan
          </>
        }
        description="From running it by your inner circle to starting a conversation on Reddit or X, share your plan with one simple link."
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-4">
        {/* Left Column - MockBrowser */}
        <div className="flex flex-col items-center justify-center gap-4 lg:items-start">
          <div className="w-full space-y-3">
            <p className="text-muted-foreground text-center text-xs font-medium tracking-wider uppercase lg:ml-4 lg:text-left">
              Your Plan
            </p>
            <div className="flex justify-center lg:justify-start">
              <MockBrowser />
            </div>
          </div>
        </div>

        {/* Right Column - Social Examples */}
        <div className="flex flex-col items-center gap-4 lg:items-start">
          {/* Reddit Example */}
          <div className="w-full space-y-3">
            <p className="text-muted-foreground text-center text-xs font-medium tracking-wider uppercase lg:ml-4 lg:text-left">
              Your Socials
            </p>
            <div className="flex justify-center lg:justify-start">
              <MockReddit />
            </div>
          </div>

          {/* iMessage Example */}
          <div className="w-full space-y-3">
            <div className="flex justify-center lg:justify-start">
              <MockiMessage />
            </div>
          </div>
        </div>
      </div>
    </ProductPageSection>
  );
}
