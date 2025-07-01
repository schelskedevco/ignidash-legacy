# Plan: Dynamic FIRE Impact Output Implementation

## Overview
Wire up the FIRE Impact Output section to show real-time calculations based on life event selections, using the existing FIRE calculation infrastructure.

## Implementation Details

### 1. Enhanced Selection State Management
- **Update state structure** from `Set<string>` to `Map<string, LifeEventSelection>`
- Track both selected cards AND their specific option details (label, cost, etc.)
- Maintain max 3 selections limit

### 2. Life Event Data Structure Update
Remove "Start Business" and enhance remaining events with impact metadata:

```typescript
interface LifeEventData {
  id: string;
  title: string;
  options: LifeEventOption[];
  impactType: 'immediate' | 'ongoing' | 'investment';
  // For ongoing expenses
  durationYears?: number;
  // For investments
  monthlyReturn?: number;
  breakEvenMonths?: number;
}
```

**Event Classifications:**
- **Immediate expenses**: Sabbatical, Home Renovation, World Travel, Wedding
- **Ongoing expenses**: Child (18 years), Car (5 years)  
- **Investment**: Investment Property (with monthly returns after 6 months)

### 3. Baseline FIRE Scenario
Use Regular FIRE scenario as baseline:
- Age: 28
- Annual Income: $85,000
- Annual Expenses: $50,000
- Current Invested: $75,000
- Safe Withdrawal Rate: 4%
- Expected Returns: 7%

### 4. Impact Calculation Logic

**Create `life-event-utils.ts`** with:
- `calculateLifeEventImpact()` - Main calculation function
- `adjustScenarioForLifeEvents()` - Applies impacts to baseline
- `calculateTotalCost()` - Sums selected event costs

**Impact Types:**
- **Immediate**: Reduce current invested assets
- **Ongoing**: Increase annual expenses for duration
- **Investment**: Reduce assets initially, then reduce expenses by monthly return after break-even

### 5. Update Output Display
Replace static values with calculated:
- **FI Age**: Baseline FI age + impact years
- **Total Selected**: Sum of selected costs
- **Years Impact**: Difference from baseline (can be negative for investments!)
- **Monthly Savings**: Adjusted savings rate

### 6. Files to Create/Modify

**Create:**
- `/claude-plans/fire-impact-implementation.md` (this plan)
- `src/components/features/life-modules/lib/life-event-types.ts`
- `src/components/features/life-modules/lib/life-event-utils.ts`

**Modify:**
- `src/components/features/life-modules/life-modules-section.tsx`
  - Update LIFE_EVENTS data structure
  - Remove "Start Business" event
  - Add impact metadata to remaining events
  - Update state management
  - Wire up dynamic calculations

### 7. Investment Property Modeling (Conservative)
```typescript
{
  id: "investment-property",
  title: "Investment Property",
  impactType: "investment",
  options: [
    { 
      label: "Small Rental", 
      cost: 150000,  // Down payment + closing
      monthlyReturn: 300,
      breakEvenMonths: 6
    },
    { 
      label: "Multi-Family", 
      cost: 350000,
      monthlyReturn: 800,
      breakEvenMonths: 6
    },
    { 
      label: "Commercial Space", 
      cost: 750000,
      monthlyReturn: 2000,
      breakEvenMonths: 12
    }
  ]
}
```

### 8. Performance Considerations
- Use `useMemo` for expensive FIRE calculations
- Debounce rapid selection changes if needed
- Keep calculations synchronous for instant feedback

This approach provides real-time, actionable insights while maintaining UI simplicity and leveraging existing robust FIRE calculation infrastructure.