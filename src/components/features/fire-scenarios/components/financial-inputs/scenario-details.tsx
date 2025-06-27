import { Separator } from "@/components/ui/separator";
import {
  Scenario,
  CoastFireParameters,
  BaristaFireParameters,
  FireType,
} from "../../lib/fire-types";
import { SPACING } from "@/lib/design-constants";
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
    <div className={SPACING.elementSpacing}>
      <ScenarioHeader
        icon={Icon}
        title={scenario.subtitle}
        description={scenario.content}
        bgColor={scenario.bgColor}
        iconColor={scenario.color}
      />

      {/* Separator */}
      <div className="bg-border h-px" />

      {/* Financial inputs */}
      <div className="space-y-3 text-sm">
        <h4 className="font-heading text-foreground mb-3 font-semibold">
          Financial Inputs
        </h4>
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
      </div>

      {/* FIRE-specific Settings Section */}
      {(scenario.fireType === FireType.COAST_FIRE ||
        scenario.fireType === FireType.BARISTA_FIRE) && (
        <>
          <Separator />
          <div className="space-y-3 text-sm">
            <h4 className="font-heading text-foreground mb-3 font-semibold">
              {scenario.fireType === FireType.COAST_FIRE
                ? "Coast FIRE Settings"
                : "Barista FIRE Settings"}
            </h4>

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
        </>
      )}
    </div>
  );
}
