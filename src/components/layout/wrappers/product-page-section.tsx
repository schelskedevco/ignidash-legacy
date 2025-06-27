import { ReactNode } from "react";
import { SPACING, MAX_WIDTHS } from "@/lib/design-constants";

interface ProductPageSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  alignment?: "center" | "left";
  topBackgroundComponents?: ReactNode;
  bottomBackgroundComponents?: ReactNode;
}

export function ProductPageSection({
  id,
  children,
  className = "",
  ariaLabel,
  alignment = "center",
  topBackgroundComponents,
  bottomBackgroundComponents,
}: ProductPageSectionProps) {
  const isCentered = alignment === "center";

  return (
    <section id={id} className={`relative ${className}`} aria-label={ariaLabel}>
      <div
        className={`relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] ${SPACING.sectionVertical} `}
      >
        {topBackgroundComponents}

        {/* Main content */}
        <div className="relative z-10">
          <div
            className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}
          >
            <div
              className={isCentered ? "text-center xl:text-left" : "text-left"}
            >
              {children}
            </div>
          </div>
        </div>

        {/* Bottom layer */}
        {bottomBackgroundComponents}
      </div>
    </section>
  );
}
