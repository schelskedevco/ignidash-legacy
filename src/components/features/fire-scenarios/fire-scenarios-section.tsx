"use client";

import { useState } from "react";
import { Route, Info } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { SCENARIOS } from "./lib/fire-data";
import { calculateProjections, generateGrowthData } from "./lib/fire-utils";
import { FinancialInputsCard } from "./components/financial-inputs/financial-inputs-card";
import { FireProjectionChartCard } from "./components/financial-outputs/fire-projection-chart-card";
import { KeyMetricsCard } from "./components/financial-outputs/key-metrics-card";
import { ScenarioId } from "./lib/fire-types";
import { ConnectingWire } from "./components/connecting-wire";
import { MAX_WIDTHS, SPACING, TYPOGRAPHY } from "@/lib/design-constants";
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
      className={`${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment} mx-auto`}
      ariaLabel="Fire Scenarios Section"
      gradientVariant="warmRose"
      showBottomShadow={true}
    >
      <ProductPageSectionHeader
        icon={Route}
        title="Every Path, Clearly Mapped"
        description="Compare early retirement, sabbaticals, part-time transitions, and creative combinations. We'll calculate the timeline and trade-offs for every scenario you want to explore."
      />
      <div className="grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2">
        {/* Left Panel - Financial Inputs */}
        <div className="flex h-full w-full flex-col items-end justify-center">
          <div className="flex w-full items-end justify-center lg:justify-between">
            <p className="text-muted-foreground mb-4 ml-4 text-xs font-medium tracking-wider uppercase">
              Your Inputs
            </p>

            <ConnectingWire placement="top" />
          </div>
          <FinancialInputsCard
            scenarios={SCENARIOS}
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
          />
          <ConnectingWire placement="bottom" />
        </div>

        {/* Right Panel - Financial Outputs */}
        <div className="flex h-full w-full flex-col justify-between gap-4">
          <div className="ml-4 flex items-center justify-center gap-2 lg:justify-start">
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
