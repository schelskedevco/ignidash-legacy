import {
  FireOutputs,
  Scenario,
  FireType,
  RegularFireOutputs,
  CoastFireOutputs,
  BaristaFireOutputs,
} from "../../types";
import { AnimatedNumber } from "@/components/shared/animated-number";

interface KeyMetricsProps {
  outputs: FireOutputs;
  scenario: Scenario;
}

export function KeyMetrics({ outputs, scenario }: KeyMetricsProps) {
  // Extract common values based on FIRE type
  const getDisplayValues = () => {
    switch (scenario.fireType) {
      case FireType.REGULAR_FIRE: {
        const regularOutputs = outputs as RegularFireOutputs;
        const retirementIncome = regularOutputs.fireNumber * 0.04;
        return {
          yearsToTarget: regularOutputs.yearsToFire,
          targetAge: regularOutputs.fireAge,
          fireNumber: regularOutputs.fireNumber,
          retirementIncome,
          monthlySavings: regularOutputs.monthlySavings,
        };
      }
      case FireType.COAST_FIRE: {
        const coastOutputs = outputs as CoastFireOutputs;
        const retirementIncome = coastOutputs.portfolioAtRetirement * 0.04;
        return {
          yearsToTarget: coastOutputs.yearsToCoastFire,
          targetAge: coastOutputs.coastFireAge,
          fireNumber: coastOutputs.coastFireNumber,
          retirementIncome,
          monthlySavings: coastOutputs.monthlySavings,
        };
      }
      case FireType.BARISTA_FIRE: {
        const baristaOutputs = outputs as BaristaFireOutputs;
        const annualSavings =
          scenario.inputs.annualIncome - scenario.inputs.annualExpenses;
        const monthlySavings = Math.round(annualSavings / 12);
        return {
          yearsToTarget: baristaOutputs.yearsToBaristaFire,
          targetAge: baristaOutputs.baristaFireAge,
          fireNumber: baristaOutputs.baristaFireNumber,
          retirementIncome: baristaOutputs.investmentIncome,
          monthlySavings,
        };
      }
    }
  };

  const displayValues = getDisplayValues();

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-center">
        <p className="font-heading text-foreground text-lg font-bold tabular-nums lg:text-xl xl:text-2xl">
          <AnimatedNumber value={displayValues.yearsToTarget} />
        </p>
        <p className="text-foreground mt-1 text-xs font-medium">
          years to FIRE
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          (age <AnimatedNumber value={Math.round(displayValues.targetAge)} />)
        </p>
      </div>

      <div className="text-center">
        <p className="font-heading text-foreground text-lg font-bold tabular-nums lg:text-xl xl:text-2xl">
          <AnimatedNumber value={displayValues.fireNumber} prefix="$" />
        </p>
        <p className="text-foreground mt-1 text-xs font-medium">FIRE target</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Total portfolio needed
        </p>
      </div>

      <div className="text-center">
        <p className="font-heading text-foreground text-lg font-bold tabular-nums lg:text-xl xl:text-2xl">
          <AnimatedNumber
            value={Math.round(displayValues.retirementIncome)}
            prefix="$"
          />
        </p>
        <p className="text-foreground mt-1 text-xs font-medium">
          annual retirement income
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          <AnimatedNumber
            value={Math.round(displayValues.retirementIncome / 12)}
            prefix="($"
            suffix="/month)"
          />
        </p>
      </div>
    </div>
  );
}
