"use client";

import {
  FireOutputs,
  Scenario,
  FireType,
  RegularFireOutputs,
  CoastFireOutputs,
  BaristaFireOutputs,
} from "./types";
import { AnimatedNumber } from "./animated-number";

interface KeyMetricsProps {
  outputs: FireOutputs;
  scenario: Scenario;
}

export function KeyMetrics({ outputs, scenario }: KeyMetricsProps) {
  // Extract common values based on FIRE type
  const getDisplayValues = () => {
    if (scenario.fireType === FireType.REGULAR_FIRE) {
      const regularOutputs = outputs as RegularFireOutputs;
      const retirementIncome = regularOutputs.fireNumber * 0.04;
      return {
        yearsToTarget: regularOutputs.yearsToFire,
        targetAge: regularOutputs.fireAge,
        fireNumber: regularOutputs.fireNumber,
        retirementIncome,
        savingsRate: regularOutputs.savingsRate,
        monthlySavings: regularOutputs.monthlySavings,
      };
    } else if (scenario.fireType === FireType.COAST_FIRE) {
      const coastOutputs = outputs as CoastFireOutputs;
      const retirementIncome = coastOutputs.portfolioAtRetirement * 0.04;
      const annualSavings =
        scenario.inputs.annualIncome - scenario.inputs.annualExpenses;
      const savingsRate = Math.round(
        (annualSavings / scenario.inputs.annualIncome) * 100
      );
      return {
        yearsToTarget: coastOutputs.yearsToCoastFire,
        targetAge: coastOutputs.coastFireAge,
        fireNumber: coastOutputs.coastFireNumber,
        retirementIncome,
        savingsRate,
        monthlySavings: coastOutputs.monthlySavings,
      };
    } else {
      const baristaOutputs = outputs as BaristaFireOutputs;
      const annualSavings =
        scenario.inputs.annualIncome - scenario.inputs.annualExpenses;
      const savingsRate = Math.round(
        (annualSavings / scenario.inputs.annualIncome) * 100
      );
      const monthlySavings = Math.round(annualSavings / 12);
      return {
        yearsToTarget: baristaOutputs.yearsToBaristaFire,
        targetAge: baristaOutputs.baristaFireAge,
        fireNumber: baristaOutputs.baristaFireNumber,
        retirementIncome: baristaOutputs.investmentIncome,
        savingsRate,
        monthlySavings,
      };
    }
  };

  const displayValues = getDisplayValues();

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          {displayValues.yearsToTarget}
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          years to FIRE
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          (age {displayValues.targetAge})
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          ${displayValues.fireNumber.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-foreground mt-1">FIRE target</p>
        <p className="text-xs text-muted-foreground mt-1">
          Total portfolio needed
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          $<AnimatedNumber value={Math.round(displayValues.retirementIncome)} />
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          annual retirement income
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          ($
          {Math.round(displayValues.retirementIncome / 12).toLocaleString()}
          /month)
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground tabular-nums">
          {displayValues.savingsRate}%
        </p>
        <p className="text-sm font-medium text-foreground mt-1">savings rate</p>
      </div>
    </div>
  );
}
