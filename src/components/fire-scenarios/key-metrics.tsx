"use client";

import { Projections, Scenario } from "./types";
import { AnimatedNumber } from "./animated-number";

interface KeyMetricsProps {
  projections: Projections;
  scenario: Scenario;
}

export function KeyMetrics({ projections, scenario }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📅</span>
        <div>
          <p className="font-medium">
            {projections.yearsToTarget}
            {projections.monthsToTarget > 0
              ? `.${projections.monthsToTarget}`
              : ""}{" "}
            years to FIRE
          </p>
          <p className="text-xs text-muted-foreground">
            (age {projections.targetAge})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">💰</span>
        <div>
          <p className="font-medium">
            ${projections.fireNumber.toLocaleString()} FIRE target
          </p>
          <p className="text-xs text-muted-foreground">
            Total portfolio needed
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">💵</span>
        <div>
          <p className="font-medium">
            $<AnimatedNumber value={projections.retirementIncome} />
            /year retirement income
          </p>
          <p className="text-xs text-muted-foreground">
            ($
            {Math.round(projections.retirementIncome / 12).toLocaleString()}
            /month)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">📊</span>
        <div>
          <p className="font-medium">{projections.savingsRate}% savings rate</p>
          <p className="text-xs text-muted-foreground">
            $
            {Math.round(
              (scenario.inputs.annualIncome - scenario.inputs.annualExpenses) /
                12
            ).toLocaleString()}{" "}
            saved monthly
          </p>
        </div>
      </div>
    </div>
  );
}
