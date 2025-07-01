import {
  LifeEventData,
  LifeEventSelection,
  LifeEventImpact,
  InvestmentOption,
} from "./life-event-types";
import {
  Scenario,
  ScenarioInputs,
  RegularFireOutputs,
  FireType,
  ScenarioId,
} from "@/components/features/fire-scenarios/lib/fire-types";
import { calculateProjections } from "@/components/features/fire-scenarios/lib/fire-utils";
import { Target } from "lucide-react";

// Baseline FIRE scenario inputs
export const BASELINE_INPUTS: ScenarioInputs = {
  age: 28,
  annualIncome: 85000,
  annualExpenses: 50000,
  currentInvestedAssets: 75000,
  safeWithdrawalRate: 0.04,
  expectedReturns: 0.07,
};

// Calculate the total cost of selected life events
export function calculateTotalCost(selections: LifeEventSelection[]): number {
  return selections.reduce(
    (total, selection) => total + selection.option.cost,
    0
  );
}

// Calculate the impact of a single life event
export function calculateSingleEventImpact(
  event: LifeEventData,
  selection: LifeEventSelection
): LifeEventImpact {
  const impact: LifeEventImpact = {
    immediateAssetReduction: 0,
    annualExpenseIncrease: 0,
    monthlyIncomeAfterBreakeven: 0,
    breakEvenMonths: 0,
  };

  switch (event.impactType) {
    case "immediate":
      // Immediate expenses reduce current assets
      impact.immediateAssetReduction = selection.option.cost;
      break;

    case "ongoing":
      // Ongoing expenses increase annual expenses over duration
      // Convert total cost to annual expense over duration
      impact.annualExpenseIncrease =
        selection.option.cost / event.durationYears;
      break;

    case "investment":
      // Investments reduce assets initially but provide income after break-even
      const investmentOption = selection.option as InvestmentOption;
      impact.immediateAssetReduction = investmentOption.cost;
      impact.monthlyIncomeAfterBreakeven = investmentOption.monthlyReturn;
      impact.breakEvenMonths = investmentOption.breakEvenMonths;
      break;
  }

  return impact;
}

// Calculate combined impact of all selected life events
export function calculateLifeEventImpact(
  events: LifeEventData[],
  selections: LifeEventSelection[]
): LifeEventImpact {
  const combinedImpact: LifeEventImpact = {
    immediateAssetReduction: 0,
    annualExpenseIncrease: 0,
    monthlyIncomeAfterBreakeven: 0,
    breakEvenMonths: 0,
  };

  selections.forEach((selection) => {
    const event = events.find((e) => e.id === selection.eventId);
    if (!event) return;

    const impact = calculateSingleEventImpact(event, selection);

    // Aggregate impacts
    combinedImpact.immediateAssetReduction += impact.immediateAssetReduction;
    combinedImpact.annualExpenseIncrease += impact.annualExpenseIncrease;

    // For simplicity, sum monthly income from all investments
    // In reality, different investments might have different break-even periods
    combinedImpact.monthlyIncomeAfterBreakeven +=
      impact.monthlyIncomeAfterBreakeven;

    // Use the longest break-even period
    combinedImpact.breakEvenMonths = Math.max(
      combinedImpact.breakEvenMonths,
      impact.breakEvenMonths
    );
  });

  return combinedImpact;
}

// Adjust scenario inputs based on life event impacts
export function adjustScenarioForLifeEvents(
  baseInputs: ScenarioInputs,
  impact: LifeEventImpact
): ScenarioInputs {
  // Start with a copy of base inputs
  const adjustedInputs = { ...baseInputs };

  // Reduce current assets by immediate expenses
  adjustedInputs.currentInvestedAssets = Math.max(
    0,
    baseInputs.currentInvestedAssets - impact.immediateAssetReduction
  );

  // Increase annual expenses by ongoing costs
  adjustedInputs.annualExpenses =
    baseInputs.annualExpenses + impact.annualExpenseIncrease;

  // Reduce expenses by investment income (conservative: annual income from monthly)
  // This is a simplification - in reality, income would start after break-even
  const annualInvestmentIncome = impact.monthlyIncomeAfterBreakeven * 12;
  adjustedInputs.annualExpenses = Math.max(
    0,
    adjustedInputs.annualExpenses - annualInvestmentIncome
  );

  return adjustedInputs;
}

// Calculate FIRE projections with life events
export function calculateFireWithLifeEvents(
  events: LifeEventData[],
  selections: LifeEventSelection[]
): {
  baseline: RegularFireOutputs;
  adjusted: RegularFireOutputs;
  impact: LifeEventImpact;
  yearsImpact: number;
} {
  // Create baseline scenario
  const baselineScenario: Scenario = {
    id: ScenarioId.REGULAR_FIRE,
    subtitle: "Baseline",
    content: "",
    icon: Target,
    focusArea: "",
    color: "",
    bgColor: "",
    fireType: FireType.REGULAR_FIRE,
    inputs: BASELINE_INPUTS,
    parameters: {},
  };

  // Calculate baseline projections
  const baselineOutputs = calculateProjections(
    baselineScenario
  ) as RegularFireOutputs;

  // Calculate life event impacts
  const impact = calculateLifeEventImpact(events, selections);

  // Adjust inputs for life events
  const adjustedInputs = adjustScenarioForLifeEvents(BASELINE_INPUTS, impact);

  // Create adjusted scenario
  const adjustedScenario: Scenario = {
    ...baselineScenario,
    inputs: adjustedInputs,
  };

  // Calculate adjusted projections
  const adjustedOutputs = calculateProjections(
    adjustedScenario
  ) as RegularFireOutputs;

  // Calculate years impact (positive means delayed FI, negative means earlier FI)
  const yearsImpact = adjustedOutputs.yearsToFire - baselineOutputs.yearsToFire;

  return {
    baseline: baselineOutputs,
    adjusted: adjustedOutputs,
    impact,
    yearsImpact,
  };
}
