import { WandSparkles } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { GradientBackground } from "@/components/layout/effects/gradient-background";
import { AICopilotDemo } from "./components/ai-copilot-demo";

export function AICopilotSection() {
  return (
    <ProductPageSection
      id="ai-copilot"
      ariaLabel="AI Copilot Section"
      topBackgroundComponents={<GradientBackground variant="aiCopilot" />}
    >
      <ProductPageSectionHeader
        icon={WandSparkles}
        title="Your AI Retirement Advisor"
        description="Get wisdom inspired by the best minds in financial independence, personalized to your exact situation."
      />
      <AICopilotDemo />
    </ProductPageSection>
  );
}
