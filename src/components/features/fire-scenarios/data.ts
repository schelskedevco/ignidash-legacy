import { Baby, Plane, Target } from "lucide-react";
import {
  Scenario,
  RegularFireScenario,
  CoastFireScenario,
  BaristaFireScenario,
  FireType,
  ScenarioId,
} from "./types";

// Helper functions to create properly typed scenarios
const createRegularFireScenario = (
  scenario: Omit<RegularFireScenario, "fireType" | "parameters">
): RegularFireScenario => ({
  ...scenario,
  fireType: FireType.REGULAR_FIRE,
  parameters: {},
});

const createCoastFireScenario = (
  scenario: Omit<CoastFireScenario, "fireType">
): CoastFireScenario => ({
  ...scenario,
  fireType: FireType.COAST_FIRE,
});

const createBaristaFireScenario = (
  scenario: Omit<BaristaFireScenario, "fireType">
): BaristaFireScenario => ({
  ...scenario,
  fireType: FireType.BARISTA_FIRE,
});

export const SCENARIOS: Scenario[] = [
  createRegularFireScenario({
    id: ScenarioId.REGULAR_FIRE,
    subtitle: "Complete Independence",
    content:
      "Build enough wealth to never work again. Focus entirely on passion projects, hobbies, and the people you love.",
    icon: Target,
    focusArea: "Full Freedom",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    inputs: {
      age: 28,
      annualIncome: 85000,
      annualExpenses: 50000,
      currentInvestedAssets: 75000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
  }),
  createCoastFireScenario({
    id: ScenarioId.FAMILY_COAST,
    subtitle: "Family-First Freedom",
    content:
      "Save aggressively now, then shift focus to raising kids without financial stress. Let your investments grow while you parent.",
    icon: Baby,
    focusArea: "Parenting Priority",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    inputs: {
      age: 25,
      annualIncome: 65000,
      annualExpenses: 40000,
      currentInvestedAssets: 50000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    parameters: {
      targetRetirementAge: 55,
    },
  }),
  createBaristaFireScenario({
    id: ScenarioId.SABBATICAL_BARISTA,
    subtitle: "Work-Optional Explorer",
    content:
      "Blend part-time work with extended travel. Create a flexible lifestyle that balances income, freedom, and exploration.",
    icon: Plane,
    focusArea: "Flexible Adventure",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    inputs: {
      age: 35,
      annualIncome: 95000,
      annualExpenses: 60000,
      currentInvestedAssets: 200000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    parameters: {
      partTimeMonthlyIncome: 1500,
    },
  }),
];
