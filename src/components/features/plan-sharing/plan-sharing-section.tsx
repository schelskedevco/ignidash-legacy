import { Share2 } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { MockBrowser } from "./components/mock-browser";
import { MockReddit } from "./components/mock-reddit";
import { MockiMessage } from "./components/mock-imessage";
import {
  MAX_WIDTHS,
  TYPOGRAPHY,
  SPACING,
  GRADIENTS,
} from "@/lib/design-constants";

export function PlanSharingSection() {
  return (
    <ProductPageSection
      className={`${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment} mx-auto`}
      id="plan-sharing"
      ariaLabel="Plan Sharing Section"
      gradientVariant="warmRose"
      showBottomShadow={true}
    >
      <ProductPageSectionHeader
        icon={Share2}
        title={
          <>
            <span className={GRADIENTS.text}>Share</span> Your Plan
          </>
        }
        description="From running it by your inner circle to starting a conversation on Reddit or X, share your plan with one simple link."
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column - MockBrowser */}
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="w-full space-y-3">
            <p className="text-muted-foreground ml-4 text-center text-xs font-medium tracking-wider uppercase lg:text-left">
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
            <p className="text-muted-foreground ml-4 text-center text-xs font-medium tracking-wider uppercase lg:text-left">
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
