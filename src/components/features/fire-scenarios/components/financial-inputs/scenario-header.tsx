import { LucideIcon } from "lucide-react";

interface ScenarioHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export function ScenarioHeader({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
}: ScenarioHeaderProps) {
  return (
    <header className="space-y-3">
      {/* Icon and Title Container */}
      <div className="flex items-center gap-3">
        <div className={`shrink-0 rounded-lg p-2 sm:p-3 ${bgColor}`}>
          <Icon
            className={`h-6 w-6 sm:h-8 sm:w-8 ${iconColor}`}
            aria-hidden="true"
          />
          <span className="sr-only">{`${title} icon`}</span>
        </div>
        <h3 className="font-heading text-left text-lg font-semibold tracking-tight">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-left text-sm leading-relaxed">
        {description}
      </p>
    </header>
  );
}
