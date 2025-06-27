import { WandSparkles } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { AICopilotDemo } from "./components/ai-copilot-demo";

export function AICopilotSection() {
  return (
    <ProductPageSection
      id="ai-copilot"
      ariaLabel="AI Copilot Section"
      gradientVariant="coolPurple"
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
