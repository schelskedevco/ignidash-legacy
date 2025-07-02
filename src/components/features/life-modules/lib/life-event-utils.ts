import {
  LifeEventData,
  LifeEventSelection,
  LifeEventImpact,
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
  return selections.reduce((total, selection) => {
    const cost = selection.option.cost || 0;
    const income = selection.option.income || 0;
    return total + cost - income;
  }, 0);
}

// Calculate the impact of a single life event
export function calculateSingleEventImpact(
  event: LifeEventData,
  selection: LifeEventSelection
): LifeEventImpact {
  const impact: LifeEventImpact = {
    immediateAssetReduction: 0,
    annualExpenseIncrease: 0,
  };

  switch (event.impactType) {
    case "immediate":
      // Immediate expenses reduce current assets
      impact.immediateAssetReduction = selection.option.cost || 0;
      break;

    case "ongoing":
      // Ongoing expenses increase annual expenses over duration
      // Guard against division by zero
      if (event.durationYears && event.durationYears > 0) {
        impact.annualExpenseIncrease =
          (selection.option.cost || 0) / event.durationYears;
        impact.expenseIncreaseDurationYears = event.durationYears;
      }
      break;

    case "windfall":
      // Windfalls increase current assets (negative reduction)
      impact.immediateAssetReduction = -(selection.option.income || 0);
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
    ongoingEvents: [],
  };

  let permanentExpenseIncrease = 0;

  selections.forEach((selection) => {
    const event = events.find((e) => e.id === selection.eventId);
    if (!event) {
      console.warn(`Event with id ${selection.eventId} not found`);
      return;
    }

    const impact = calculateSingleEventImpact(event, selection);

    // Handle immediate impacts and windfalls directly
    combinedImpact.immediateAssetReduction += impact.immediateAssetReduction;

    // Store ongoing events for deferred PV calculation with correct discount rate
    if (
      impact.expenseIncreaseDurationYears &&
      impact.annualExpenseIncrease !== 0
    ) {
      combinedImpact.ongoingEvents!.push({
        annualAmount: impact.annualExpenseIncrease,
        durationYears: impact.expenseIncreaseDurationYears,
      });
    } else if (impact.annualExpenseIncrease !== 0) {
      // Handle permanent expense increases/decreases (legacy behavior)
      permanentExpenseIncrease += impact.annualExpenseIncrease;
    }
  });

  // Set permanent expense increase/decrease for legacy cases (no duration specified)
  if (permanentExpenseIncrease !== 0) {
    combinedImpact.annualExpenseIncrease = permanentExpenseIncrease;
  }

  // Clean up empty ongoing events array
  if (combinedImpact.ongoingEvents!.length === 0) {
    delete combinedImpact.ongoingEvents;
  }

  return combinedImpact;
}

// Helper function to calculate present value of time-limited expense increase
function calculateTimeLimitedExpenseImpact(
  annualIncrease: number,
  durationYears: number,
  discountRate: number = 0.07 // Use expected returns as discount rate
): number {
  // Input validation
  if (durationYears <= 0) return 0;
  if (annualIncrease === 0) return 0;

  // Validate discount rate bounds (allow negative annual increases as savings)
  if (discountRate < -0.5 || discountRate > 1.0) {
    console.warn(
      `Extreme discount rate detected: ${discountRate}. Clamping to safe bounds.`
    );
    discountRate = Math.max(-0.5, Math.min(1.0, discountRate));
  }

  // Handle zero discount rate case
  if (Math.abs(discountRate) < 0.0001) {
    const result = annualIncrease * durationYears;
    return Math.round(result * 100) / 100; // Round to nearest cent
  }

  // Validate extreme duration to prevent overflow
  if (durationYears > 100) {
    console.warn(
      `Extreme duration detected: ${durationYears} years. Using simplified calculation.`
    );
    // For very long durations, PV approaches annualIncrease / discountRate
    const result = annualIncrease / discountRate;
    return Math.round(result * 100) / 100;
  }

  // Calculate present value of annuity (time-limited expense stream)
  // PV = PMT * [(1 - (1 + r)^-n) / r]
  const factor = Math.pow(1 + discountRate, -durationYears);

  // Check for potential overflow/underflow
  if (!isFinite(factor) || factor <= 0) {
    console.warn(
      `Mathematical overflow detected in PV calculation. Using fallback.`
    );
    return Math.round(annualIncrease * durationYears * 100) / 100;
  }

  const presentValue = annualIncrease * ((1 - factor) / discountRate);

  // Final validation and rounding
  if (!isFinite(presentValue)) {
    console.warn(`Invalid present value calculated. Using fallback.`);
    return Math.round(annualIncrease * durationYears * 100) / 100;
  }

  return Math.round(presentValue * 100) / 100; // Round to nearest cent
}

// Adjust scenario inputs based on life event impacts
export function adjustScenarioForLifeEvents(
  baseInputs: ScenarioInputs,
  impact: LifeEventImpact
): ScenarioInputs {
  // Start with a copy of base inputs
  const adjustedInputs = { ...baseInputs };

  let totalAssetReduction = impact.immediateAssetReduction;

  // Process ongoing events with correct discount rate
  if (impact.ongoingEvents && impact.ongoingEvents.length > 0) {
    // Calculate present value for each ongoing event using actual expectedReturns
    impact.ongoingEvents.forEach((ongoingEvent) => {
      const presentValue = calculateTimeLimitedExpenseImpact(
        ongoingEvent.annualAmount,
        ongoingEvent.durationYears,
        baseInputs.expectedReturns
      );
      totalAssetReduction += presentValue;
    });
  }

  // Legacy compatibility: handle single ongoing event in old format
  if (
    impact.annualExpenseIncrease !== 0 &&
    impact.expenseIncreaseDurationYears &&
    impact.expenseIncreaseDurationYears > 0 &&
    !impact.ongoingEvents // Only if not using new format
  ) {
    const timeLimitedImpact = calculateTimeLimitedExpenseImpact(
      impact.annualExpenseIncrease,
      impact.expenseIncreaseDurationYears,
      baseInputs.expectedReturns
    );
    totalAssetReduction += timeLimitedImpact;
  } else if (impact.annualExpenseIncrease !== 0 && !impact.ongoingEvents) {
    // Permanent expense increase/decrease (legacy behavior)
    adjustedInputs.annualExpenses =
      baseInputs.annualExpenses + impact.annualExpenseIncrease;
  }

  // Reduce current assets by all immediate and time-limited impacts
  adjustedInputs.currentInvestedAssets = Math.max(
    0,
    baseInputs.currentInvestedAssets - totalAssetReduction
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

  // Ensure FI age never goes below baseline age (protect against "already FI" scenarios)
  const minFireAge = BASELINE_INPUTS.age;
  if (adjustedOutputs.fireAge < minFireAge) {
    adjustedOutputs.fireAge = minFireAge;
    adjustedOutputs.yearsToFire = 0;
  }

  // Calculate years impact (positive means delayed FI, negative means earlier FI)
  const yearsImpact = adjustedOutputs.yearsToFire - baselineOutputs.yearsToFire;

  return {
    baseline: baselineOutputs,
    adjusted: adjustedOutputs,
    impact,
    yearsImpact,
  };
}
