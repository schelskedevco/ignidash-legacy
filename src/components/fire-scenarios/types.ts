import { Baby, Plane, Target } from "lucide-react";

// Enums for better type safety
export enum FireType {
  COAST_FIRE = "Coast FIRE",
  BARISTA_FIRE = "Barista FIRE",
  REGULAR_FIRE = "Regular FIRE",
}

export enum ScenarioId {
  REGULAR_FIRE = "regular-fire",
  FAMILY_COAST = "family-coast",
  SABBATICAL_BARISTA = "sabbatical-barista",
}

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

// Discriminated union for better type safety
export interface BaseScenario {
  id: ScenarioId;
  title: string;
  subtitle: string;
  content: string;
  icon: typeof Baby | typeof Plane | typeof Target;
  focusArea: string;
  color: string;
  bgColor: string;
  inputs: ScenarioInputs;
}

export interface CoastFireScenario extends BaseScenario {
  fireType: FireType.COAST_FIRE;
  assumptions: CoastFireAssumptions;
}

export interface BaristaFireScenario extends BaseScenario {
  fireType: FireType.BARISTA_FIRE;
  assumptions: BaristaFireAssumptions;
}

export interface RegularFireScenario extends BaseScenario {
  fireType: FireType.REGULAR_FIRE;
  assumptions: RegularFireAssumptions;
}

export type Scenario =
  | CoastFireScenario
  | BaristaFireScenario
  | RegularFireScenario;

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
