import { Baby, Plane, Target } from "lucide-react";

export interface ScenarioInputs {
  age: number;
  annualIncome: number;
  annualExpenses: number;
  currentNetWorth: number;
  safeWithdrawalRate: number;
  expectedReturns: number;
}

export interface CoastFireAssumptions {
  coastFireTarget: number;
  reducedIncomeAfterKids: number;
  increasedExpensesWithKids: number;
  fullRetirementAge: number;
}

export interface BaristaFireAssumptions {
  baristaFireTarget: number;
  partTimeIncome: number;
  travelBudget: number;
  miniRetirements: number;
}

export interface RegularFireAssumptions {
  fireTarget: number;
}

export type Assumptions =
  | CoastFireAssumptions
  | BaristaFireAssumptions
  | RegularFireAssumptions;

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: typeof Baby | typeof Plane | typeof Target;
  fireType: "Coast FIRE" | "Barista FIRE" | "Regular FIRE";
  focusArea: string;
  color: string;
  bgColor: string;
  inputs: ScenarioInputs;
  assumptions: Assumptions;
}

export interface Projections {
  savingsRate: string;
  monthlyInvestment: number;
  fireNumber: number;
  yearsToTarget: number;
  monthsToTarget: number;
  targetAge: number;
  projectedPortfolio: number;
  retirementIncome: number;
}

export interface GrowthDataPoint {
  year: string;
  age: number;
  portfolio: number;
  contributions: number;
  earnings: number;
}
