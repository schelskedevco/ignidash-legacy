"use client";

import { useState } from "react";
import { Route } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SCENARIOS } from "./shared/fire-data";
import { calculateProjections, generateGrowthData } from "./shared/fire-utils";
import { FinancialInputsCard } from "./financial-inputs-card/financial-inputs-card";
import { FinancialOutputsCard } from "./financial-outputs-card/financial-outputs-card";
import { ConnectingArrows } from "./connecting-arrows";
import { ScenarioId } from "./shared/fire-types";

export function FireScenariosSection() {
  const [selectedScenario, setSelectedScenario] = useState(
    ScenarioId.REGULAR_FIRE
  );

  const scenario =
    SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];
  const outputs = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, outputs);

  return (
    <SectionWrapper
      header={
        <SectionHeader
          icon={Route}
          title="Every FIRE Path, Clearly Mapped"
          description="From traditional FIRE to sabbaticals and part-time work, your custom path to financial independence starts here. Just enter your data—we'll do the math."
        />
      }
    >
      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 lg:grid-cols-[1fr_auto_1fr] xl:gap-8">
        {/* Left Panel - Financial Inputs */}
        <FinancialInputsCard
          scenarios={SCENARIOS}
          selectedScenario={selectedScenario}
          onScenarioChange={setSelectedScenario}
        />

        {/* Connecting Arrows */}
        <ConnectingArrows selectedScenario={selectedScenario} />

        {/* Right Panel - Financial Outputs */}
        <FinancialOutputsCard
          scenario={scenario}
          outputs={outputs}
          growthData={growthData}
        />
      </div>
    </SectionWrapper>
  );
}
