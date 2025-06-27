"use client";

import { useState } from "react";
import { Route } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionContainer } from "@/components/layout/section-container";
import { GradientBackground } from "@/components/layout/gradient-background";
import { ContentWrapper } from "@/components/layout/content-wrapper";
import { TopFade } from "@/components/layout/top-fade";
import { BottomShadow } from "@/components/layout/bottom-shadow";
import { SCENARIOS } from "./shared/fire-data";
import { calculateProjections, generateGrowthData } from "./shared/fire-utils";
import { FinancialInputsCard } from "./financial-inputs-card/financial-inputs-card";
import { FinancialOutputsCard } from "./financial-outputs-card/financial-outputs-card";
import { ScenarioId } from "./shared/fire-types";
import { ConnectingWire } from "./connecting-wire";

export function FireScenariosSection() {
  const [selectedScenario, setSelectedScenario] = useState(
    ScenarioId.REGULAR_FIRE
  );

  const scenario =
    SCENARIOS.find((s) => s.id === selectedScenario) || SCENARIOS[0];
  const outputs = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, outputs);

  return (
    <SectionContainer id="fire-scenarios" ariaLabel="Fire Scenarios Section">
      <TopFade />
      <GradientBackground variant="fireScenarios" />
      <ContentWrapper variant="full">
        <SectionWrapper
          header={
            <SectionHeader
              icon={Route}
              title="Every FIRE Path, Clearly Mapped"
              description="Compare early retirement, sabbaticals, part-time transitions, and creative combinations. We'll calculate the timeline and trade-offs for every scenario you want to explore."
            />
          }
        >
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
        </SectionWrapper>
      </ContentWrapper>
      <BottomShadow />
    </SectionContainer>
  );
}
