"use client";

import { useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

import { SCENARIOS } from "./data";
import { calculateProjections, generateGrowthData } from "./utils";
import { ScenarioCarousel } from "./scenario-carousel";
import { GrowthChart } from "./growth-chart";
import { KeyMetrics } from "./key-metrics";

export function FireScenariosSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const selectedScenario = SCENARIOS[selectedIndex];
  const projections = calculateProjections(selectedScenario);
  const growthData = generateGrowthData(selectedScenario, projections);

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

      <ScenarioCarousel
        scenarios={SCENARIOS}
        selectedIndex={selectedIndex}
        onSelectionChange={setSelectedIndex}
        api={api}
        setApi={setApi}
      />

      {/* Dynamic output section */}
      <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Your Path to Freedom</h3>
          <p className="text-muted-foreground">
            Real-time projections for {selectedScenario.title}
          </p>
        </div>

        {/* Single Chart Card with Embedded Metrics */}
        <div className="max-w-5xl mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 sm:p-6">
            <GrowthChart data={growthData} projections={projections} />

            <Separator className="my-6" />

            <KeyMetrics projections={projections} scenario={selectedScenario} />
          </div>
        </div>
      </div>
    </>
  );
}
