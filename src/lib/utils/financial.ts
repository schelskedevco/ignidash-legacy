/**
 * Common financial calculation utilities
 */

/**
 * Calculate the FIRE number (amount needed for financial independence)
 * @param annualExpenses - Annual living expenses
 * @param withdrawalRate - Safe withdrawal rate (e.g., 0.04 for 4%)
 * @returns Amount needed for financial independence
 */
export function calculateFireNumber(
  annualExpenses: number,
  withdrawalRate: number
): number {
  return annualExpenses / withdrawalRate;
}

/**
 * Calculate future value with compound interest
 * Uses end-of-year contributions (standard assumption)
 * @param principal - Starting amount
 * @param annualReturn - Expected annual return rate
 * @param years - Number of years
 * @param annualContribution - Amount contributed annually
 * @returns Future value of investment
 */
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

/**
 * Calculate years needed to reach a target amount
 * @param principal - Starting amount
 * @param target - Target amount to reach
 * @param annualContribution - Amount contributed annually
 * @param annualReturn - Expected annual return rate
 * @returns Number of years to reach target
 */
export function yearsToReachTarget(
  principal: number,
  target: number,
  annualContribution: number,
  annualReturn: number
): number {
  if (principal >= target) return 0;
  if (annualContribution === 0 && annualReturn === 0) return Infinity;

  // If no growth, simple linear calculation
  if (annualReturn === 0) {
    return (target - principal) / annualContribution;
  }

  // Use logarithmic formula for compound interest with contributions
  const numerator = Math.log(
    (target * annualReturn + annualContribution) /
      (principal * annualReturn + annualContribution)
  );
  const denominator = Math.log(1 + annualReturn);

  return numerator / denominator;
}

/**
 * Format currency with proper locale formatting
 * @param amount - Amount to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale string (default: en-US)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage with proper locale formatting
 * @param value - Decimal value to format (e.g., 0.04 for 4%)
 * @param decimals - Number of decimal places
 * @param locale - Locale string (default: en-US)
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  decimals = 0,
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
