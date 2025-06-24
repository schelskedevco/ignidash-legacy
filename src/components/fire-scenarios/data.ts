import { Baby, Plane, Target } from "lucide-react";
import {
  Scenario,
  RegularFireAssumptions,
  CoastFireAssumptions,
  BaristaFireAssumptions,
  FireType,
  ScenarioId,
} from "./types";

export const SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.REGULAR_FIRE,
    title: "Traditional FIRE",
    subtitle: "Complete Financial Independence",
    content:
      "Save consistently, invest wisely, and retire early to pursue hobbies and passions.",
    icon: Target,
    fireType: FireType.REGULAR_FIRE,
    focusArea: "Full Retirement",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    inputs: {
      age: 25,
      annualIncome: 75000,
      annualExpenses: 45000,
      currentNetWorth: 50000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      fireTarget: 1125000, // 25x annual expenses ($45k * 25)
    } as RegularFireAssumptions,
  },
  {
    id: ScenarioId.FAMILY_COAST,
    title: "Young Family Planning",
    subtitle: "Coast FIRE with Kids",
    content:
      "Front-load savings before kids, then coast to FIRE while focusing on family.",
    icon: Baby,
    fireType: FireType.COAST_FIRE,
    focusArea: "Kids & Family",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    inputs: {
      age: 25,
      annualIncome: 85000,
      annualExpenses: 50000,
      currentNetWorth: 75000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      coastFireTarget: 400000, // Amount that grows to full FIRE by age 55
      reducedIncomeAfterKids: 50000, // Just enough to cover expenses during coasting
      increasedExpensesWithKids: 50000, // Expenses during coasting phase
      fullRetirementAge: 55, // When coast target has grown to full FIRE
    } as CoastFireAssumptions,
  },
  {
    id: ScenarioId.SABBATICAL_BARISTA,
    title: "Digital Nomad Dreams",
    subtitle: "Barista FIRE with Travel",
    content:
      "Take mini-retirements and work remotely while exploring the world.",
    icon: Plane,
    fireType: FireType.BARISTA_FIRE,
    focusArea: "Travel & Sabbaticals",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    inputs: {
      age: 28,
      annualIncome: 80000,
      annualExpenses: 60000,
      currentNetWorth: 120000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      partTimeIncome: 36000,
      travelBudget: 15000,
      miniRetirements: 3,
    } as BaristaFireAssumptions,
  },
];
