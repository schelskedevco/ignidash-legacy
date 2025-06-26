import { LucideIcon } from "lucide-react";
import { ICON_SIZES } from "@/lib/design-constants";

interface SectionHeaderIconProps {
  icon: LucideIcon;
  className?: string;
}

export function SectionHeaderIcon({
  icon: Icon,
  className = "",
}: SectionHeaderIconProps) {
  return (
    <div
      className={`mb-6 inline-flex ${ICON_SIZES["3xl"]} items-center justify-center rounded-full bg-rose-100 dark:bg-rose-300 ${className}`}
    >
      <Icon className={`${ICON_SIZES.xl} text-rose-600`} />
    </div>
  );
}
