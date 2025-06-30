import { Share2 } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
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
      {null}
    </ProductPageSection>
  );
}
