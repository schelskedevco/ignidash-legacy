import {
  Scenario,
  GrowthDataPoint,
  CoastFireParameters,
  BaristaFireParameters,
  FireType,
  RegularFireOutputs,
  CoastFireOutputs,
  BaristaFireOutputs,
  FireOutputs,
} from "./types";

// Calculate FIRE projections
export function calculateProjections(scenario: Scenario): FireOutputs {
  const { inputs, parameters } = scenario;
  const {
    annualIncome,
    annualExpenses,
    currentInvestedAssets,
    expectedReturns,
    age,
  } = inputs;

  const annualSavings = annualIncome - annualExpenses;
  const savingsRate = (annualSavings / annualIncome) * 100;
  const monthlySavings = Math.round(annualSavings / 12);

  switch (scenario.fireType) {
    case FireType.COAST_FIRE: {
      const coastParams = parameters as CoastFireParameters;
      const { targetRetirementAge } = coastParams;

      // Calculate coast fire target: what we need today to reach FIRE at target retirement age
      const yearsToRetirement = targetRetirementAge - age;
      const fireTarget = annualExpenses / 0.04;
      const coastFireTarget =
        fireTarget / Math.pow(1 + expectedReturns, yearsToRetirement);

      // Calculate time to reach coast target with compound growth
      let months = 0;
      let futureValue = currentInvestedAssets;
      const monthlyReturn = expectedReturns / 12;
      const monthlyContributions = annualSavings / 12;

      while (futureValue < coastFireTarget && months < 300) {
        futureValue =
          currentInvestedAssets * Math.pow(1 + monthlyReturn, months) +
          monthlyContributions *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      const yearsToCoastFire = Math.floor(months / 12);
      const coastFireAge = age + yearsToCoastFire + (months % 12 > 0 ? 1 : 0);
      const portfolioAtRetirement =
        coastFireTarget *
        Math.pow(1 + expectedReturns, targetRetirementAge - coastFireAge);

      return {
        coastFireAge,
        yearsToCoastFire,
        coastFireNumber: Math.round(coastFireTarget),
        monthlySavings,
        portfolioAtRetirement: Math.round(portfolioAtRetirement),
      } as CoastFireOutputs;
    }

    case FireType.BARISTA_FIRE: {
      const baristaParams = parameters as BaristaFireParameters;
      const { partTimeMonthlyIncome } = baristaParams;
      const partTimeAnnualIncome = partTimeMonthlyIncome * 12;

      // Calculate barista fire target: (expenses - part-time income) / 4%
      const baristaFireTarget = (annualExpenses - partTimeAnnualIncome) / 0.04;

      // Calculate time with compound growth
      let months = 0;
      let futureValue = currentInvestedAssets;
      const monthlyReturn = expectedReturns / 12;
      const monthlyContributions = annualSavings / 12;

      while (futureValue < baristaFireTarget && months < 400) {
        futureValue =
          currentInvestedAssets * Math.pow(1 + monthlyReturn, months) +
          monthlyContributions *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      const yearsToBaristaFire = Math.floor(months / 12);
      const baristaFireAge =
        age + yearsToBaristaFire + (months % 12 > 0 ? 1 : 0);
      const investmentIncome = Math.round(baristaFireTarget * 0.04);
      const coveragePercentage = Math.round(
        (investmentIncome / annualExpenses) * 100
      );

      return {
        baristaFireAge,
        yearsToBaristaFire,
        baristaFireNumber: Math.round(baristaFireTarget),
        investmentIncome,
        coveragePercentage,
      } as BaristaFireOutputs;
    }

    case FireType.REGULAR_FIRE: {
      const fireTarget = annualExpenses / 0.04;

      // Calculate time with compound growth
      let months = 0;
      let futureValue = currentInvestedAssets;
      const monthlyReturn = expectedReturns / 12;
      const monthlyContributions = annualSavings / 12;

      while (futureValue < fireTarget && months < 600) {
        futureValue =
          currentInvestedAssets * Math.pow(1 + monthlyReturn, months) +
          monthlyContributions *
            ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
        months++;
      }

      const yearsToFire = Math.floor(months / 12);
      const fireAge = age + yearsToFire + (months % 12 > 0 ? 1 : 0);

      return {
        fireAge,
        yearsToFire,
        fireNumber: Math.round(fireTarget),
        savingsRate: Math.round(savingsRate),
        monthlySavings,
      } as RegularFireOutputs;
    }
  }
}

// Generate data points for the growth chart
export function generateGrowthData(
  scenario: Scenario,
  outputs: FireOutputs
): GrowthDataPoint[] {
  const { inputs } = scenario;
  const {
    annualIncome,
    annualExpenses,
    currentInvestedAssets,
    expectedReturns,
  } = inputs;
  const monthlySavings = (annualIncome - annualExpenses) / 12;
  const monthlyReturn = expectedReturns / 12;

  const dataPoints: GrowthDataPoint[] = [];

  // Get years to target based on fire type
  let yearsToTarget: number;
  let fireNumber: number;

  if (scenario.fireType === FireType.REGULAR_FIRE) {
    const regularOutputs = outputs as RegularFireOutputs;
    yearsToTarget = regularOutputs.yearsToFire;
    fireNumber = regularOutputs.fireNumber;
  } else if (scenario.fireType === FireType.COAST_FIRE) {
    const coastOutputs = outputs as CoastFireOutputs;
    yearsToTarget = coastOutputs.yearsToCoastFire;
    fireNumber = coastOutputs.coastFireNumber;
  } else {
    const baristaOutputs = outputs as BaristaFireOutputs;
    yearsToTarget = baristaOutputs.yearsToBaristaFire;
    fireNumber = baristaOutputs.baristaFireNumber;
  }

  const milestoneMonths = yearsToTarget * 12;
  const totalMonthsWithExtension = milestoneMonths + 5 * 12; // Add 5 years beyond milestone

  // Generate yearly data points up to milestone + 5 years
  for (let month = 0; month <= totalMonthsWithExtension; month += 12) {
    const year = Math.floor(month / 12);
    let portfolio = currentInvestedAssets;

    if (month <= milestoneMonths) {
      // Before milestone: normal savings pattern
      if (month > 0) {
        portfolio =
          currentInvestedAssets * Math.pow(1 + monthlyReturn, month) +
          monthlySavings *
            ((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn);
      }
    } else {
      // After milestone: different behavior based on FIRE type
      const exactMilestonePortfolio = fireNumber;
      const monthsSinceMilestone = month - milestoneMonths;

      if (scenario.fireType === FireType.COAST_FIRE) {
        // Coast FIRE: portfolio grows from returns only during coasting phase
        portfolio =
          exactMilestonePortfolio *
          Math.pow(1 + monthlyReturn, monthsSinceMilestone);
      } else if (scenario.fireType === FireType.BARISTA_FIRE) {
        // Barista FIRE: portfolio maintained at target level (withdrawals offset by growth)
        const netGrowthRate = expectedReturns - 0.04; // 3% net growth
        portfolio =
          exactMilestonePortfolio *
          Math.pow(1 + netGrowthRate / 12, monthsSinceMilestone);
      } else {
        // Regular FIRE: portfolio declines due to 4% withdrawals
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
      earnings: Math.round(
        portfolio - currentInvestedAssets - contributionsToDate
      ),
    });
  }

  return dataPoints;
}
