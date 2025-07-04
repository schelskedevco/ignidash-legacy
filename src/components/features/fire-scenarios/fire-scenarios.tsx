"use client";

import { useState } from "react";
import { Route, Info } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { SCENARIOS } from "./data";
import { calculateProjections, generateGrowthData } from "./utils";
import { FinancialInputsCard } from "./components/financial-inputs/financial-inputs-card";
import { FireProjectionChartCard } from "./components/financial-outputs/fire-projection-chart-card";
import { KeyMetricsCard } from "./components/financial-outputs/key-metrics-card";
import { ScenarioId } from "./types";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function FireScenariosSection() {
  const [selectedScenario, setSelectedScenario] = useState(
    ScenarioId.REGULAR_FIRE
  );
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const scenario =
    SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];
  const outputs = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, outputs);

  return (
    <ProductPageSection
      id="fire-scenarios"
      className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28 xl:text-left"
      ariaLabel="Fire Scenarios Section"
      gradientVariant="primaryReverse"
    >
      <ProductPageSectionHeader
        icon={Route}
        title={
          <>
            Every{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent dark:from-pink-400 dark:via-red-400 dark:to-orange-400">
              FIRE
            </span>{" "}
            Path, Clearly Mapped
          </>
        }
        description="Run the numbers on early retirement, sabbaticals, part-time work, and more. See how your future shifts."
      />
      <div className="grid grid-cols-1 place-items-center gap-8 lg:grid-cols-2 lg:gap-4">
        {/* Left Panel - Financial Inputs */}
        <div className="flex h-full w-full flex-col items-center justify-center lg:items-end">
          <div className="flex w-full items-end justify-center lg:justify-between">
            <p className="text-muted-foreground mb-4 text-xs font-medium tracking-wider uppercase lg:ml-4">
              Your Inputs
            </p>
          </div>
          <FinancialInputsCard
            scenarios={SCENARIOS}
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
          />
        </div>

        {/* Right Panel - Financial Outputs */}
        <div className="flex h-full w-full flex-col items-center justify-between gap-4 lg:items-start">
          <div className="flex items-center justify-center gap-2 lg:ml-4 lg:justify-start">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Your Projections
            </p>
            <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className="focus-visible:ring-ring rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Information about projections"
                >
                  <Info className="text-muted-foreground hover:text-muted-foreground/80 h-3 w-3 cursor-pointer transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>
                  Demo projections use a 7% annual return and a 4% withdrawal
                  rate, based on historical averages. Actual results may vary.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <FireProjectionChartCard
            scenario={scenario}
            outputs={outputs}
            growthData={growthData}
          />
          <KeyMetricsCard scenario={scenario} outputs={outputs} />
        </div>
      </div>
    </ProductPageSection>
  );
}
