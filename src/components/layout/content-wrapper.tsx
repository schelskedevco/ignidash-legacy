import { ReactNode } from "react";
import { SPACING, MAX_WIDTHS } from "@/lib/design-constants";

interface ContentWrapperProps {
  children: ReactNode;
  variant?: "container" | "full";
  alignment?: "center" | "left";
}

export function ContentWrapper({
  children,
  variant = "container",
  alignment = "center",
}: ContentWrapperProps) {
  const alignmentClass =
    alignment === "center" ? "text-center xl:text-left" : "text-left";

  if (variant === "full") {
    return (
      <div className="relative z-10">
        <div className={`w-full ${SPACING.sectionHorizontal}`}>
          <div className={alignmentClass}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <div className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}>
        <div className={alignmentClass}>{children}</div>
      </div>
    </div>
  );
}
