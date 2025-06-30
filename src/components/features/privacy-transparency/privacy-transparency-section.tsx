import { Shield } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import {
  MAX_WIDTHS,
  TYPOGRAPHY,
  SPACING,
  GRADIENTS,
} from "@/lib/design-constants";

export function PrivacyTransparencySection() {
  return (
    <ProductPageSection
      className={`${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment} mx-auto`}
      id="privacy-transparency"
      ariaLabel="Privacy and Transparency Section"
      gradientVariant="freshMint"
      showBottomShadow={true}
    >
      <ProductPageSectionHeader
        icon={Shield}
        title={
          <>
            Plan <span className={GRADIENTS.textReverse}>Privately</span>
          </>
        }
        description="Anonymous planning, instant deletion, zero data sales. We make money from subscriptions, not your information."
      />
      {null}
    </ProductPageSection>
  );
}
