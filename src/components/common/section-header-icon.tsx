import { LucideIcon } from "lucide-react";

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
      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-300 mb-6 ${className}`}
    >
      <Icon className="h-8 w-8 text-rose-600" />
    </div>
  );
}
