/**
 * Shared financial types used across the application
 */

export interface Money {
  amount: number;
  currency?: string; // Default to USD
}

export interface FinancialInputs {
  age: number;
  annualIncome: number;
  annualExpenses: number;
  currentInvestedAssets: number;
}

export interface FinancialProjection {
  year: number;
  age: number;
  portfolio: number;
  contributions?: number;
  withdrawals?: number;
}

export interface RetirementMetrics {
  targetAge: number;
  yearsToTarget: number;
  targetAmount: number;
}

export interface InvestmentParameters {
  expectedReturns: number;
  safeWithdrawalRate: number;
  inflationRate?: number;
}

export type TimeHorizon = "short" | "medium" | "long";

export interface FinancialScenario {
  name: string;
  description: string;
  inputs: FinancialInputs;
  parameters: InvestmentParameters;
}
