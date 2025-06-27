import { LucideIcon } from "lucide-react";
import { AnimatedNumber } from "../animated-number";

interface FinancialInputDataRowProps {
  icon: LucideIcon;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export function FinancialInputDataRow({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
}: FinancialInputDataRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="text-muted-foreground/60 h-4 w-4" />
        <span className="text-muted-foreground">{label}:</span>
      </div>
      <span className="font-medium">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </span>
    </div>
  );
}
