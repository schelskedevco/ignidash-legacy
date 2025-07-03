import { Card, CardContent } from "@/components/ui/card";
import { GrowthChart } from "./growth-chart";
import { Scenario, FireOutputs, GrowthDataPoint } from "../../lib/fire-types";

interface FireProjectionChartCardProps {
  scenario: Scenario;
  outputs: FireOutputs;
  growthData: GrowthDataPoint[];
}

export function FireProjectionChartCard({
  scenario,
  outputs,
  growthData,
}: FireProjectionChartCardProps) {
  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl transition-all duration-300 hover:shadow-sm">
      <CardContent>
        <GrowthChart data={growthData} outputs={outputs} scenario={scenario} />
      </CardContent>
    </Card>
  );
}
