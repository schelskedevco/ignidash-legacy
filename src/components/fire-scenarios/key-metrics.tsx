"use client";

import { Projections, Scenario } from "./types";
import { AnimatedNumber } from "./animated-number";

interface KeyMetricsProps {
  projections: Projections;
  scenario: Scenario;
}

export function KeyMetrics({ projections, scenario }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          {projections.yearsToTarget}
          {projections.monthsToTarget > 0
            ? `.${projections.monthsToTarget}`
            : ""}
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          years to FIRE
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          (age {projections.targetAge})
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          ${projections.fireNumber.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-foreground mt-1">FIRE target</p>
        <p className="text-xs text-muted-foreground mt-1">
          Total portfolio needed
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          $<AnimatedNumber value={projections.retirementIncome} />
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          /year retirement income
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          ($
          {Math.round(projections.retirementIncome / 12).toLocaleString()}
          /month)
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          {projections.savingsRate}%
        </p>
        <p className="text-sm font-medium text-foreground mt-1">savings rate</p>
        <p className="text-xs text-muted-foreground mt-1">
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
