"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Scenario,
  CoastFireParameters,
  BaristaFireParameters,
  FireType,
} from "./types";

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
        <div className={`p-3 rounded-lg ${scenario.bgColor}`}>
          <Icon className={`h-8 w-8 ${scenario.color}`} />
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
        <h3 className="text-2xl font-semibold tracking-tight">
          {scenario.title}
        </h3>
        <p className="text-lg text-muted-foreground">{scenario.subtitle}</p>
        <p className="text-base leading-relaxed">{scenario.content}</p>
      </div>

      {/* Separator */}
      <div className="h-px bg-border" />

      {/* Financial inputs */}
      <div className="space-y-3 text-sm">
        <h4 className="font-semibold text-foreground mb-3">Financial Inputs</h4>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Current Age:</span>
          <span className="font-medium">{scenario.inputs.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Annual Income:</span>
          <span className="font-medium">
            ${scenario.inputs.annualIncome.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Annual Expenses:</span>
          <span className="font-medium">
            ${scenario.inputs.annualExpenses.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Current Invested Assets:
          </span>
          <span className="font-medium">
            ${scenario.inputs.currentInvestedAssets.toLocaleString()}
          </span>
        </div>
      </div>

      {/* FIRE-specific Settings Section */}
      {(scenario.fireType === FireType.COAST_FIRE ||
        scenario.fireType === FireType.BARISTA_FIRE) && (
        <>
          <Separator />
          <div className="space-y-3 text-sm">
            <h4 className="font-semibold text-foreground mb-3">
              {scenario.fireType === FireType.COAST_FIRE
                ? "Coast FIRE Settings"
                : "Barista FIRE Settings"}
            </h4>

            {/* Coast FIRE Parameters */}
            {scenario.fireType === FireType.COAST_FIRE &&
              getCoastFireParameters() && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Target Retirement Age:
                  </span>
                  <span className="font-medium">
                    {getCoastFireParameters()!.targetRetirementAge}
                  </span>
                </div>
              )}

            {/* Barista FIRE Parameters */}
            {scenario.fireType === FireType.BARISTA_FIRE &&
              getBaristaFireParameters() && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Part-time Monthly Income:
                  </span>
                  <span className="font-medium">
                    $
                    {getBaristaFireParameters()!.partTimeMonthlyIncome.toLocaleString()}
                  </span>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
}
