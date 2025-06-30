import { WandSparkles } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { AICopilotDemo } from "./components/ai-copilot-demo";
import {
  MAX_WIDTHS,
  TYPOGRAPHY,
  SPACING,
  GRADIENTS,
} from "@/lib/design-constants";

export function AICopilotSection() {
  return (
    <ProductPageSection
      className={`${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment} mx-auto`}
      id="ai-copilot"
      ariaLabel="AI Copilot Section"
      gradientVariant="coolPurple"
      showBottomShadow={true}
    >
      <ProductPageSectionHeader
        icon={WandSparkles}
        title={
          <>
            Your <span className={GRADIENTS.textReverse}>AI</span> Retirement
            Advisor
          </>
        }
        description="Get wisdom inspired by the best minds in financial independence, personalized to your exact situation."
      />
      <AICopilotDemo />
    </ProductPageSection>
  );
}
