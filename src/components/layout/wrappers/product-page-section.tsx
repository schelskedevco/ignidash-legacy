import { ReactNode } from "react";
import {
  GradientBackground,
  GradientVariant,
} from "@/components/layout/effects/gradient-background";

interface ProductPageSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  gradientVariant: GradientVariant;
}

export function ProductPageSection({
  id,
  children,
  className = "",
  ariaLabel,
  gradientVariant,
}: ProductPageSectionProps) {
  return (
    <section id={id} className={"relative"} aria-label={ariaLabel}>
      {gradientVariant && <GradientBackground variant={gradientVariant} />}

      {/* Main content */}
      <div className={`relative z-10 ${className}`}>{children}</div>
    </section>
  );
}
