import { Shield } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";

export function PrivacyTransparencySection() {
  return (
    <ProductPageSection
      className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28 xl:text-left"
      id="privacy-transparency"
      ariaLabel="Privacy and Transparency Section"
    >
      <ProductPageSectionHeader
        icon={Shield}
        title={
          <>
            Plan{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent dark:from-pink-400 dark:via-red-400 dark:to-orange-400">
              Privately
            </span>
          </>
        }
        description="Anonymous planning, instant deletion, zero data sales. We make money from subscriptions, not your information."
      />
      {null}
    </ProductPageSection>
  );
}
