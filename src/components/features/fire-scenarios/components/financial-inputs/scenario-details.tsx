import {
  Scenario,
  CoastFireParameters,
  BaristaFireParameters,
  FireType,
} from "../../types";
import {
  User,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Coffee,
} from "lucide-react";
import { FinancialInputDataRow } from "./financial-input-data-row";
import { ScenarioHeader } from "./scenario-header";
import { Separator } from "@/components/ui/separator";

interface ScenarioDetailsProps {
  scenario: Scenario;
}

export function ScenarioDetails({ scenario }: ScenarioDetailsProps) {
  const Icon = scenario.icon;

  // Type-safe helpers to access specific parameter properties
  const getCoastFireParameters = () => {
    if (scenario.fireType === FireType.COAST_FIRE) {
      return scenario.parameters as CoastFireParameters;
    }
    return null;
  };

  const getBaristaFireParameters = () => {
    if (scenario.fireType === FireType.BARISTA_FIRE) {
      return scenario.parameters as BaristaFireParameters;
    }
    return null;
  };

  return (
    <div className="space-y-2 sm:space-y-4 lg:space-y-6">
      <ScenarioHeader
        icon={Icon}
        title={scenario.subtitle}
        description={scenario.content}
        bgColor={scenario.bgColor}
        iconColor={scenario.color}
      />

      {/* Separator */}
      <Separator />

      {/* Financial inputs */}
      <div className="space-y-3 text-sm">
        <FinancialInputDataRow
          icon={User}
          label="Current Age"
          value={scenario.inputs.age}
        />
        <FinancialInputDataRow
          icon={DollarSign}
          label="Annual Income"
          value={scenario.inputs.annualIncome}
          prefix="$"
        />
        <FinancialInputDataRow
          icon={ShoppingCart}
          label="Annual Expenses"
          value={scenario.inputs.annualExpenses}
          prefix="$"
        />
        <FinancialInputDataRow
          icon={TrendingUp}
          label="Current Invested Assets"
          value={scenario.inputs.currentInvestedAssets}
          prefix="$"
        />

        {/* Coast FIRE Parameters */}
        {scenario.fireType === FireType.COAST_FIRE &&
          getCoastFireParameters() && (
            <FinancialInputDataRow
              icon={Calendar}
              label="Target Retirement Age"
              value={getCoastFireParameters()!.targetRetirementAge}
            />
          )}

        {/* Barista FIRE Parameters */}
        {scenario.fireType === FireType.BARISTA_FIRE &&
          getBaristaFireParameters() && (
            <FinancialInputDataRow
              icon={Coffee}
              label="Part-time Monthly Income"
              value={getBaristaFireParameters()!.partTimeMonthlyIncome}
              prefix="$"
            />
          )}
      </div>
    </div>
  );
}
