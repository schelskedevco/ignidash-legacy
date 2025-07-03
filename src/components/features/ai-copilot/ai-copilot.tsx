import { WandSparkles } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { AICopilotDemo } from "./components/ai-copilot-demo";

export function AICopilotSection() {
  return (
    <ProductPageSection
      className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28 xl:text-left"
      id="ai-copilot"
      ariaLabel="AI Copilot Section"
      gradientVariant="subtleRose"
    >
      <ProductPageSectionHeader
        icon={WandSparkles}
        title={
          <>
            Your{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent dark:from-pink-400 dark:via-red-400 dark:to-orange-400">
              AI
            </span>{" "}
            Retirement Advisor
          </>
        }
        description="Get wisdom inspired by the best minds in financial independence, personalized to your exact situation."
      />
      <AICopilotDemo />
    </ProductPageSection>
  );
}
