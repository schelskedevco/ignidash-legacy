"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScenarioDetails } from "./scenario-details";
import { Scenario, ScenarioId } from "./types";

interface ScenarioTabsProps {
  scenarios: Scenario[];
  selectedScenario: ScenarioId;
  onScenarioChange: (scenarioId: ScenarioId) => void;
}

export function ScenarioTabs({
  scenarios,
  selectedScenario,
  onScenarioChange,
}: ScenarioTabsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs
          value={selectedScenario}
          onValueChange={(value) => onScenarioChange(value as ScenarioId)}
        >
          <TabsList className="grid w-full grid-cols-3">
            {scenarios.map((scenario) => (
              <TabsTrigger
                key={scenario.id}
                value={scenario.id}
                className="text-xs sm:text-sm"
              >
                {scenario.fireType}
              </TabsTrigger>
            ))}
          </TabsList>

          {scenarios.map((scenario) => (
            <TabsContent key={scenario.id} value={scenario.id} className="mt-6">
              <ScenarioDetails scenario={scenario} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
