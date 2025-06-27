"use client";

import { useState } from "react";
import { Route } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { BottomShadow } from "@/components/layout/effects/bottom-shadow";
import { SCENARIOS } from "./lib/fire-data";
import { calculateProjections, generateGrowthData } from "./lib/fire-utils";
import { FinancialInputsCard } from "./components/financial-inputs/financial-inputs-card";
import { FinancialOutputsCard } from "./components/financial-outputs/financial-outputs-card";
import { ScenarioId } from "./lib/fire-types";
import { ConnectingWire } from "./components/connecting-wire";

export function FireScenariosSection() {
  const [selectedScenario, setSelectedScenario] = useState(
    ScenarioId.REGULAR_FIRE
  );

  const scenario =
    SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];
  const outputs = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, outputs);

  return (
    <ProductPageSection
      id="fire-scenarios"
      ariaLabel="Fire Scenarios Section"
      gradientVariant="warmRose"
      bottomBackgroundComponents={<BottomShadow />}
    >
      <ProductPageSectionHeader
        icon={Route}
        title="Every FIRE Path, Clearly Mapped"
        description="Compare early retirement, sabbaticals, part-time transitions, and creative combinations. We'll calculate the timeline and trade-offs for every scenario you want to explore."
      />
      <div className="mx-auto flex max-w-7xl flex-col items-center lg:flex-row">
        {/* Left Panel - Financial Inputs */}
        <FinancialInputsCard
          scenarios={SCENARIOS}
          selectedScenario={selectedScenario}
          onScenarioChange={setSelectedScenario}
        />

        <div className="flex flex-row justify-center gap-2 lg:flex-col lg:gap-4">
          <ConnectingWire variant="step" direction="normal" />
          <ConnectingWire variant="tight" direction="reverse" />
          <ConnectingWire variant="flip" direction="normal" />
          <ConnectingWire variant="wide" direction="reverse" />
          <ConnectingWire variant="lean" direction="normal" />
        </div>

        {/* Right Panel - Financial Outputs */}
        <FinancialOutputsCard
          scenario={scenario}
          outputs={outputs}
          growthData={growthData}
        />
      </div>
    </ProductPageSection>
  );
}
