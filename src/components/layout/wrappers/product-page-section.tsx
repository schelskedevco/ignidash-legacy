import { ReactNode } from "react";
import { GradientBackground } from "@/components/layout/effects/gradient-background";
import { BottomShadow } from "@/components/layout/effects/bottom-shadow";

interface ProductPageSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  gradientVariant?: "subtleRose" | "warmRose";
  showBottomShadow?: boolean;
}

export function ProductPageSection({
  id,
  children,
  className = "",
  ariaLabel,
  gradientVariant,
  showBottomShadow = false,
}: ProductPageSectionProps) {
  return (
    <section id={id} className={"relative"} aria-label={ariaLabel}>
      {gradientVariant && <GradientBackground variant={gradientVariant} />}

      {/* Main content */}
      <div className={`relative z-10 ${className}`}>{children}</div>

      {showBottomShadow ? (
        <div aria-hidden="true">{<BottomShadow />}</div>
      ) : null}
    </section>
  );
}
