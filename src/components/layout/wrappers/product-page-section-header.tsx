import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ProductPageSectionHeaderProps {
  icon: LucideIcon;
  title: string | ReactNode;
  description: string;
  className?: string;
}

export function ProductPageSectionHeader({
  icon: Icon,
  title,
  description,
  className = "",
}: ProductPageSectionHeaderProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      {/* Icon container */}
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-200 bg-rose-100 dark:border-rose-400 dark:bg-rose-300">
        <Icon className="h-8 w-8 text-rose-600" />
      </div>

      {/* Title */}
      <h2 className="font-heading mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {/* Description */}
      <p className="text-muted-foreground mx-auto mb-8 max-w-sm text-base sm:text-lg md:max-w-2xl lg:max-w-3xl">
        {description}
      </p>
    </div>
  );
}
