import { ReactNode } from "react";
import { SPACING } from "@/lib/design-constants";

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  minHeight?: "sm" | "md" | "lg";
}

const MIN_HEIGHT_CLASSES = {
  sm: "min-h-[400px] sm:min-h-[450px] md:min-h-[500px]",
  md: "min-h-[500px] sm:min-h-[550px] md:min-h-[600px]",
  lg: "min-h-[600px] sm:min-h-[650px] md:min-h-[700px]",
};

export function SectionContainer({
  id,
  children,
  className = "",
  ariaLabel,
  minHeight = "md",
}: SectionContainerProps) {
  return (
    <section id={id} className={`relative ${className}`} aria-label={ariaLabel}>
      <div
        className={`relative ${MIN_HEIGHT_CLASSES[minHeight]} ${SPACING.sectionVertical}`}
      >
        {children}
      </div>
    </section>
  );
}
