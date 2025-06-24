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
    title: "Traditional FIRE",
    subtitle: "Complete Financial Independence",
    content:
      "Save consistently, invest wisely, and retire early to pursue hobbies and passions.",
    icon: Target,
    focusArea: "Full Retirement",
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
    title: "Young Family Planning",
    subtitle: "Coast FIRE with Kids",
    content:
      "Front-load savings before kids, then coast to FIRE while focusing on family.",
    icon: Baby,
    focusArea: "Kids & Family",
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
    title: "Digital Nomad Dreams",
    subtitle: "Barista FIRE with Travel",
    content:
      "Take mini-retirements and work remotely while exploring the world.",
    icon: Plane,
    focusArea: "Travel & Sabbaticals",
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
