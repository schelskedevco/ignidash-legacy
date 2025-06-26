"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Scenario,
  CoastFireParameters,
  BaristaFireParameters,
  FireType,
} from "../shared/fire-types";
import { ICON_SIZES } from "@/lib/design-constants";
import {
  User,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Coffee,
} from "lucide-react";
import { FinancialInputDataRow } from "./financial-input-data-row";

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
    <div className="space-y-6">
      {/* Header with icon and badges */}
      <div className="flex items-center justify-between">
        <div className={`rounded-lg p-3 ${scenario.bgColor}`}>
          <Icon className={`${ICON_SIZES.xl} ${scenario.color}`} />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs font-semibold">
            {scenario.fireType}
          </Badge>
          <Badge variant="secondary" className="text-xs font-semibold">
            {scenario.focusArea}
          </Badge>
        </div>
      </div>

      {/* Title and description */}
      <div className="space-y-2">
        <h3 className="font-heading text-2xl font-semibold tracking-tight">
          {scenario.title}
        </h3>
        <p className="text-muted-foreground text-lg">{scenario.subtitle}</p>
        <p className="text-base leading-relaxed">{scenario.content}</p>
      </div>

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
