import { LucideIcon } from "lucide-react";
import { SectionHeaderIcon } from "./section-header-icon";
import { SPACING } from "@/lib/design-constants";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({
  icon,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 text-center ${SPACING.container} ${className}`}>
      <SectionHeaderIcon icon={icon} />
      <h2 className="font-heading mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg">
        {description}
      </p>
    </div>
  );
}
