import { ReactNode } from "react";
import {
  SPACING,
  MAX_WIDTHS,
  BackgroundGradient,
} from "@/lib/design-constants";
import { GradientBackground } from "@/components/layout/effects/gradient-background";
import { BottomShadow } from "@/components/layout/effects/bottom-shadow";

interface ProductPageSectionProps {
  id?: string;
  children: ReactNode;
  ariaLabel: string;
  gradientVariant?: BackgroundGradient;
  bottomBackgroundComponents?: ReactNode;
  textAlign?: "center" | "left" | "responsive";
  spacing?: "default" | "large" | "small";
  showBottomShadow?: boolean;
}

export function ProductPageSection({
  id,
  children,
  ariaLabel,
  gradientVariant,
  textAlign = "responsive",
  spacing = "large",
  showBottomShadow = false,
}: ProductPageSectionProps) {
  const spacingClass = {
    default: SPACING.sectionVertical,
    large: SPACING.sectionVerticalLg,
    small: SPACING.sectionVerticalSm,
  }[spacing];

  const alignmentClass = {
    center: "text-center",
    left: "text-left",
    responsive: "text-center xl:text-left",
  }[textAlign];

  return (
    <section id={id} aria-label={ariaLabel}>
      <div className={`relative ${spacingClass}`}>
        {gradientVariant && <GradientBackground variant={gradientVariant} />}

        {/* Main content */}
        <div className="relative z-10">
          <div
            className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}
          >
            <div className={alignmentClass}>{children}</div>
          </div>
        </div>

        {showBottomShadow ? (
          <div aria-hidden="true">{<BottomShadow />}</div>
        ) : null}
      </div>
    </section>
  );
}
