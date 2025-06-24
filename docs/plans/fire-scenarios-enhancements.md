# FIRE Scenarios Enhancements Plan

## Overview

This document tracks completed improvements and planned enhancements for the FIRE scenarios feature.

## Recently Completed (2025-01-24)

### ✅ Carousel to Tabs Migration

- Migrated from carousel to side-by-side tabs layout
- Left panel: Scenario selection and details
- Right panel: Growth chart and key metrics
- Improved responsive design and user experience

### ✅ FIRE Math Corrections

- Fixed Coast FIRE to show proper three phases (accumulation, coasting, retirement)
- Fixed Barista FIRE to show portfolio withdrawals + part-time income
- Corrected post-milestone portfolio behavior for all strategies
- Dynamic Barista FIRE target calculation: (expenses - part-time income) / 4%

### ✅ Type Safety Improvements

- Implemented enums for FireType and ScenarioId
- Eliminated all string literal comparisons
- Added TypeScript discriminated unions
- Removed all "as any" usage

### ✅ Chart Improvements

- Added milestone markers (red line for FIRE achievement)
- Added secondary milestone for Coast FIRE (green line for full retirement)
- Extended charts 5 years beyond milestone to show post-FIRE behavior
- Fixed responsive issues and text clipping

## Planned Enhancements

### Phase 1: Input Customization (High Priority)

Currently, all inputs are hardcoded in data.ts. Users should be able to:

1. **Edit Financial Inputs**
   - Current age
   - Annual income
   - Annual expenses
   - Current net worth
   - Expected returns (with sensible defaults)
   - Safe withdrawal rate (with 4% default)

2. **Edit Strategy-Specific Inputs**
   - Coast FIRE: Target coast age, full retirement age
   - Barista FIRE: Expected part-time income
   - Regular FIRE: Custom FIRE target or use 25x rule

3. **Implementation Approach**
   - Add edit mode toggle to scenario details card
   - Use inline form inputs with validation
   - Store user inputs in local storage
   - Add reset to defaults button

### Phase 2: Additional FIRE Strategies (Medium Priority)

1. **Fat FIRE**
   - Higher spending target (e.g., 30-40x expenses)
   - Focus on luxury retirement lifestyle

2. **Lean FIRE**
   - Lower spending target (e.g., 20x expenses)
   - Minimalist lifestyle focus

3. **Flamingo FIRE**
   - Work to reach half of FIRE number
   - Let it grow while working part-time
   - Similar to Coast but with 50% target

### Phase 3: Enhanced Visualizations (Medium Priority)

1. **Multiple Chart Views**
   - Portfolio growth (current)
   - Income streams over time
   - Savings rate progression
   - Withdrawal sustainability

2. **Milestone Timeline**
   - Visual timeline showing key life events
   - Customizable milestones (kids, house, etc.)
   - Integration with life modules concept

3. **Scenario Comparison**
   - Side-by-side comparison of different strategies
   - Trade-off analysis (years to FIRE vs lifestyle)

### Phase 4: Advanced Features (Low Priority)

1. **Monte Carlo Simulations**
   - Success probability calculations
   - Sequence of returns risk analysis
   - Market crash scenarios

2. **Tax Optimization**
   - Traditional vs Roth considerations
   - Tax bracket optimization
   - Capital gains planning

3. **Social Security Integration**
   - Factor in expected SS benefits
   - Optimal claiming strategies

## Technical Debt & Improvements

1. **Remove Unused Files**
   - Delete `scenario-carousel.tsx` (no longer used)

2. **Performance Optimizations**
   - Memoize expensive calculations
   - Optimize chart re-renders
   - Consider virtualization for data tables

3. **Testing**
   - Add unit tests for FIRE calculations
   - Add integration tests for scenarios
   - Add visual regression tests for charts

4. **Accessibility**
   - Ensure chart data is accessible to screen readers
   - Add keyboard navigation for all interactive elements
   - Improve color contrast for charts

## User Feedback Integration

Based on future user feedback, consider:

- Inflation adjustments
- International user support (currency, tax systems)
- Mobile app version
- Export/import functionality
- Sharing and collaboration features

## Success Metrics

- User can understand their path to FIRE within 30 seconds
- All calculations are transparent and verifiable
- Interface is intuitive without requiring documentation
- Mobile experience is as good as desktop

---

**Created:** 2025-01-24  
**Last Updated:** 2025-01-24  
**Status:** Active Planning  
**Next Priority:** Phase 1 - Input Customization
