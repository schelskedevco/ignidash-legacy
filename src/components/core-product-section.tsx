"use client";

import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Baby, Plane, Target, Sparkles } from "lucide-react";

// Type definitions
interface ScenarioInputs {
  age: number;
  annualIncome: number;
  annualExpenses: number;
  currentNetWorth: number;
  safeWithdrawalRate: number;
  expectedReturns: number;
}

interface CoastFireAssumptions {
  coastFireTarget: number;
  reducedIncomeAfterKids: number;
  increasedExpensesWithKids: number;
  fullRetirementAge: number;
}

interface BaristaFireAssumptions {
  baristaFireTarget: number;
  partTimeIncome: number;
  travelBudget: number;
  miniRetirements: number;
}

interface RegularFireAssumptions {
  fireTarget: number;
}

type Assumptions =
  | CoastFireAssumptions
  | BaristaFireAssumptions
  | RegularFireAssumptions;

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: typeof Baby | typeof Plane | typeof Sparkles;
  fireType: "Coast FIRE" | "Barista FIRE" | "Regular FIRE";
  focusArea: string;
  color: string;
  bgColor: string;
  inputs: ScenarioInputs;
  assumptions: Assumptions;
}

// Define scenarios with proper typing
const SCENARIOS: Scenario[] = [
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

// Calculate FIRE projections
function calculateProjections(scenario: Scenario) {
  const { inputs, assumptions } = scenario;
  const {
    annualIncome,
    annualExpenses,
    currentNetWorth,
    expectedReturns,
    age,
  } = inputs;

  const annualSavings = annualIncome - annualExpenses;
  const savingsRate = (annualSavings / annualIncome) * 100;

  const projections = {
    savingsRate: savingsRate.toFixed(1),
    monthlyInvestment: Math.round(annualSavings / 12),
    fireNumber: 0,
    yearsToTarget: 0,
    monthsToTarget: 0,
    targetAge: 0,
    projectedPortfolio: 0,
    retirementIncome: 0,
  };

  switch (scenario.fireType) {
    case "Coast FIRE": {
      const coastAssumptions = assumptions as CoastFireAssumptions;

      // Calculate time to reach coast target with compound growth
      let months = 0;
      let futureValue = currentNetWorth;
      const monthlyReturn = expectedReturns / 12;
      const monthlySavings = annualSavings / 12;

      while (futureValue < coastAssumptions.coastFireTarget && months < 300) {
        futureValue =
          currentNetWorth * Math.pow(1 + monthlyReturn, months) +
          monthlySavings *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      // After reaching coast target, it grows to full FIRE number
      const yearsCoasting =
        coastAssumptions.fullRetirementAge - (age + Math.ceil(months / 12));
      const finalPortfolio =
        coastAssumptions.coastFireTarget *
        Math.pow(1 + expectedReturns, yearsCoasting);

      projections.fireNumber = Math.round(
        coastAssumptions.increasedExpensesWithKids / inputs.safeWithdrawalRate
      );
      projections.yearsToTarget = Math.floor(months / 12);
      projections.monthsToTarget = months % 12;
      projections.targetAge = age + Math.ceil(months / 12);
      projections.projectedPortfolio = Math.round(finalPortfolio);
      projections.retirementIncome = Math.round(projections.fireNumber * 0.04);
      break;
    }

    case "Barista FIRE": {
      const baristaAssumptions = assumptions as BaristaFireAssumptions;
      const expensesNotCovered =
        annualExpenses - baristaAssumptions.partTimeIncome;
      const baristaNumber = expensesNotCovered / inputs.safeWithdrawalRate;

      // Calculate time with compound growth
      let months = 0;
      let futureValue = currentNetWorth;
      const monthlyReturn = expectedReturns / 12;
      const monthlySavings = annualSavings / 12;

      while (futureValue < baristaNumber && months < 400) {
        futureValue =
          currentNetWorth * Math.pow(1 + monthlyReturn, months) +
          monthlySavings *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      projections.fireNumber = Math.round(baristaNumber);
      projections.yearsToTarget = Math.floor(months / 12);
      projections.monthsToTarget = months % 12;
      projections.targetAge = age + Math.ceil(months / 12);
      projections.projectedPortfolio = Math.round(baristaNumber);
      projections.retirementIncome =
        Math.round(baristaNumber * 0.04) + baristaAssumptions.partTimeIncome;
      break;
    }

    case "Regular FIRE": {
      const regularAssumptions = assumptions as RegularFireAssumptions;

      // Account for compound growth: Future Value = Present Value * (1 + r)^t + Savings * [((1 + r)^t - 1) / r]
      // Solving for t when Future Value = FIRE Target
      let months = 0;
      let futureValue = currentNetWorth;
      const monthlyReturn = expectedReturns / 12;
      const monthlySavings = annualSavings / 12;

      while (futureValue < regularAssumptions.fireTarget && months < 600) {
        futureValue =
          currentNetWorth * Math.pow(1 + monthlyReturn, months) +
          monthlySavings *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      projections.fireNumber = regularAssumptions.fireTarget;
      projections.yearsToTarget = Math.floor(months / 12);
      projections.monthsToTarget = months % 12;
      projections.targetAge = age + Math.ceil(months / 12);
      projections.projectedPortfolio = regularAssumptions.fireTarget;
      projections.retirementIncome = Math.round(
        regularAssumptions.fireTarget * 0.04
      );
      break;
    }
  }

  return projections;
}

// Animated number component
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const startValueRef = useRef(0);

  useEffect(() => {
    const duration = 500;
    const startTime = Date.now();
    const startValue = startValueRef.current;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (value - startValue) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        startValueRef.current = value;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <>
      {prefix}
      {Math.round(displayValue).toLocaleString()}
      {suffix}
    </>
  );
}

export function CoreProductSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const selectedScenario = SCENARIOS[selectedIndex];
  const projections = calculateProjections(selectedScenario);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Set initial selection
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Model Any Life You Can Imagine
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Whether you dream of early parenthood, world travel, or pursuing your
          passion — Ignidash helps you design a financial plan that fits your
          unique life goals.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          *Calculations assume 7% annual returns and 4% safe withdrawal rate
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Carousel
          className="w-full"
          opts={{ align: "center", loop: true }}
          setApi={setApi}
        >
          <CarouselContent>
            {SCENARIOS.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <CarouselItem key={index}>
                  <div className="p-6">
                    <div
                      className={`mx-auto max-w-md rounded-lg border bg-card text-card-foreground shadow-sm transition-all ${selectedIndex === index ? "ring-2 ring-orange-500" : ""}`}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg ${scenario.bgColor}`}>
                            <Icon className={`h-8 w-8 ${scenario.color}`} />
                          </div>
                          <div className="flex gap-2">
                            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                              {scenario.fireType}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                              {scenario.focusArea}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {scenario.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mt-2">
                          {scenario.subtitle}
                        </p>
                        <p className="text-base leading-relaxed mt-4 mb-4">
                          {scenario.content}
                        </p>
                        <div className="h-px bg-border my-4" />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Current Age:
                            </span>
                            <span className="font-medium">
                              {scenario.inputs.age}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Annual Income:
                            </span>
                            <span className="font-medium">
                              ${scenario.inputs.annualIncome.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Annual Expenses:
                            </span>
                            <span className="font-medium">
                              ${scenario.inputs.annualExpenses.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Current Net Worth:
                            </span>
                            <span className="font-medium">
                              $
                              {scenario.inputs.currentNetWorth.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Dynamic output section */}
      <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Your Path to Freedom</h3>
          <p className="text-muted-foreground">
            Real-time projections for {selectedScenario.title}
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Time to Target
              </p>
              <p className="text-2xl font-bold text-orange-500">
                {projections.yearsToTarget} years
                {projections.monthsToTarget > 0 &&
                  `, ${projections.monthsToTarget} months`}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Target Age</p>
              <p className="text-2xl font-bold">
                <AnimatedNumber value={projections.targetAge} />
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Retirement Income
              </p>
              <p className="text-2xl font-bold text-green-500">
                <AnimatedNumber
                  value={projections.retirementIncome}
                  prefix="$"
                />
                /year
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                at 4% withdrawal rate
              </p>
            </div>
          </div>
        </div>

        {/* Progress visualization */}
        <div className="max-w-3xl mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h4 className="text-lg font-semibold tracking-tight mb-4">
              Progress to Financial Independence
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>
                  Current: $
                  {selectedScenario.inputs.currentNetWorth.toLocaleString()}
                </span>
                <span>Target: ${projections.fireNumber.toLocaleString()}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (selectedScenario.inputs.currentNetWorth / projections.fireNumber) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {(
                  (selectedScenario.inputs.currentNetWorth /
                    projections.fireNumber) *
                  100
                ).toFixed(1)}
                % of the way there
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
