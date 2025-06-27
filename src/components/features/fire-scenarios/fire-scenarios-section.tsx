"use client";

import { useState } from "react";
import { Route } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { SCENARIOS } from "./lib/fire-data";
import { calculateProjections, generateGrowthData } from "./lib/fire-utils";
import { FinancialInputsCard } from "./components/financial-inputs/financial-inputs-card";
import { FinancialOutputsCard } from "./components/financial-outputs/financial-outputs-card";
import { ScenarioId } from "./lib/fire-types";
import { ConnectingWire } from "./components/connecting-wire";
import { MAX_WIDTHS, SPACING, TYPOGRAPHY } from "@/lib/design-constants";

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
      className={`${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment} mx-auto`}
      ariaLabel="Fire Scenarios Section"
      gradientVariant="warmRose"
      showBottomShadow={true}
    >
      <ProductPageSectionHeader
        icon={Route}
        title="Every FIRE Path, Clearly Mapped"
        description="Compare early retirement, sabbaticals, part-time transitions, and creative combinations. We'll calculate the timeline and trade-offs for every scenario you want to explore."
      />
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-0 lg:flex-row">
        {/* Left Panel - Financial Inputs */}
        <FinancialInputsCard
          scenarios={SCENARIOS}
          selectedScenario={selectedScenario}
          onScenarioChange={setSelectedScenario}
        />

        <div className="hidden flex-row justify-center sm:flex lg:flex-col">
          <ConnectingWire idx={0} direction="reverse" />
          <ConnectingWire idx={1} />
          <ConnectingWire idx={2} direction="reverse" />
          <ConnectingWire idx={3} />
          <ConnectingWire idx={4} direction="reverse" />
          <ConnectingWire idx={5} />
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
