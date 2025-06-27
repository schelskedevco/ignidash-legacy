import { ReactNode } from "react";
import { SPACING, MAX_WIDTHS } from "@/lib/design-constants";

interface ProductPageSectionProps {
  // From SectionWrapper
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  minHeight?: "sm" | "md" | "lg";
  // From SectionContent
  contentVariant?: "container" | "full";
  alignment?: "center" | "left";
  contentClassName?: string;
  // Explicit background props
  background?: ReactNode;
  topFade?: ReactNode;
  bottomShadow?: ReactNode;
  // Header component
  header?: ReactNode;
}

const MIN_HEIGHT_CLASSES = {
  sm: "min-h-[400px] sm:min-h-[450px] md:min-h-[500px]",
  md: "min-h-[500px] sm:min-h-[550px] md:min-h-[600px]",
  lg: "min-h-[600px] sm:min-h-[650px] md:min-h-[700px]",
};

export function ProductPageSection({
  id,
  children,
  className = "",
  ariaLabel,
  minHeight = "md",
  contentVariant = "container",
  alignment = "center",
  contentClassName = "",
  background,
  topFade,
  bottomShadow,
  header,
}: ProductPageSectionProps) {
  // Content alignment logic from SectionContent
  const alignmentClass =
    alignment === "center" ? "text-center xl:text-left" : "text-left";

  // Content classes logic from SectionContent
  const contentClasses =
    contentVariant === "full"
      ? `w-full ${SPACING.sectionHorizontal}`
      : `mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`;

  return (
    // SectionWrapper structure
    <section id={id} className={`relative ${className}`} aria-label={ariaLabel}>
      <div
        className={`relative ${MIN_HEIGHT_CLASSES[minHeight]} ${SPACING.sectionVertical}`}
      >
        {/* Background elements */}
        {topFade}
        {background}

        {/* SectionContent structure with z-index above backgrounds */}
        <div className="relative z-10">
          <div className={`${contentClasses} ${contentClassName}`}>
            <div className={alignmentClass}>
              {header}
              {children}
            </div>
          </div>
        </div>

        {/* Bottom elements */}
        {bottomShadow}
      </div>
    </section>
  );
}
