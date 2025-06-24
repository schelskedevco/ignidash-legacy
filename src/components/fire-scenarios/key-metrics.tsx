"use client";

import { Projections, Scenario } from "./types";
import { AnimatedNumber } from "./animated-number";

interface KeyMetricsProps {
  projections: Projections;
  scenario: Scenario;
}

export function KeyMetrics({ projections, scenario }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          {projections.yearsToTarget}
          {projections.monthsToTarget > 0
            ? `.${projections.monthsToTarget}`
            : ""}{" "}
          years to FIRE
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          (age {projections.targetAge})
        </p>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          ${projections.fireNumber.toLocaleString()} FIRE target
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Total portfolio needed
        </p>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          $<AnimatedNumber value={projections.retirementIncome} />
          /year retirement income
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ($
          {Math.round(projections.retirementIncome / 12).toLocaleString()}
          /month)
        </p>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          {projections.savingsRate}% savings rate
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          $
          {Math.round(
            (scenario.inputs.annualIncome - scenario.inputs.annualExpenses) / 12
          ).toLocaleString()}{" "}
          saved monthly
        </p>
      </div>
    </div>
  );
}
