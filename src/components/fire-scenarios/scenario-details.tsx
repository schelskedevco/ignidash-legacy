"use client";

import { Badge } from "@/components/ui/badge";
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

  // Calculate FIRE targets
  const getFireTarget = () => {
    return scenario.inputs.annualExpenses / 0.04;
  };

  const getBaristaFireTarget = () => {
    const baristaParams = getBaristaFireParameters();
    if (baristaParams) {
      const partTimeAnnualIncome = baristaParams.partTimeMonthlyIncome * 12;
      return (scenario.inputs.annualExpenses - partTimeAnnualIncome) / 0.04;
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

      {/* Strategy Details */}
      <div className="space-y-3 text-sm">
        <h4 className="font-semibold text-foreground">Strategy Details</h4>
        {scenario.fireType === FireType.COAST_FIRE &&
          getCoastFireParameters() && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Target Retirement Age:
                </span>
                <span className="font-medium">
                  {getCoastFireParameters()!.targetRetirementAge}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full FIRE Target:</span>
                <span className="font-medium">
                  ${getFireTarget().toLocaleString()}
                </span>
              </div>
            </div>
          )}
        {scenario.fireType === FireType.BARISTA_FIRE &&
          getBaristaFireParameters() && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Barista Target:</span>
                <span className="font-medium">
                  ${getBaristaFireTarget()!.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Part-time Monthly Income:
                </span>
                <span className="font-medium">
                  $
                  {getBaristaFireParameters()!.partTimeMonthlyIncome.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        {scenario.fireType === FireType.REGULAR_FIRE && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">FIRE Target:</span>
              <span className="font-medium">
                ${getFireTarget().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Withdrawal Rate:</span>
              <span className="font-medium">4.0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Returns:</span>
              <span className="font-medium">7.0%</span>
            </div>
          </div>
        )}
      </div>

      {/* Key Strategy Points */}
      <div className="space-y-3 text-sm">
        <h4 className="font-semibold text-foreground">How It Works</h4>
        {scenario.fireType === FireType.COAST_FIRE && (
          <ul className="space-y-1 text-muted-foreground">
            <li>• Front-load savings before major life changes</li>
            <li>
              • Reach &ldquo;coast&rdquo; number early, then reduce saving
            </li>
            <li>• Let compound growth do the heavy lifting</li>
            <li>• Maintain lifestyle during family years</li>
          </ul>
        )}
        {scenario.fireType === FireType.BARISTA_FIRE && (
          <ul className="space-y-1 text-muted-foreground">
            <li>• Semi-retirement with part-time income</li>
            <li>• Portfolio covers most expenses</li>
            <li>• Flexible work enables travel and sabbaticals</li>
            <li>• Lower pressure than full FIRE</li>
          </ul>
        )}
        {scenario.fireType === FireType.REGULAR_FIRE && (
          <ul className="space-y-1 text-muted-foreground">
            <li>• Save consistently until full independence</li>
            <li>• 25x annual expenses rule</li>
            <li>• Complete work optional lifestyle</li>
            <li>• Traditional 4% withdrawal strategy</li>
          </ul>
        )}
      </div>
    </div>
  );
}
