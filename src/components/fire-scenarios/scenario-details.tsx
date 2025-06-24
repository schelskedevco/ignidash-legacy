"use client";

import { Badge } from "@/components/ui/badge";
import { Scenario } from "./types";

interface ScenarioDetailsProps {
  scenario: Scenario;
}

export function ScenarioDetails({ scenario }: ScenarioDetailsProps) {
  const Icon = scenario.icon;

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
        <p className="text-lg text-muted-foreground">
          {scenario.subtitle}
        </p>
        <p className="text-base leading-relaxed">
          {scenario.content}
        </p>
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
          <span className="text-muted-foreground">Current Net Worth:</span>
          <span className="font-medium">
            ${scenario.inputs.currentNetWorth.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Strategy Details */}
      <div className="space-y-3 text-sm">
        <h4 className="font-semibold text-foreground">Strategy Details</h4>
        {scenario.fireType === "Coast FIRE" && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coast Target:</span>
              <span className="font-medium">
                ${(scenario.assumptions as any).coastFireTarget?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reduced Income:</span>
              <span className="font-medium">
                ${(scenario.assumptions as any).reducedIncomeAfterKids?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retirement Age:</span>
              <span className="font-medium">
                {(scenario.assumptions as any).fullRetirementAge}
              </span>
            </div>
          </div>
        )}
        {scenario.fireType === "Barista FIRE" && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Part-time Income:</span>
              <span className="font-medium">
                ${(scenario.assumptions as any).partTimeIncome?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travel Budget:</span>
              <span className="font-medium">
                ${(scenario.assumptions as any).travelBudget?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mini Retirements:</span>
              <span className="font-medium">
                {(scenario.assumptions as any).miniRetirements} planned
              </span>
            </div>
          </div>
        )}
        {scenario.fireType === "Regular FIRE" && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">FIRE Target:</span>
              <span className="font-medium">
                ${(scenario.assumptions as any).fireTarget?.toLocaleString()}
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
        {scenario.fireType === "Coast FIRE" && (
          <ul className="space-y-1 text-muted-foreground">
            <li>• Front-load savings before major life changes</li>
            <li>• Reach "coast" number early, then reduce saving</li>
            <li>• Let compound growth do the heavy lifting</li>
            <li>• Maintain lifestyle during family years</li>
          </ul>
        )}
        {scenario.fireType === "Barista FIRE" && (
          <ul className="space-y-1 text-muted-foreground">
            <li>• Semi-retirement with part-time income</li>
            <li>• Portfolio covers most expenses</li>
            <li>• Flexible work enables travel and sabbaticals</li>
            <li>• Lower pressure than full FIRE</li>
          </ul>
        )}
        {scenario.fireType === "Regular FIRE" && (
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