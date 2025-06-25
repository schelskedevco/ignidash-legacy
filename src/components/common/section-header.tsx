import { LucideIcon } from "lucide-react";
import { SectionHeaderIcon } from "./section-header-icon";

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
    <div className={`mb-12 text-center px-4 sm:px-6 lg:px-8 ${className}`}>
      <SectionHeaderIcon icon={icon} />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}
