import {
  Scenario,
  Projections,
  GrowthDataPoint,
  CoastFireAssumptions,
  BaristaFireAssumptions,
  RegularFireAssumptions,
} from "./types";

// Calculate FIRE projections
export function calculateProjections(scenario: Scenario): Projections {
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

  const projections: Projections = {
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
      const baristaTarget = baristaAssumptions.baristaFireTarget;

      // Calculate time with compound growth
      let months = 0;
      let futureValue = currentNetWorth;
      const monthlyReturn = expectedReturns / 12;
      const monthlySavings = annualSavings / 12;

      while (futureValue < baristaTarget && months < 400) {
        futureValue =
          currentNetWorth * Math.pow(1 + monthlyReturn, months) +
          monthlySavings *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      projections.fireNumber = baristaTarget;
      projections.yearsToTarget = Math.floor(months / 12);
      projections.monthsToTarget = months % 12;
      projections.targetAge = age + Math.ceil(months / 12);
      projections.projectedPortfolio = baristaTarget;
      projections.retirementIncome =
        Math.round(baristaTarget * 0.04) + baristaAssumptions.partTimeIncome;
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

// Generate data points for the growth chart
export function generateGrowthData(
  scenario: Scenario,
  projections: Projections
): GrowthDataPoint[] {
  const { inputs } = scenario;
  const { annualIncome, annualExpenses, currentNetWorth, expectedReturns } =
    inputs;
  const monthlySavings = (annualIncome - annualExpenses) / 12;
  const monthlyReturn = expectedReturns / 12;

  const dataPoints: GrowthDataPoint[] = [];
  const milestoneMonths =
    projections.yearsToTarget * 12 + projections.monthsToTarget;
  const totalMonthsWithExtension = milestoneMonths + 5 * 12; // Add 5 years beyond milestone

  // Generate yearly data points up to milestone + 5 years
  for (let month = 0; month <= totalMonthsWithExtension; month += 12) {
    const year = Math.floor(month / 12);
    let portfolio = currentNetWorth;

    if (month <= milestoneMonths) {
      // Before milestone: normal savings pattern
      if (month > 0) {
        portfolio =
          currentNetWorth * Math.pow(1 + monthlyReturn, month) +
          monthlySavings *
            ((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn);
      }
    } else {
      // After milestone: different behavior based on FIRE type
      const milestonePortfolio =
        currentNetWorth * Math.pow(1 + monthlyReturn, milestoneMonths) +
        monthlySavings *
          ((Math.pow(1 + monthlyReturn, milestoneMonths) - 1) / monthlyReturn);

      const monthsSinceMilestone = month - milestoneMonths;

      if (scenario.fireType === "Barista FIRE") {
        // Barista FIRE: reduced or no additional savings, portfolio grows from returns only
        portfolio =
          milestonePortfolio *
          Math.pow(1 + monthlyReturn, monthsSinceMilestone);
      } else if (scenario.fireType === "Coast FIRE") {
        // Coast FIRE: no additional savings, portfolio grows from returns only
        portfolio =
          milestonePortfolio *
          Math.pow(1 + monthlyReturn, monthsSinceMilestone);
      } else {
        // Regular FIRE: typically stop saving, portfolio grows from returns only
        portfolio =
          milestonePortfolio *
          Math.pow(1 + monthlyReturn, monthsSinceMilestone);
      }
    }

    const contributionsToDate =
      month <= milestoneMonths
        ? (annualIncome - annualExpenses) * (month / 12)
        : (annualIncome - annualExpenses) * (milestoneMonths / 12);

    dataPoints.push({
      year: `Year ${year}`,
      age: inputs.age + year,
      portfolio: Math.round(portfolio),
      contributions: Math.round(contributionsToDate),
      earnings: Math.round(portfolio - currentNetWorth - contributionsToDate),
    });
  }

  return dataPoints;
}
