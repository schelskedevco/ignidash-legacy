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
      age: 25,
      annualIncome: 85000,
      annualExpenses: 50000,
      currentNetWorth: 75000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      coastFireTarget: 400000, // Reach by age 30, then coast
      reducedIncomeAfterKids: 60000,
      increasedExpensesWithKids: 70000,
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
      age: 28,
      annualIncome: 80000,
      annualExpenses: 60000,
      currentNetWorth: 120000,
      safeWithdrawalRate: 0.04,
      expectedReturns: 0.07,
    },
    assumptions: {
      baristaFireTarget: 600000, // $24k/year from portfolio + $36k part-time = $60k total
      partTimeIncome: 36000,
      travelBudget: 15000,
      miniRetirements: 3,
    } as BaristaFireAssumptions,
  },
];
