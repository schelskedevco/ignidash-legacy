"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScenarioDetails } from "./scenario-details";
import { Scenario } from "./types";

interface ScenarioTabsProps {
  scenarios: Scenario[];
  selectedScenario: string;
  onScenarioChange: (scenarioId: string) => void;
}

export function ScenarioTabs({
  scenarios,
  selectedScenario,
  onScenarioChange,
}: ScenarioTabsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={selectedScenario} onValueChange={onScenarioChange}>
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