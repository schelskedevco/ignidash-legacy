export interface LifeEventOption {
  label: string;
  cost: number;
}

export interface InvestmentOption extends LifeEventOption {
  monthlyReturn: number;
  breakEvenMonths: number;
}

export type LifeEventImpactType = "immediate" | "ongoing" | "investment";

export interface BaseLifeEvent {
  id: string;
  title: string;
  impactType: LifeEventImpactType;
}

export interface ImmediateLifeEvent extends BaseLifeEvent {
  impactType: "immediate";
  options: LifeEventOption[];
}

export interface OngoingLifeEvent extends BaseLifeEvent {
  impactType: "ongoing";
  options: LifeEventOption[];
  durationYears: number;
}

export interface InvestmentLifeEvent extends BaseLifeEvent {
  impactType: "investment";
  options: InvestmentOption[];
}

export type LifeEventData =
  | ImmediateLifeEvent
  | OngoingLifeEvent
  | InvestmentLifeEvent;

export interface LifeEventSelection {
  eventId: string;
  option: LifeEventOption | InvestmentOption;
  optionIndex: number;
}

export interface LifeEventImpact {
  immediateAssetReduction: number;
  annualExpenseIncrease: number;
  monthlyIncomeAfterBreakeven: number;
  breakEvenMonths: number;
}
