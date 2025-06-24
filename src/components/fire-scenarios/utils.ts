import {
  Scenario,
  Projections,
  GrowthDataPoint,
  CoastFireAssumptions,
  BaristaFireAssumptions,
  RegularFireAssumptions,
  FireType,
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
    case FireType.COAST_FIRE: {
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

      // Consistent age calculations
      const yearsToCoast = Math.floor(months / 12);
      const monthsToCoast = months % 12;
      const coastAge = age + yearsToCoast + (monthsToCoast > 0 ? 1 : 0);
      const yearsCoasting = coastAssumptions.fullRetirementAge - coastAge;

      // Calculate what the coast target will grow to at full retirement age
      const finalPortfolio =
        coastAssumptions.coastFireTarget *
        Math.pow(1 + expectedReturns, yearsCoasting);

      // Coast FIRE target is reaching the coast number (not full retirement)
      projections.fireNumber = coastAssumptions.coastFireTarget;
      projections.yearsToTarget = yearsToCoast;
      projections.monthsToTarget = monthsToCoast;
      projections.targetAge = coastAge;
      projections.projectedPortfolio = Math.round(finalPortfolio);
      projections.retirementIncome = Math.round(finalPortfolio * 0.04);
      break;
    }

    case FireType.BARISTA_FIRE: {
      const baristaAssumptions = assumptions as BaristaFireAssumptions;

      // Calculate dynamic barista target: (expenses - part-time income) / 4%
      const baristaTarget =
        (annualExpenses - baristaAssumptions.partTimeIncome) / 0.04;

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

      // Consistent age calculations
      const yearsToBarista = Math.floor(months / 12);
      const monthsToBarista = months % 12;
      const baristaAge = age + yearsToBarista + (monthsToBarista > 0 ? 1 : 0);

      projections.fireNumber = Math.round(baristaTarget);
      projections.yearsToTarget = yearsToBarista;
      projections.monthsToTarget = monthsToBarista;
      projections.targetAge = baristaAge;
      projections.projectedPortfolio = Math.round(baristaTarget);
      projections.retirementIncome =
        Math.round(baristaTarget * 0.04) + baristaAssumptions.partTimeIncome;
      break;
    }

    case FireType.REGULAR_FIRE: {
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

      // Consistent age calculations
      const yearsToFire = Math.floor(months / 12);
      const monthsToFire = months % 12;
      const fireAge = age + yearsToFire + (monthsToFire > 0 ? 1 : 0);

      projections.fireNumber = regularAssumptions.fireTarget;
      projections.yearsToTarget = yearsToFire;
      projections.monthsToTarget = monthsToFire;
      projections.targetAge = fireAge;
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
      // Use the exact portfolio value at milestone (accounts for mid-year milestones)
      const exactMilestonePortfolio = projections.fireNumber;
      const monthsSinceMilestone = month - milestoneMonths;

      if (scenario.fireType === FireType.COAST_FIRE) {
        // Coast FIRE: portfolio grows from returns only during coasting phase
        portfolio =
          exactMilestonePortfolio *
          Math.pow(1 + monthlyReturn, monthsSinceMilestone);
      } else if (scenario.fireType === FireType.BARISTA_FIRE) {
        // Barista FIRE: portfolio maintained at target level (withdrawals offset by growth)
        // Portfolio stays relatively stable as 4% withdrawals are offset by 7% growth
        const netGrowthRate = expectedReturns - 0.04; // 3% net growth
        portfolio =
          exactMilestonePortfolio *
          Math.pow(1 + netGrowthRate / 12, monthsSinceMilestone);
      } else {
        // Regular FIRE: portfolio declines due to 4% withdrawals
        // Portfolio grows at (returns - withdrawal rate) = 7% - 4% = 3%
        const netGrowthRate = expectedReturns - 0.04;
        portfolio =
          exactMilestonePortfolio *
          Math.pow(1 + netGrowthRate / 12, monthsSinceMilestone);
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
