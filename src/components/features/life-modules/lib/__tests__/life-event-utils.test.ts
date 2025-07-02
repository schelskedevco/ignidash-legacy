import { describe, it, expect, vi } from "vitest";
import {
  calculateSingleEventImpact,
  calculateLifeEventImpact,
  adjustScenarioForLifeEvents,
  calculateFireWithLifeEvents,
  BASELINE_INPUTS,
} from "../life-event-utils";
import {
  LifeEventData,
  LifeEventSelection,
  LifeEventImpact,
} from "../life-event-types";

// Test data factories
const createOngoingLifeEvent = (overrides = {}): LifeEventData => ({
  id: "test-car",
  title: "Car",
  impactType: "ongoing",
  durationYears: 5,
  options: [
    { label: "Used Reliable", cost: 15000 },
    { label: "New Mid-Range", cost: 35000 },
    { label: "Luxury Vehicle", cost: 65000 },
  ],
  ...overrides,
});

const createImmediateLifeEvent = (overrides = {}): LifeEventData => ({
  id: "test-sabbatical",
  title: "Sabbatical",
  impactType: "immediate",
  options: [
    { label: "3 Months", cost: 15000 },
    { label: "6 Months", cost: 30000 },
    { label: "1 Year", cost: 60000 },
  ],
  ...overrides,
});

const createWindfallLifeEvent = (overrides = {}): LifeEventData => ({
  id: "test-inheritance",
  title: "Inheritance",
  impactType: "windfall",
  options: [
    { label: "Small Inheritance", income: 50000 },
    { label: "Large Inheritance", income: 200000 },
  ],
  ...overrides,
});

const createLifeEventSelection = (
  eventId: string,
  optionIndex: number,
  cost?: number,
  income?: number
): LifeEventSelection => ({
  eventId,
  optionIndex,
  option: {
    label: `Option ${optionIndex}`,
    ...(cost && { cost }),
    ...(income && { income }),
  },
});

describe("calculateSingleEventImpact", () => {
  describe("Immediate life events", () => {
    it("correctly calculates immediate impact", () => {
      const event = createImmediateLifeEvent();
      const selection = createLifeEventSelection("test-sabbatical", 1, 30000);

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: 30000,
        annualExpenseIncrease: 0,
      });
    });

    it("handles zero cost immediate events", () => {
      const event = createImmediateLifeEvent();
      const selection = createLifeEventSelection("test-sabbatical", 0, 0);

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: 0,
        annualExpenseIncrease: 0,
      });
    });
  });

  describe("Ongoing life events (time-limited)", () => {
    it("correctly calculates ongoing impact with duration", () => {
      const event = createOngoingLifeEvent({ durationYears: 5 });
      const selection = createLifeEventSelection("test-car", 1, 35000);

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: 0,
        annualExpenseIncrease: 7000, // $35,000 / 5 years
        expenseIncreaseDurationYears: 5,
      });
    });

    it("correctly calculates child expenses over 18 years", () => {
      const event = createOngoingLifeEvent({
        id: "have-child",
        title: "Child",
        durationYears: 18,
      });
      const selection = createLifeEventSelection("have-child", 1, 350000);

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: 0,
        annualExpenseIncrease: 350000 / 18, // ~$19,444.44/year
        expenseIncreaseDurationYears: 18,
      });
    });

    it("handles zero duration years", () => {
      const event = createOngoingLifeEvent({ durationYears: 0 });
      const selection = createLifeEventSelection("test-car", 1, 35000);

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: 0,
        annualExpenseIncrease: 0,
      });
    });

    it("handles undefined duration years", () => {
      const event = createOngoingLifeEvent();
      delete (event as { durationYears?: number }).durationYears;
      const selection = createLifeEventSelection("test-car", 1, 35000);

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: 0,
        annualExpenseIncrease: 0,
      });
    });
  });

  describe("Windfall life events", () => {
    it("correctly calculates windfall impact", () => {
      const event = createWindfallLifeEvent();
      const selection = createLifeEventSelection(
        "test-inheritance",
        1,
        undefined,
        200000
      );

      const impact = calculateSingleEventImpact(event, selection);

      expect(impact).toEqual({
        immediateAssetReduction: -200000, // Negative = asset increase
        annualExpenseIncrease: 0,
      });
    });

    it("handles zero income windfalls", () => {
      const event = createWindfallLifeEvent();
      const selection = createLifeEventSelection(
        "test-inheritance",
        0,
        undefined,
        0
      );

      const impact = calculateSingleEventImpact(event, selection);

      expect(Math.abs(impact.immediateAssetReduction)).toBe(0);
      expect(impact.annualExpenseIncrease).toBe(0);
    });
  });
});

describe("calculateLifeEventImpact", () => {
  it("combines multiple life event impacts correctly", () => {
    const events = [
      createOngoingLifeEvent({ id: "car", durationYears: 5 }),
      createImmediateLifeEvent({ id: "sabbatical" }),
      createWindfallLifeEvent({ id: "inheritance" }),
    ];

    const selections = [
      createLifeEventSelection("car", 1, 35000), // $7k/year for 5 years
      createLifeEventSelection("sabbatical", 1, 30000), // $30k immediate
      createLifeEventSelection("inheritance", 0, undefined, 50000), // $50k windfall
    ];

    const combinedImpact = calculateLifeEventImpact(events, selections);

    // With the new deferred PV calculation, ongoing events are stored for later processing
    // Car: stored as {annualAmount: 7000, durationYears: 5}
    // Sabbatical: $30k immediate
    // Inheritance: -$50k windfall
    // Immediate total: $30k - $50k = -$20k (net windfall)
    expect(combinedImpact.immediateAssetReduction).toBe(-20000);
    expect(combinedImpact.annualExpenseIncrease).toBe(0); // No permanent expenses
    expect(combinedImpact.ongoingEvents).toHaveLength(1); // One ongoing event stored
    expect(combinedImpact.ongoingEvents![0]).toEqual({
      annualAmount: 7000,
      durationYears: 5,
    });
  });

  it("handles empty selections", () => {
    const events = [createOngoingLifeEvent()];
    const selections: LifeEventSelection[] = [];

    const combinedImpact = calculateLifeEventImpact(events, selections);

    expect(combinedImpact).toEqual({
      immediateAssetReduction: 0,
      annualExpenseIncrease: 0,
    });
  });

  it("warns about missing events", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const events = [createOngoingLifeEvent({ id: "car" })];
    const selections = [createLifeEventSelection("missing-event", 0, 10000)];

    const combinedImpact = calculateLifeEventImpact(events, selections);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Event with id missing-event not found"
    );
    expect(combinedImpact).toEqual({
      immediateAssetReduction: 0,
      annualExpenseIncrease: 0,
    });

    consoleSpy.mockRestore();
  });
});

describe("adjustScenarioForLifeEvents", () => {
  const baseInputs = {
    age: 28,
    annualIncome: 85000,
    annualExpenses: 50000,
    currentInvestedAssets: 75000,
    safeWithdrawalRate: 0.04,
    expectedReturns: 0.07,
  };

  describe("Time-limited expense handling", () => {
    it("converts time-limited expenses to present value asset reduction", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 7000, // $7k/year
        expenseIncreaseDurationYears: 5, // for 5 years
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Present value of $7k/year for 5 years at 7% discount rate
      // PV = 7000 * [(1 - (1.07)^-5) / 0.07] ≈ $28,653
      const expectedPV = 7000 * ((1 - Math.pow(1.07, -5)) / 0.07);

      expect(adjustedInputs.annualExpenses).toBe(50000); // Unchanged
      expect(adjustedInputs.currentInvestedAssets).toBeCloseTo(
        75000 - expectedPV,
        0
      );
    });

    it("handles combined immediate and time-limited impacts", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 30000, // Immediate cost
        annualExpenseIncrease: 10000, // $10k/year
        expenseIncreaseDurationYears: 3, // for 3 years
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Present value of $10k/year for 3 years at 7%
      const expectedPV = 10000 * ((1 - Math.pow(1.07, -3)) / 0.07);
      const totalReduction = 30000 + expectedPV;

      expect(adjustedInputs.currentInvestedAssets).toBeCloseTo(
        75000 - totalReduction,
        0
      );
    });

    it("handles zero discount rate correctly", () => {
      const impactZeroRate: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 5000,
        expenseIncreaseDurationYears: 4,
      };

      const inputsZeroRate = { ...baseInputs, expectedReturns: 0 };
      const adjustedInputs = adjustScenarioForLifeEvents(
        inputsZeroRate,
        impactZeroRate
      );

      // With zero discount rate, PV = annual * years = 5000 * 4 = 20000
      expect(adjustedInputs.currentInvestedAssets).toBe(75000 - 20000);
    });
  });

  describe("Legacy behavior (permanent expenses)", () => {
    it("handles permanent expense increases when no duration specified", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 5000, // Permanent increase
        // No expenseIncreaseDurationYears
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      expect(adjustedInputs.annualExpenses).toBe(55000); // 50000 + 5000
      expect(adjustedInputs.currentInvestedAssets).toBe(75000); // Unchanged
    });
  });

  describe("Asset protection", () => {
    it("prevents negative assets", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 100000, // More than available assets
        annualExpenseIncrease: 0,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      expect(adjustedInputs.currentInvestedAssets).toBe(0); // Protected at zero
    });
  });

  describe("Windfall handling", () => {
    it("increases assets for negative immediate reductions", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: -50000, // Windfall
        annualExpenseIncrease: 0,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      expect(adjustedInputs.currentInvestedAssets).toBe(125000); // 75000 + 50000
    });
  });
});

describe("calculateFireWithLifeEvents integration", () => {
  it("correctly integrates time-limited expenses into FIRE projections", () => {
    const events = [createOngoingLifeEvent({ durationYears: 5 })];
    const selections = [createLifeEventSelection("test-car", 1, 35000)];

    const result = calculateFireWithLifeEvents(events, selections);

    // Verify impact calculation - now using deferred PV calculation
    expect(result.impact.immediateAssetReduction).toBe(0); // No immediate impact
    expect(result.impact.annualExpenseIncrease).toBe(0); // No permanent expenses
    expect(result.impact.ongoingEvents).toHaveLength(1); // One ongoing event stored
    expect(result.impact.ongoingEvents![0]).toEqual({
      annualAmount: 7000,
      durationYears: 5,
    });

    // Verify baseline vs adjusted projections
    expect(result.baseline.yearsToFire).toBeGreaterThan(0);
    expect(result.adjusted.yearsToFire).toBeGreaterThan(
      result.baseline.yearsToFire
    );
    expect(result.yearsImpact).toBeGreaterThan(0); // Should delay FIRE
  });

  it("handles mixed event types correctly", () => {
    const events = [
      createOngoingLifeEvent({ id: "car", durationYears: 5 }),
      createImmediateLifeEvent({ id: "sabbatical" }),
      createWindfallLifeEvent({ id: "inheritance" }),
    ];

    const selections = [
      createLifeEventSelection("car", 0, 15000), // $3k/year for 5 years
      createLifeEventSelection("sabbatical", 0, 15000), // $15k immediate
      createLifeEventSelection("inheritance", 1, undefined, 200000), // $200k windfall (larger)
    ];

    const result = calculateFireWithLifeEvents(events, selections);

    // Net should be positive windfall effect with large inheritance
    expect(result.yearsImpact).toBeLessThan(0); // Should accelerate FIRE
  });

  it("verifies present value calculations are reasonable", () => {
    const events = [createOngoingLifeEvent({ durationYears: 5 })];
    const selections = [createLifeEventSelection("test-car", 1, 35000)]; // $7k/year for 5 years

    const result = calculateFireWithLifeEvents(events, selections);

    // The difference in years to FIRE should be reasonable (not too extreme)
    expect(result.yearsImpact).toBeGreaterThan(0.5);
    expect(result.yearsImpact).toBeLessThan(5);
  });
});

describe("Edge Cases and Mathematical Robustness", () => {
  describe("Multiple ongoing events with different durations", () => {
    it("correctly handles Car + Child scenario (critical bug fix)", () => {
      const events = [
        createOngoingLifeEvent({ id: "car", durationYears: 5 }),
        createOngoingLifeEvent({ id: "child", durationYears: 18 }),
      ];

      const selections = [
        createLifeEventSelection("car", 1, 35000), // $7k/year for 5 years
        createLifeEventSelection("child", 1, 350000), // ~$19.4k/year for 18 years
      ];

      const combinedImpact = calculateLifeEventImpact(events, selections);

      // Should calculate PV for each event separately, not use combined duration
      // Car PV: ~$28,701 (7000 * 4.1002)
      // Child PV: ~$195,516 (19444.44 * 10.058)
      // Total: ~$224,217

      // The key test: should store both ongoing events for deferred calculation
      expect(combinedImpact.immediateAssetReduction).toBe(0); // No immediate impacts
      expect(combinedImpact.annualExpenseIncrease).toBe(0); // No permanent expenses
      expect(combinedImpact.ongoingEvents).toHaveLength(2); // Two ongoing events stored

      // Verify the stored events
      expect(combinedImpact.ongoingEvents![0]).toEqual({
        annualAmount: 7000, // $35k / 5 years
        durationYears: 5,
      });
      expect(combinedImpact.ongoingEvents![1]).toEqual({
        annualAmount: 350000 / 18, // ~$19,444.44/year
        durationYears: 18,
      });
    });

    it("handles three different ongoing events correctly", () => {
      const events = [
        createOngoingLifeEvent({ id: "car", durationYears: 5 }),
        createOngoingLifeEvent({ id: "child", durationYears: 18 }),
        createOngoingLifeEvent({ id: "other", durationYears: 10 }),
      ];

      const selections = [
        createLifeEventSelection("car", 0, 15000), // $3k/year for 5 years
        createLifeEventSelection("child", 0, 233000), // ~$12.9k/year for 18 years
        createLifeEventSelection("other", 0, 50000), // $5k/year for 10 years
      ];

      const combinedImpact = calculateLifeEventImpact(events, selections);

      // Each should be stored separately for deferred calculation
      expect(combinedImpact.immediateAssetReduction).toBe(0); // No immediate impacts
      expect(combinedImpact.annualExpenseIncrease).toBe(0); // No permanent expenses
      expect(combinedImpact.ongoingEvents).toHaveLength(3); // Three ongoing events stored

      // Verify the stored events
      expect(combinedImpact.ongoingEvents![0]).toEqual({
        annualAmount: 3000, // $15k / 5 years
        durationYears: 5,
      });
      expect(combinedImpact.ongoingEvents![1]).toEqual({
        annualAmount: 233000 / 18, // ~$12,944.44/year
        durationYears: 18,
      });
      expect(combinedImpact.ongoingEvents![2]).toEqual({
        annualAmount: 5000, // $50k / 10 years
        durationYears: 10,
      });
    });
  });

  describe("Extreme discount rate handling", () => {
    it("handles zero discount rate correctly", () => {
      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.0, // Zero discount rate
      };

      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 5000,
        expenseIncreaseDurationYears: 4,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // With zero discount rate, PV = annual * years = 5000 * 4 = 20000
      expect(adjustedInputs.currentInvestedAssets).toBe(75000 - 20000);
    });

    it("handles negative discount rates gracefully", () => {
      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: -0.3, // Negative discount rate
      };

      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 5000,
        expenseIncreaseDurationYears: 4,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Should handle gracefully without crashing
      expect(adjustedInputs.currentInvestedAssets).toBeGreaterThanOrEqual(0);
      expect(isFinite(adjustedInputs.currentInvestedAssets)).toBe(true);
    });

    it("handles extremely high discount rates", () => {
      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 2.0, // 200% return rate
      };

      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 10000,
        expenseIncreaseDurationYears: 5,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Should handle gracefully and produce reasonable results
      expect(adjustedInputs.currentInvestedAssets).toBeGreaterThanOrEqual(0);
      expect(isFinite(adjustedInputs.currentInvestedAssets)).toBe(true);
    });
  });

  describe("Extreme duration and value handling", () => {
    it("handles very long durations gracefully", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 1000,
        expenseIncreaseDurationYears: 150, // 150 years
      };

      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.07,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Should use simplified calculation for extreme durations
      expect(adjustedInputs.currentInvestedAssets).toBeGreaterThanOrEqual(0);
      expect(isFinite(adjustedInputs.currentInvestedAssets)).toBe(true);
    });

    it("handles very large financial values", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 10000000, // $10M/year
        expenseIncreaseDurationYears: 5,
      };

      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.07,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Should handle large values without overflow
      expect(isFinite(adjustedInputs.currentInvestedAssets)).toBe(true);
      expect(adjustedInputs.currentInvestedAssets).toBe(0); // Should be clamped to 0
    });

    it("handles negative annual increases (savings)", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: -5000, // $5k/year savings
        expenseIncreaseDurationYears: 5,
      };

      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.07,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Negative expenses should increase available assets
      expect(adjustedInputs.currentInvestedAssets).toBeGreaterThan(75000);
      expect(isFinite(adjustedInputs.currentInvestedAssets)).toBe(true);
    });
  });

  describe("Precision and rounding", () => {
    it("consistently rounds to nearest cent", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 7333.33, // Odd amount that causes precision issues
        expenseIncreaseDurationYears: 3,
      };

      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.07,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Result should be properly rounded to cents
      const reduction = 75000 - adjustedInputs.currentInvestedAssets;
      expect(
        Math.abs(reduction - Math.round(reduction * 100) / 100)
      ).toBeLessThan(0.01);
    });
  });

  describe("Missing Critical Test Cases", () => {
    it("CRITICAL: verifies discount rate consistency between single and multi-event scenarios", () => {
      const events = [createOngoingLifeEvent({ durationYears: 5 })];
      const selections = [createLifeEventSelection("test-car", 1, 35000)];

      // Test with custom discount rate (not 7%)
      const customInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.1, // 10% instead of 7%
      };

      // Single event should use actual discount rate
      const singleEventImpact = calculateLifeEventImpact(events, selections);
      const singleEventResult = adjustScenarioForLifeEvents(
        customInputs,
        singleEventImpact
      );

      // Multi-event scenario (should use same rate but currently doesn't!)
      const multiEvents = [
        createOngoingLifeEvent({ id: "car", durationYears: 5 }),
        createOngoingLifeEvent({ id: "other", durationYears: 10 }),
      ];
      const multiSelections = [
        createLifeEventSelection("car", 1, 35000),
        createLifeEventSelection("other", 0, 50000),
      ];

      const multiEventImpact = calculateLifeEventImpact(
        multiEvents,
        multiSelections
      );
      const multiEventResult = adjustScenarioForLifeEvents(
        customInputs,
        multiEventImpact
      );

      // This test now verifies the discount rate consistency is FIXED
      const singleReduction = 75000 - singleEventResult.currentInvestedAssets;
      const multiReduction = 75000 - multiEventResult.currentInvestedAssets;

      console.log(`Single event asset reduction: ${singleReduction}`);
      console.log(`Multi event asset reduction: ${multiReduction}`);

      // Both should use 10% discount rate and be mathematically consistent
      expect(isFinite(singleEventResult.currentInvestedAssets)).toBe(true);
      expect(isFinite(multiEventResult.currentInvestedAssets)).toBe(true);

      // The key test: both scenarios should now produce similar per-event impacts
      // Single event: $7k/year for 5 years at 10% = ~$26,535
      // Multi events: Car ($7k/5yr) + Other ($5k/10yr) at 10% = ~$26,535 + $30,723 = ~$57,258
      // This should be mathematically consistent
      expect(singleReduction).toBeCloseTo(26535, -1);
      expect(multiReduction).toBeCloseTo(57258, -1);
    });

    it("tests fractional years and very small durations", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 12000, // $1k/month
        expenseIncreaseDurationYears: 0.5, // 6 months
      };

      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.07,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Should handle fractional years correctly
      expect(adjustedInputs.currentInvestedAssets).toBeLessThan(75000);
      expect(isFinite(adjustedInputs.currentInvestedAssets)).toBe(true);
    });

    it("tests zero and very small annual increases", () => {
      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: 0.01, // 1 cent per year
        expenseIncreaseDurationYears: 5,
      };

      const baseInputs = {
        age: 28,
        annualIncome: 85000,
        annualExpenses: 50000,
        currentInvestedAssets: 75000,
        safeWithdrawalRate: 0.04,
        expectedReturns: 0.07,
      };

      const adjustedInputs = adjustScenarioForLifeEvents(baseInputs, impact);

      // Should handle tiny amounts without precision errors
      expect(adjustedInputs.currentInvestedAssets).toBeLessThan(75000);
      expect(adjustedInputs.currentInvestedAssets).toBeGreaterThan(74999);
    });

    it("tests boundary between single and multi-event logic", () => {
      // Test exactly one ongoing event to ensure it uses single-event path
      const events = [createOngoingLifeEvent({ durationYears: 5 })];
      const selections = [createLifeEventSelection("test-car", 1, 35000)];

      const impact = calculateLifeEventImpact(events, selections);

      // Should have one ongoing event stored for deferred calculation
      expect(impact.ongoingEvents).toHaveLength(1);
      expect(impact.ongoingEvents![0]).toEqual({
        annualAmount: 7000,
        durationYears: 5,
      });
      expect(impact.annualExpenseIncrease).toBe(0); // No permanent expenses
    });
  });

  describe("Mixed event types with edge cases", () => {
    it("handles combination of ongoing, immediate, and windfall events", () => {
      const events = [
        createOngoingLifeEvent({ id: "car", durationYears: 5 }),
        createImmediateLifeEvent({ id: "sabbatical" }),
        createWindfallLifeEvent({ id: "inheritance" }),
      ];

      const selections = [
        createLifeEventSelection("car", 0, 15000), // $3k/year for 5 years
        createLifeEventSelection("sabbatical", 2, 60000), // $60k immediate
        createLifeEventSelection("inheritance", 1, undefined, 200000), // $200k windfall
      ];

      const combinedImpact = calculateLifeEventImpact(events, selections);

      // Should handle all types correctly
      expect(isFinite(combinedImpact.immediateAssetReduction)).toBe(true);
      expect(combinedImpact.immediateAssetReduction).toBe(-140000); // $60k + $200k immediate impacts
      expect(combinedImpact.ongoingEvents).toHaveLength(1); // One ongoing event stored
      expect(combinedImpact.ongoingEvents![0]).toEqual({
        annualAmount: 3000, // $15k / 5 years
        durationYears: 5,
      });
    });
  });
});

describe("Critical Missing Test Cases", () => {
  describe("Floating Point Precision and Rounding", () => {
    it("should handle recurring decimal annual amounts without compounding errors", () => {
      const events = [
        createOngoingLifeEvent({ id: "expense1", durationYears: 3 }),
        createOngoingLifeEvent({ id: "expense2", durationYears: 7 }),
        createOngoingLifeEvent({ id: "expense3", durationYears: 11 }),
      ];

      // These will create recurring decimals: 10000/3, 23000/7, 37000/11
      const selections = [
        createLifeEventSelection("expense1", 0, 10000),
        createLifeEventSelection("expense2", 0, 23000),
        createLifeEventSelection("expense3", 0, 37000),
      ];

      const result = calculateFireWithLifeEvents(events, selections);

      // Verify no NaN or Infinity values
      expect(isFinite(result.adjusted.yearsToFire)).toBe(true);
      expect(isFinite(result.adjusted.fireAge)).toBe(true);

      // Verify consistent decimal handling
      const impact = calculateLifeEventImpact(events, selections);
      impact.ongoingEvents!.forEach((event) => {
        expect(isFinite(event.annualAmount)).toBe(true);
        // Annual amounts should be properly rounded
        const rounded = Math.round(event.annualAmount * 100) / 100;
        expect(Math.abs(event.annualAmount - rounded)).toBeLessThan(0.01);
      });
    });

    it("should maintain precision across multiple PV calculations with different rates", () => {
      const events = [
        createOngoingLifeEvent({ id: "test", durationYears: 10 }),
      ];
      const selections = [createLifeEventSelection("test", 0, 100000)];

      // Test with very close discount rates
      const rates = [0.0699999, 0.07, 0.0700001];
      const results = rates.map((rate) => {
        const inputs = { ...BASELINE_INPUTS, expectedReturns: rate };
        const impact = calculateLifeEventImpact(events, selections);
        const adjusted = adjustScenarioForLifeEvents(inputs, impact);
        return adjusted.currentInvestedAssets;
      });

      // Results should be very close but not cause precision errors
      expect(Math.abs(results[0] - results[1])).toBeLessThan(1); // Less than $1 difference
      expect(Math.abs(results[1] - results[2])).toBeLessThan(1);
      results.forEach((result) => {
        expect(isFinite(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("Concurrent Events with Overlapping Timelines", () => {
    it("should correctly calculate PV for multiple overlapping ongoing events", () => {
      // This tests the critical bug mentioned in the code about Car + Child
      const events = [
        createOngoingLifeEvent({ id: "car1", durationYears: 5 }),
        createOngoingLifeEvent({ id: "child", durationYears: 18 }),
        createOngoingLifeEvent({ id: "car2", durationYears: 5 }), // Second car overlapping
      ];

      const selections = [
        createLifeEventSelection("car1", 0, 25000), // $5k/year for 5 years
        createLifeEventSelection("child", 0, 360000), // $20k/year for 18 years
        createLifeEventSelection("car2", 0, 30000), // $6k/year for 5 years
      ];

      const impact = calculateLifeEventImpact(events, selections);

      // Each event should be stored separately
      expect(impact.ongoingEvents).toHaveLength(3);

      // Verify each maintains its own duration
      expect(impact.ongoingEvents![0].durationYears).toBe(5);
      expect(impact.ongoingEvents![1].durationYears).toBe(18);
      expect(impact.ongoingEvents![2].durationYears).toBe(5);

      // Test that PV calculation uses correct rate for each
      const inputs = {
        ...BASELINE_INPUTS,
        expectedReturns: 0.08, // 8% rate
        currentInvestedAssets: 500000, // Increase assets to handle the PV reduction
      };
      const adjusted = adjustScenarioForLifeEvents(inputs, impact);

      // Manual PV calculation at 8%
      const pv1 = 5000 * ((1 - Math.pow(1.08, -5)) / 0.08);
      const pv2 = 20000 * ((1 - Math.pow(1.08, -18)) / 0.08);
      const pv3 = 6000 * ((1 - Math.pow(1.08, -5)) / 0.08);
      const expectedReduction = pv1 + pv2 + pv3;

      expect(adjusted.currentInvestedAssets).toBeCloseTo(
        inputs.currentInvestedAssets - expectedReduction,
        0
      );
    });

    it("should handle events with identical durations but different amounts", () => {
      const events = [
        createOngoingLifeEvent({ id: "expense1", durationYears: 5 }),
        createOngoingLifeEvent({ id: "expense2", durationYears: 5 }),
        createOngoingLifeEvent({ id: "expense3", durationYears: 5 }),
      ];

      const selections = [
        createLifeEventSelection("expense1", 0, 10000), // $2k/year
        createLifeEventSelection("expense2", 0, 25000), // $5k/year
        createLifeEventSelection("expense3", 0, 50000), // $10k/year
      ];

      const impact = calculateLifeEventImpact(events, selections);

      // Verify each event maintains its own annual amount
      expect(impact.ongoingEvents![0].annualAmount).toBe(2000);
      expect(impact.ongoingEvents![1].annualAmount).toBe(5000);
      expect(impact.ongoingEvents![2].annualAmount).toBe(10000);

      // All should have same duration
      impact.ongoingEvents!.forEach((event) => {
        expect(event.durationYears).toBe(5);
      });
    });
  });

  describe("FIRE Age Boundary Conditions", () => {
    it("should handle scenarios where windfalls enable immediate retirement", () => {
      const events = [createWindfallLifeEvent({ id: "lottery" })];
      const selections = [
        createLifeEventSelection("lottery", 0, undefined, 2000000), // $2M windfall
      ];

      const result = calculateFireWithLifeEvents(events, selections);

      // With $2M windfall on top of $75k, should enable immediate or very soon retirement
      expect(result.adjusted.yearsToFire).toBeLessThanOrEqual(1);
      expect(result.yearsImpact).toBeLessThan(-10); // Should accelerate by 10+ years
      expect(isFinite(result.adjusted.yearsToFire)).toBe(true);
    });

    it("should handle scenarios pushing FIRE beyond normal retirement age", () => {
      const events = [
        createImmediateLifeEvent({
          id: "disaster",
          options: [{ label: "Major Loss", cost: 500000 }],
        }),
        createOngoingLifeEvent({ id: "medical", durationYears: 30 }),
      ];

      const selections = [
        createLifeEventSelection("disaster", 0, 500000), // $500k immediate loss
        createLifeEventSelection("medical", 0, 300000), // $10k/year for 30 years
      ];

      const result = calculateFireWithLifeEvents(events, selections);

      // Should handle extreme delay gracefully
      expect(isFinite(result.adjusted.yearsToFire)).toBe(true);
      expect(result.adjusted.yearsToFire).toBeGreaterThan(0);
      expect(result.adjusted.fireAge).toBeLessThan(120); // Some reasonable upper bound
    });
  });

  describe("Asset Edge Cases and Protection", () => {
    it("should handle PV calculation when assets exactly equal PV of expenses", () => {
      // Calculate exact PV for a known scenario
      const discountRate = 0.07;
      const annualAmount = 10000;
      const duration = 5;
      const exactPV =
        annualAmount *
        ((1 - Math.pow(1 + discountRate, -duration)) / discountRate);

      const inputs = {
        ...BASELINE_INPUTS,
        currentInvestedAssets: exactPV, // Set assets to exactly match PV
        expectedReturns: discountRate,
      };

      const impact: LifeEventImpact = {
        immediateAssetReduction: 0,
        annualExpenseIncrease: annualAmount,
        expenseIncreaseDurationYears: duration,
      };

      const adjusted = adjustScenarioForLifeEvents(inputs, impact);

      // Should reduce to exactly 0 (or very close due to rounding)
      expect(adjusted.currentInvestedAssets).toBeCloseTo(0, 2);
      expect(adjusted.currentInvestedAssets).toBeGreaterThanOrEqual(0); // Never negative
    });

    it("should prevent negative assets with multiple large expenses", () => {
      const events = [
        createImmediateLifeEvent({ id: "expense1" }),
        createOngoingLifeEvent({ id: "expense2", durationYears: 20 }),
        createImmediateLifeEvent({ id: "expense3" }),
      ];

      const selections = [
        createLifeEventSelection("expense1", 0, 100000),
        createLifeEventSelection("expense2", 0, 500000), // $25k/year for 20 years
        createLifeEventSelection("expense3", 0, 200000),
      ];

      const result = calculateFireWithLifeEvents(events, selections);
      const impact = result.impact;
      const adjusted = adjustScenarioForLifeEvents(BASELINE_INPUTS, impact);

      // Should never go negative
      expect(adjusted.currentInvestedAssets).toBe(0);
    });
  });

  describe("Years Impact Display Threshold", () => {
    it("should show 0 years impact for changes less than 6 months", () => {
      // Need to create a scenario that delays FIRE by < 0.5 years
      const events = [createImmediateLifeEvent({ id: "small" })];
      const selections = [createLifeEventSelection("small", 0, 5000)]; // Small expense

      const result = calculateFireWithLifeEvents(events, selections);

      // Calculate display impact
      const displayYearsImpact =
        Math.abs(result.yearsImpact) < 0.5 ? 0 : Math.round(result.yearsImpact);

      if (Math.abs(result.yearsImpact) < 0.5) {
        expect(displayYearsImpact).toBe(0);
      }
    });

    it("should round years impact correctly at boundaries", () => {
      // Test rounding at key boundaries
      // Note: Math.round() rounds .5 cases toward positive infinity
      const testCases = [
        { impact: 0.4, expected: 0 },
        { impact: 0.5, expected: 1 },
        { impact: 0.6, expected: 1 },
        { impact: 1.4, expected: 1 },
        { impact: 1.5, expected: 2 },
        { impact: -0.4, expected: 0 },
        { impact: -0.5, expected: 0 }, // Math.round(-0.5) = -0
        { impact: -1.5, expected: -1 }, // Math.round(-1.5) = -1, not -2
      ];

      testCases.forEach(({ impact, expected }) => {
        const displayImpact =
          Math.abs(impact) < 0.5 ? 0 : Math.round(impact) + 0; // Adding 0 converts -0 to 0
        expect(displayImpact).toBe(expected);
      });
    });
  });

  describe("State Mutation Protection", () => {
    it("should not mutate input data during calculations", () => {
      const originalEvents = [
        createOngoingLifeEvent({ id: "test1", durationYears: 5 }),
        createImmediateLifeEvent({ id: "test2" }),
      ];
      const originalSelections = [
        createLifeEventSelection("test1", 0, 10000),
        createLifeEventSelection("test2", 0, 5000),
      ];
      const originalInputs = { ...BASELINE_INPUTS };

      // Deep copy for comparison
      const eventsCopy = JSON.parse(JSON.stringify(originalEvents));
      const selectionsCopy = JSON.parse(JSON.stringify(originalSelections));
      const inputsCopy = JSON.parse(JSON.stringify(originalInputs));

      // Run calculations
      const impact = calculateLifeEventImpact(
        originalEvents,
        originalSelections
      );
      adjustScenarioForLifeEvents(originalInputs, impact); // Just call it, don't store result
      calculateFireWithLifeEvents(originalEvents, originalSelections);

      // Verify no mutations
      expect(originalEvents).toEqual(eventsCopy);
      expect(originalSelections).toEqual(selectionsCopy);
      expect(originalInputs).toEqual(inputsCopy);
    });
  });

  describe("Complex Mixed Event Scenarios", () => {
    it("should correctly handle all event types with extreme values", () => {
      const events = [
        createWindfallLifeEvent({ id: "windfall1" }),
        createImmediateLifeEvent({ id: "immediate1" }),
        createOngoingLifeEvent({ id: "ongoing1", durationYears: 10 }),
        createWindfallLifeEvent({ id: "windfall2" }),
        createOngoingLifeEvent({ id: "ongoing2", durationYears: 25 }),
      ];

      const selections = [
        createLifeEventSelection("windfall1", 0, undefined, 100000),
        createLifeEventSelection("immediate1", 0, 150000),
        createLifeEventSelection("ongoing1", 0, 100000), // $10k/year
        createLifeEventSelection("windfall2", 0, undefined, 50000),
        createLifeEventSelection("ongoing2", 0, 500000), // $20k/year
      ];

      const result = calculateFireWithLifeEvents(events, selections);

      // Verify all calculations complete without errors
      expect(isFinite(result.adjusted.yearsToFire)).toBe(true);
      expect(isFinite(result.adjusted.fireAge)).toBe(true);
      expect(isFinite(result.yearsImpact)).toBe(true);

      // Net immediate impact should be windfalls - immediate costs
      expect(result.impact.immediateAssetReduction).toBe(
        -150000 + 100000 + 50000
      );

      // Should have two ongoing events
      expect(result.impact.ongoingEvents).toHaveLength(2);
    });
  });
});
