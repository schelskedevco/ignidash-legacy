import { describe, it, expect } from "vitest";
import { calculateInitialFireAge, BASELINE_INPUTS } from "../utils";

describe("calculateInitialFireAge", () => {
  it("should calculate FIRE age correctly", () => {
    const fireAge = calculateInitialFireAge();

    // With baseline inputs (41% savings rate, 7% returns), expect FIRE around age 44-45
    expect(fireAge).toBeCloseTo(44.5, 1);
    expect(fireAge).toBeGreaterThan(BASELINE_INPUTS.age);
    expect(Number.isFinite(fireAge)).toBe(true);
  });

  it("should be deterministic", () => {
    const fireAge1 = calculateInitialFireAge();
    const fireAge2 = calculateInitialFireAge();

    expect(fireAge1).toBe(fireAge2);
  });
});
