"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

import { SCENARIOS } from "./data";
import { calculateProjections, generateGrowthData } from "./utils";
import { ScenarioTabs } from "./scenario-tabs";
import { GrowthChart } from "./growth-chart";
import { KeyMetrics } from "./key-metrics";
import { ScenarioId } from "./types";

export function FireScenariosSection() {
  const [selectedScenario, setSelectedScenario] = useState(
    ScenarioId.REGULAR_FIRE
  );

  const scenario =
    SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];
  const outputs = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, outputs);

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Every FIRE Path, Clearly Mapped
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From traditional FIRE to sabbaticals and part-time work, your custom
          path to financial independence starts here. Just enter your
          data—we&apos;ll do the math.
        </p>
      </div>

      {/* Side-by-side layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:items-start">
        {/* Left Panel - Scenario Selection */}
        <ScenarioTabs
          scenarios={SCENARIOS}
          selectedScenario={selectedScenario}
          onScenarioChange={setSelectedScenario}
        />

        {/* Right Panel - Chart and Results */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center xl:justify-start">
                Your FIRE Projection
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
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
        </div>
      </div>
    </>
  );
}
