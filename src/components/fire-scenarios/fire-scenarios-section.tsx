"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  const projections = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, projections);

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Model Any Life You Can Imagine
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Whether you dream of early parenthood, world travel, or pursuing your
          passion — Ignidash helps you design a financial plan that fits your
          unique life goals.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          *Calculations assume 7% annual returns and 4% safe withdrawal rate
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
              <div className="w-full overflow-hidden">
                <GrowthChart
                  data={growthData}
                  projections={projections}
                  scenario={scenario}
                />
              </div>

              <Separator className="my-6" />

              <KeyMetrics projections={projections} scenario={scenario} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
