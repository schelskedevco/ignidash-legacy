import { Baby, Plane, Target } from "lucide-react";
import {
  Scenario,
  RegularFireAssumptions,
  CoastFireAssumptions,
  BaristaFireAssumptions,
} from "./types";

export const SCENARIOS: Scenario[] = [
  {
    id: "regular-fire",
    title: "Traditional FIRE",
    subtitle: "Complete Financial Independence",
    content:
      "Save consistently, invest wisely, and retire early to pursue hobbies and passions.",
    icon: Target,
    fireType: "Regular FIRE",
    focusArea: "Full Retirement",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    inputs: {
      age: 30,
      annualIncome: 80000,
      annualExpenses: 40000,
      currentNetWorth: 100000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      fireTarget: 1000000, // 25x annual expenses
    } as RegularFireAssumptions,
  },
  {
    id: "family-coast",
    title: "Young Family Planning",
    subtitle: "Coast FIRE with Kids",
    content:
      "Front-load savings before kids, then coast to FIRE while focusing on family.",
    icon: Baby,
    fireType: "Coast FIRE",
    focusArea: "Kids & Family",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    inputs: {
      age: 28,
      annualIncome: 95000,
      annualExpenses: 48000,
      currentNetWorth: 125000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      coastFireTarget: 300000,
      reducedIncomeAfterKids: 55000,
      increasedExpensesWithKids: 65000,
      fullRetirementAge: 55,
    } as CoastFireAssumptions,
  },
  {
    id: "sabbatical-barista",
    title: "Digital Nomad Dreams",
    subtitle: "Barista FIRE with Travel",
    content:
      "Take mini-retirements and work remotely while exploring the world.",
    icon: Plane,
    fireType: "Barista FIRE",
    focusArea: "Travel & Sabbaticals",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    inputs: {
      age: 32,
      annualIncome: 72000,
      annualExpenses: 36000,
      currentNetWorth: 180000,
      safeWithdrawalRate: 0.035,
      expectedReturns: 0.065,
    },
    assumptions: {
      baristaFireTarget: 400000,
      partTimeIncome: 30000,
      travelBudget: 15000,
      miniRetirements: 3,
    } as BaristaFireAssumptions,
  },
];
