import { ReactNode } from "react";
import { SPACING, MAX_WIDTHS } from "@/lib/design-constants";

interface ProductPageSectionProps {
  id?: string;
  children: ReactNode;
  ariaLabel: string;
  topBackgroundComponents?: ReactNode;
  bottomBackgroundComponents?: ReactNode;
  textAlign?: "center" | "left" | "responsive";
  spacing?: "default" | "large" | "small";
}

export function ProductPageSection({
  id,
  children,
  ariaLabel,
  topBackgroundComponents,
  bottomBackgroundComponents,
  textAlign = "responsive",
  spacing = "large",
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
        <div aria-hidden="true">{topBackgroundComponents}</div>

        {/* Main content */}
        <div className="relative z-10">
          <div
            className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}
          >
            <div className={alignmentClass}>{children}</div>
          </div>
        </div>

        <div aria-hidden="true">{bottomBackgroundComponents}</div>
      </div>
    </section>
  );
}
