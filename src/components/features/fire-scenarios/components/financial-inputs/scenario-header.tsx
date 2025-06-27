import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ICON_SIZES, CARD_BORDER_RADIUS } from "@/lib/design-constants";

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
    <header className="grid gap-3 md:grid-cols-[auto,1fr]">
      <div className={`shrink-0 ${CARD_BORDER_RADIUS} p-2 sm:p-3 ${bgColor}`}>
        <Icon
          className={`${ICON_SIZES.lg} sm:${ICON_SIZES.xl} ${iconColor}`}
          aria-hidden="true"
        />
        <span className="sr-only">{`${title} icon`}</span>
      </div>

      {/* Content Container */}
      <div className="space-y-1 text-left">
        {/* Title and Badge Container */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-left text-lg font-semibold tracking-tight">
            {title}
          </h3>
          <Badge variant="secondary" className="font-medium">
            {focusArea}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-left text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </header>
  );
}
