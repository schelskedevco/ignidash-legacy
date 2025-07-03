import { LifeEventData } from "./types";
import {
  ScenarioInputs,
  Scenario,
  FireType,
  ScenarioId,
  RegularFireOutputs,
} from "@/components/features/fire-scenarios/types";
import { calculateProjections } from "@/components/features/fire-scenarios/utils";
import { Target } from "lucide-react";

// Life events data with impact metadata
export const LIFE_EVENTS: LifeEventData[] = [
  {
    id: "buy-car",
    title: "Car",
    impactType: "ongoing",
    durationYears: 5,
    options: [
      { label: "Used Reliable", cost: 15000 },
      { label: "New Mid-Range", cost: 35000 },
      { label: "Luxury Vehicle", cost: 65000 },
    ],
  },
  {
    id: "sabbatical",
    title: "Sabbatical",
    impactType: "immediate",
    options: [
      { label: "3 Months", cost: 15000 },
      { label: "6 Months", cost: 30000 },
      { label: "1 Year", cost: 60000 },
    ],
  },
  {
    id: "home-renovation",
    title: "Home Renovation",
    impactType: "immediate",
    options: [
      { label: "Kitchen Update", cost: 25000 },
      { label: "Full Remodel", cost: 75000 },
      { label: "Major Addition", cost: 150000 },
    ],
  },
  {
    id: "have-child",
    title: "Child",
    impactType: "ongoing",
    durationYears: 18,
    options: [
      { label: "Basic Needs", cost: 233000 },
      { label: "With College Fund", cost: 350000 },
      { label: "Premium Education", cost: 500000 },
    ],
  },
  {
    id: "world-travel",
    title: "World Travel",
    impactType: "immediate",
    options: [
      { label: "Budget Backpacking", cost: 12000 },
      { label: "Comfortable Tour", cost: 35000 },
      { label: "Luxury Journey", cost: 75000 },
    ],
  },
  {
    id: "wedding",
    title: "Wedding",
    impactType: "immediate",
    options: [
      { label: "Intimate Ceremony", cost: 15000 },
      { label: "Traditional Wedding", cost: 35000 },
      { label: "Dream Wedding", cost: 75000 },
    ],
  },
  {
    id: "inheritance",
    title: "Inheritance",
    impactType: "windfall",
    options: [
      { label: "Small Inheritance", income: 50000 },
      { label: "Moderate Inheritance", income: 150000 },
      { label: "Large Inheritance", income: 500000 },
    ],
  },
] as const;

// Baseline FIRE scenario inputs
export const BASELINE_INPUTS: ScenarioInputs = {
  age: 28,
  annualIncome: 85000,
  annualExpenses: 50000,
  currentInvestedAssets: 75000,
  safeWithdrawalRate: 0.04,
  expectedReturns: 0.07,
};

// Calculate initial FIRE age based on baseline inputs
export function calculateInitialFireAge(): number {
  const baselineScenario: Scenario = {
    id: ScenarioId.REGULAR_FIRE,
    subtitle: "Baseline",
    content: "",
    icon: Target,
    focusArea: "",
    color: "",
    bgColor: "",
    fireType: FireType.REGULAR_FIRE,
    inputs: BASELINE_INPUTS,
    parameters: {},
  };

  const baselineOutputs = calculateProjections(
    baselineScenario
  ) as RegularFireOutputs;

  return baselineOutputs.fireAge;
}
