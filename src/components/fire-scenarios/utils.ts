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

// Helper function to calculate FIRE number
function calculateFireNumber(
  annualExpenses: number,
  withdrawalRate: number
): number {
  return annualExpenses / withdrawalRate;
}

// Helper function to calculate future value with compound interest
function calculateFutureValue(
  principal: number,
  annualReturn: number,
  years: number,
  annualContribution: number
): number {
  if (years === 0) return principal;
  return (
    principal * Math.pow(1 + annualReturn, years) +
    annualContribution *
      ((Math.pow(1 + annualReturn, years) - 1) / annualReturn)
  );
}

// Helper function to calculate years to reach target
function yearsToReachTarget(
  currentAssets: number,
  targetAmount: number,
  annualSavings: number,
  annualReturn: number,
  maxYears: number = 50
): number {
  let years = 0;
  let portfolio = currentAssets;

  while (portfolio < targetAmount && years < maxYears) {
    portfolio = portfolio * (1 + annualReturn) + annualSavings;
    years++;
  }

  return years;
}

// Calculate FIRE projections
export function calculateProjections(scenario: Scenario): FireOutputs {
  const { inputs, parameters } = scenario;
  const {
    annualIncome,
    annualExpenses,
    currentInvestedAssets,
    expectedReturns,
    safeWithdrawalRate,
    age,
  } = inputs;

  const annualSavings = annualIncome - annualExpenses;
  const savingsRate = (annualSavings / annualIncome) * 100;
  const monthlySavings = Math.round(annualSavings / 12);

  switch (scenario.fireType) {
    case FireType.REGULAR_FIRE: {
      const fireNumber = calculateFireNumber(
        annualExpenses,
        safeWithdrawalRate
      );
      const years = yearsToReachTarget(
        currentInvestedAssets,
        fireNumber,
        annualSavings,
        expectedReturns
      );

      return {
        fireAge: age + years,
        yearsToFire: years,
        fireNumber: Math.round(fireNumber),
        savingsRate: Math.round(savingsRate),
        monthlySavings,
      } as RegularFireOutputs;
    }

    case FireType.COAST_FIRE: {
      const coastParams = parameters as CoastFireParameters;
      const { targetRetirementAge } = coastParams;

      const fireNumber = calculateFireNumber(
        annualExpenses,
        safeWithdrawalRate
      );
      const yearsToRetirement = targetRetirementAge - age;

      // Coast FIRE Number: PV = FV / (1+r)^n
      const coastFireNumber =
        fireNumber / Math.pow(1 + expectedReturns, yearsToRetirement);

      const years = yearsToReachTarget(
        currentInvestedAssets,
        coastFireNumber,
        annualSavings,
        expectedReturns,
        yearsToRetirement
      );

      // What will coast number grow to?
      const portfolioAtRetirement =
        coastFireNumber * Math.pow(1 + expectedReturns, yearsToRetirement);

      return {
        coastFireAge: age + years,
        yearsToCoastFire: years,
        coastFireNumber: Math.round(coastFireNumber),
        monthlySavings,
        portfolioAtRetirement: Math.round(portfolioAtRetirement),
      } as CoastFireOutputs;
    }

    case FireType.BARISTA_FIRE: {
      const baristaParams = parameters as BaristaFireParameters;
      const { partTimeMonthlyIncome } = baristaParams;
      const partTimeAnnual = partTimeMonthlyIncome * 12;

      // Barista FIRE Number: only need to cover the gap
      const expenseGap = annualExpenses - partTimeAnnual;
      const baristaFireNumber = calculateFireNumber(
        expenseGap,
        safeWithdrawalRate
      );

      const years = yearsToReachTarget(
        currentInvestedAssets,
        baristaFireNumber,
        annualSavings,
        expectedReturns
      );

      // What investment income at switch?
      const investmentIncome = baristaFireNumber * safeWithdrawalRate;

      // Coverage percentage
      const coveragePercentage = (investmentIncome / annualExpenses) * 100;

      return {
        baristaFireAge: age + years,
        yearsToBaristaFire: years,
        baristaFireNumber: Math.round(baristaFireNumber),
        investmentIncome: Math.round(investmentIncome),
        coveragePercentage: Math.round(coveragePercentage),
      } as BaristaFireOutputs;
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
    age,
    annualIncome,
    annualExpenses,
    currentInvestedAssets,
    expectedReturns,
  } = inputs;

  const annualSavings = annualIncome - annualExpenses;
  const dataPoints: GrowthDataPoint[] = [];

  // Determine projection parameters based on FIRE type
  let yearsToProject: number;
  let milestoneYear: number;

  switch (scenario.fireType) {
    case FireType.REGULAR_FIRE: {
      const regularOutputs = outputs as RegularFireOutputs;
      milestoneYear = regularOutputs.yearsToFire;
      yearsToProject = Math.max(milestoneYear + 5, 20);
      break;
    }

    case FireType.COAST_FIRE: {
      const coastOutputs = outputs as CoastFireOutputs;
      const coastParams = scenario.parameters as CoastFireParameters;
      milestoneYear = coastOutputs.yearsToCoastFire;
      yearsToProject = coastParams.targetRetirementAge - age + 5;
      break;
    }

    case FireType.BARISTA_FIRE: {
      const baristaOutputs = outputs as BaristaFireOutputs;
      milestoneYear = baristaOutputs.yearsToBaristaFire;
      yearsToProject = Math.max(milestoneYear + 10, 25);
      break;
    }
  }

  // Calculate the actual portfolio value at milestone year for continuity
  const portfolioAtMilestone = calculateFutureValue(
    currentInvestedAssets,
    expectedReturns,
    milestoneYear,
    annualSavings
  );

  // Generate yearly data points
  for (let year = 0; year <= yearsToProject; year++) {
    let portfolio: number;
    let contributions: number;

    if (year <= milestoneYear) {
      // Accumulation phase - same for all strategies
      portfolio = calculateFutureValue(
        currentInvestedAssets,
        expectedReturns,
        year,
        annualSavings
      );
      contributions = annualSavings * year;
    } else {
      // Post-milestone phase - different for each strategy
      const yearsSinceMilestone = year - milestoneYear;
      contributions = annualSavings * milestoneYear; // No new contributions after milestone

      switch (scenario.fireType) {
        case FireType.COAST_FIRE: {
          // Pure growth, no contributions - use actual portfolio value at milestone
          portfolio =
            portfolioAtMilestone *
            Math.pow(1 + expectedReturns, yearsSinceMilestone);
          break;
        }

        case FireType.BARISTA_FIRE:
        case FireType.REGULAR_FIRE: {
          // Portfolio grows at full return rate, then subtract fixed annual withdrawals
          // Start with actual portfolio value at milestone, not target amount
          let currentPortfolio = portfolioAtMilestone;
          const annualWithdrawal =
            scenario.fireType === FireType.REGULAR_FIRE
              ? annualExpenses
              : annualExpenses -
                (scenario.parameters as BaristaFireParameters)
                  .partTimeMonthlyIncome *
                  12;

          for (let i = 0; i < yearsSinceMilestone; i++) {
            currentPortfolio =
              currentPortfolio * (1 + expectedReturns) - annualWithdrawal;
          }
          portfolio = Math.max(0, currentPortfolio); // Ensure portfolio doesn't go negative
          break;
        }
      }
    }

    const earnings = portfolio - currentInvestedAssets - contributions;

    dataPoints.push({
      year: `Year ${year}`,
      age: age + year,
      portfolio: Math.round(portfolio),
      contributions: Math.round(contributions),
      earnings: Math.round(earnings),
    });
  }

  return dataPoints;
}
