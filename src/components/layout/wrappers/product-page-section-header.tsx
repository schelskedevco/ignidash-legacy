import { LucideIcon } from "lucide-react";
import { SPACING, ICON_SIZES } from "@/lib/design-constants";

interface ProductPageSectionHeaderProps {
  icon: LucideIcon;
  title: string;
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
    <div className={`mb-12 text-center ${SPACING.container} ${className}`}>
      {/* Icon container */}
      <div
        className={`mb-6 inline-flex ${ICON_SIZES["3xl"]} items-center justify-center rounded-full border-2 border-rose-200 bg-rose-100 dark:border-rose-400 dark:bg-rose-300`}
      >
        <Icon className={`${ICON_SIZES.xl} text-rose-600`} />
      </div>

      {/* Title */}
      <h2 className="font-heading mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {/* Description */}
      <p className="text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg">
        {description}
      </p>
    </div>
  );
}
