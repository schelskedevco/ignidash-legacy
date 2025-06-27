import { Card, CardContent } from "@/components/ui/card";
import { KeyMetrics } from "./key-metrics";
import { Scenario, FireOutputs } from "../../lib/fire-types";

interface KeyMetricsCardProps {
  scenario: Scenario;
  outputs: FireOutputs;
}

export function KeyMetricsCard({ scenario, outputs }: KeyMetricsCardProps) {
  return (
    <Card className="hover:border-primary/30 w-full transition-all duration-300 hover:shadow-sm">
      <CardContent>
        <KeyMetrics outputs={outputs} scenario={scenario} />
      </CardContent>
    </Card>
  );
}
