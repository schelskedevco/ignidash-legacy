import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ICON_SIZES, COMPONENT_SIZES } from "@/lib/design-constants";

interface ScenarioHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  focusArea: string;
  bgColor: string;
  iconColor: string;
}

export function ScenarioHeader({
  icon: Icon,
  title,
  description,
  focusArea,
  bgColor,
  iconColor,
}: ScenarioHeaderProps) {
  return (
    <header className="flex items-start gap-3 sm:gap-4">
      {/* Icon container with proper aspect ratio */}
      <div
        className={`shrink-0 rounded-lg p-2 sm:p-3 ${bgColor}`}
        role="img"
        aria-label={`${title} icon`}
      >
        <Icon className={`${ICON_SIZES.lg} sm:${ICON_SIZES.xl} ${iconColor}`} />
      </div>

      {/* Content section with proper hierarchy */}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <h3 className="font-heading text-base leading-tight font-semibold tracking-tight sm:text-lg">
            {title}
          </h3>
          <Badge
            variant="secondary"
            className={`${COMPONENT_SIZES.badge.sm} w-fit font-medium`}
          >
            {focusArea}
          </Badge>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
          {description}
        </p>
      </div>
    </header>
  );
}
