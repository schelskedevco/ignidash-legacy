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
  let portfolio = currentNetWorth;
  const totalMonths =
    projections.yearsToTarget * 12 + projections.monthsToTarget;

  // Generate yearly data points
  for (let month = 0; month <= totalMonths; month += 12) {
    const year = Math.floor(month / 12);

    if (month > 0) {
      portfolio =
        currentNetWorth * Math.pow(1 + monthlyReturn, month) +
        monthlySavings *
          ((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn);
    }

    dataPoints.push({
      year: `Year ${year}`,
      age: inputs.age + year,
      portfolio: Math.round(portfolio),
      contributions: Math.round((annualIncome - annualExpenses) * year),
      earnings: Math.round(
        portfolio - currentNetWorth - (annualIncome - annualExpenses) * year
      ),
    });
  }

  // Add final data point if not on a year boundary
  if (projections.monthsToTarget > 0) {
    portfolio =
      currentNetWorth * Math.pow(1 + monthlyReturn, totalMonths) +
      monthlySavings *
        ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);

    dataPoints.push({
      year: `Year ${projections.yearsToTarget + 1}`,
      age: projections.targetAge,
      portfolio: Math.round(portfolio),
      contributions: Math.round(
        (annualIncome - annualExpenses) * (totalMonths / 12)
      ),
      earnings: Math.round(
        portfolio -
          currentNetWorth -
          (annualIncome - annualExpenses) * (totalMonths / 12)
      ),
    });
  }

  return dataPoints;
}
