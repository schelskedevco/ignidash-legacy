"use client";

import { useState } from "react";
import Image from "next/image";
import { SCENARIOS } from "./shared/fire-data";
import { calculateProjections, generateGrowthData } from "./shared/fire-utils";
import { FinancialInputsCard } from "./financial-inputs-card/financial-inputs-card";
import { FinancialOutputsCard } from "./financial-outputs-card/financial-outputs-card";
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
    <>
      <div className="mb-12 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
          Every FIRE Path, Clearly Mapped
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
          From traditional FIRE to sabbaticals and part-time work, your custom
          path to financial independence starts here. Just enter your
          data—we&apos;ll do the math.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="w-full px-4 sm:px-6 xl:px-12 3xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 xl:gap-8 items-stretch">
          {/* Left Panel - Financial Inputs */}
          <FinancialInputsCard
            scenarios={SCENARIOS}
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
          />

          {/* Connecting Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <Image
              src="/right-arrow-outline-svgrepo-com.svg"
              alt="Arrow connecting financial inputs to outputs"
              width={48}
              height={48}
              className="opacity-60 animate-pulse dark:invert"
            />
          </div>

          {/* Right Panel - Financial Outputs */}
          <FinancialOutputsCard
            scenario={scenario}
            outputs={outputs}
            growthData={growthData}
          />
        </div>
      </div>
    </>
  );
}
