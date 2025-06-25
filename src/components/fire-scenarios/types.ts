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
  currentInvestedAssets: number;
  safeWithdrawalRate: number;
  expectedReturns: number;
}

export interface CoastFireParameters {
  targetRetirementAge: number; // Slider value
}

export interface BaristaFireParameters {
  partTimeMonthlyIncome: number; // Slider value
}

// Use type alias instead of empty interface
export type RegularFireParameters = Record<string, never>;

export type StrategyParameters =
  | CoastFireParameters
  | BaristaFireParameters
  | RegularFireParameters;

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
  parameters: CoastFireParameters;
}

export interface BaristaFireScenario extends BaseScenario {
  fireType: FireType.BARISTA_FIRE;
  parameters: BaristaFireParameters;
}

export interface RegularFireScenario extends BaseScenario {
  fireType: FireType.REGULAR_FIRE;
  parameters: RegularFireParameters;
}

export type Scenario =
  | CoastFireScenario
  | BaristaFireScenario
  | RegularFireScenario;

// Output types for each FIRE strategy
export interface RegularFireOutputs {
  fireAge: number;
  yearsToFire: number;
  fireNumber: number;
  monthlySavings: number;
}

export interface CoastFireOutputs {
  coastFireAge: number;
  yearsToCoastFire: number;
  coastFireNumber: number;
  monthlySavings: number;
  portfolioAtRetirement: number;
}

export interface BaristaFireOutputs {
  baristaFireAge: number;
  yearsToBaristaFire: number;
  baristaFireNumber: number;
  investmentIncome: number;
  coveragePercentage: number;
}

export type FireOutputs =
  | RegularFireOutputs
  | CoastFireOutputs
  | BaristaFireOutputs;

export interface GrowthDataPoint {
  year: string;
  age: number;
  portfolio: number;
  contributions: number;
  earnings: number;
}
