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
// Uses end-of-year contributions (standard assumption where contributions
// are made throughout the year and don't earn returns until the following year)
export function calculateFutureValue(
  principal: number,
  annualReturn: number,
  years: number,
  annualContribution: number
): number {
  if (years === 0) return principal;
  if (annualReturn === 0) {
    // No investment growth, just linear contributions
    return principal + annualContribution * years;
  }

  // End-of-year contribution assumption (standard)
  return (
    principal * Math.pow(1 + annualReturn, years) +
    annualContribution *
      ((Math.pow(1 + annualReturn, years) - 1) / annualReturn)
  );
}

// Helper function to calculate years to reach target
export function yearsToReachTarget(
  principal: number,
  target: number,
  annualContribution: number,
  annualReturn: number
): number {
  if (annualContribution === 0) {
    if (principal <= 0 || annualReturn <= 0) return Infinity;
    return Math.log(target / principal) / Math.log(1 + annualReturn);
  }

  let low = 0;
  let high = 100;
  let mid: number;

  const fv = (n: number) =>
    principal * Math.pow(1 + annualReturn, n) +
    annualContribution * ((Math.pow(1 + annualReturn, n) - 1) / annualReturn); // End-of-year assumption

  while (high - low > 0.0001) {
    mid = (low + high) / 2;
    const value = fv(mid);
    if (value < target) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return parseFloat(mid!.toFixed(4));
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
        expectedReturns
        // Remove maxYears limit - let it calculate the actual time needed
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
      contributions = annualSavings * milestoneYear; // Total contributions up to milestone (no new contributions after)

      switch (scenario.fireType) {
        case FireType.COAST_FIRE: {
          const coastParams = scenario.parameters as CoastFireParameters;
          const targetRetirementAge = coastParams.targetRetirementAge;
          const currentAge = age + year;

          if (currentAge < targetRetirementAge) {
            // Coast phase: pure growth, no contributions, no withdrawals
            portfolio =
              portfolioAtMilestone *
              Math.pow(1 + expectedReturns, yearsSinceMilestone);
          } else {
            // Retirement phase: withdrawals begin
            const yearsToRetirement =
              targetRetirementAge - (age + milestoneYear);
            const portfolioAtRetirement =
              portfolioAtMilestone *
              Math.pow(1 + expectedReturns, yearsToRetirement);
            const yearsInRetirement = currentAge - targetRetirementAge;

            // Calculate portfolio value with withdrawals
            let currentPortfolio = portfolioAtRetirement;
            for (let i = 0; i < yearsInRetirement; i++) {
              currentPortfolio =
                currentPortfolio * (1 + expectedReturns) - annualExpenses;
            }
            portfolio = Math.max(0, currentPortfolio);
          }
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

    // Calculate cumulative earnings (investment gains)
    const cumulativeEarnings =
      portfolio - currentInvestedAssets - contributions;

    dataPoints.push({
      year: `Year ${year}`,
      age: age + year,
      portfolio: Math.round(portfolio),
      contributions: Math.round(contributions),
      earnings: Math.round(cumulativeEarnings),
    });
  }

  return dataPoints;
}
