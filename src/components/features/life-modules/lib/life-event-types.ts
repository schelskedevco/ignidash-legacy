export interface LifeEventOption {
  label: string;
  cost?: number;
  income?: number;
}

export type LifeEventImpactType = "immediate" | "ongoing" | "windfall";

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

export interface WindfallLifeEvent extends BaseLifeEvent {
  impactType: "windfall";
  options: LifeEventOption[];
}

export type LifeEventData =
  | ImmediateLifeEvent
  | OngoingLifeEvent
  | WindfallLifeEvent;

export interface LifeEventSelection {
  eventId: string;
  option: LifeEventOption;
  optionIndex: number;
}

export interface OngoingEventData {
  annualAmount: number;
  durationYears: number;
}

export interface LifeEventImpact {
  immediateAssetReduction: number;
  annualExpenseIncrease: number; // For permanent expenses only
  expenseIncreaseDurationYears?: number; // For single ongoing (legacy compatibility)

  // Store individual ongoing events for proper rate handling
  ongoingEvents?: OngoingEventData[];
}
