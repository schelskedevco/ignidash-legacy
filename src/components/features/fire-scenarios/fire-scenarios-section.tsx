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
      <div className="grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2">
        {/* Left Panel - Financial Inputs */}

        <div className="flex flex-col items-end">
          <ConnectingWire placement="top" />
          <FinancialInputsCard
            scenarios={SCENARIOS}
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
          />
          <ConnectingWire placement="bottom" />
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
