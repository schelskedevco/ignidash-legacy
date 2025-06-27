import { Compass } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";

export function LifeModulesSection() {
  return (
    <ProductPageSection id="life-modules" ariaLabel="Life Modules Section">
      <ProductPageSectionHeader
        icon={Compass}
        title="Play Out Your What-Ifs"
        description="Drag and drop life events onto your timeline. Kids, time off, career pivots, big purchases—instantly see how each decision shifts your financial future."
      />
      {null}
    </ProductPageSection>
  );
}
