import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScenarioDetails } from "./scenario-details";
import { Scenario, ScenarioId } from "../../types";

interface FinancialInputsCardProps {
  scenarios: Scenario[];
  selectedScenario: ScenarioId;
  onScenarioChange: (scenarioId: ScenarioId) => void;
}

export function FinancialInputsCard({
  scenarios,
  selectedScenario,
  onScenarioChange,
}: FinancialInputsCardProps) {
  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl transition-all duration-300 hover:shadow-sm">
      <CardContent>
        <Tabs
          value={selectedScenario}
          onValueChange={(value) => onScenarioChange(value as ScenarioId)}
        >
          <TabsList className="flex w-full gap-2">
            {scenarios.map((scenario) => (
              <TabsTrigger
                key={scenario.id}
                value={scenario.id}
                className="flex-1 text-xs sm:text-sm"
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
