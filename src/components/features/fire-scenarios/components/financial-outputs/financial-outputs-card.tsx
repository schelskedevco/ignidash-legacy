import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ICON_SIZES } from "@/lib/design-constants";
import { Info } from "lucide-react";
import { GrowthChart } from "./growth-chart";
import { KeyMetrics } from "./key-metrics";
import { Scenario, FireOutputs, GrowthDataPoint } from "../../lib/fire-types";

interface FinancialOutputsCardProps {
  scenario: Scenario;
  outputs: FireOutputs;
  growthData: GrowthDataPoint[];
}

export function FinancialOutputsCard({
  scenario,
  outputs,
  growthData,
}: FinancialOutputsCardProps) {
  return (
    <Card className="hover:border-primary/30 h-full w-full overflow-hidden transition-all duration-300 hover:shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <h2 className="font-heading mb-4 flex items-center justify-center gap-2 text-xl font-semibold xl:justify-start">
          Your FIRE Projection
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  className={`text-muted-foreground ${ICON_SIZES.sm} cursor-help`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  Assumes 4% safe withdrawal rate and 7% annual return on
                  investments.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <div className="w-full overflow-hidden">
          <GrowthChart
            data={growthData}
            outputs={outputs}
            scenario={scenario}
          />
        </div>

        <Separator className="my-6" />

        <KeyMetrics outputs={outputs} scenario={scenario} />
      </CardContent>
    </Card>
  );
}
