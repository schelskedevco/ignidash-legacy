import { ReactNode } from "react";
import { SPACING } from "@/lib/design-constants";

interface SectionWrapperProps {
  header: ReactNode;
  children: ReactNode;
}

export function SectionWrapper({ header, children }: SectionWrapperProps) {
  return (
    <>
      {header}

      {/* Main Grid Layout */}
      <div className={`w-full ${SPACING.sectionHorizontal}`}>{children}</div>
    </>
  );
}
