# FIRE Math Corrections Plan

## Overview
Fix the FIRE calculations to accurately reflect the three distinct strategies based on correct definitions from the FIRE community.

## Current Problems
1. **Coast FIRE**: Shows unrealistic massive portfolio growth instead of reduced-stress maintenance phase
2. **Barista FIRE**: Stops all income instead of showing portfolio withdrawals + supplemental income
3. **Regular FIRE**: Generally correct but could be clearer about 4% withdrawal
4. **Post-milestone behavior**: All scenarios incorrectly show pure investment growth instead of realistic income/withdrawal patterns

## Corrected FIRE Definitions

### **Coast FIRE**
- **Phase 1 (Accumulation)**: Save aggressively until coast target reached
- **Phase 2 (Coasting)**: Stop retirement contributions, work lower-stress job covering just expenses
- **Phase 3 (Retirement)**: Portfolio has grown to full FIRE number, traditional retirement begins
- **Key insight**: Reduced work stress/hours while portfolio grows in background

### **Barista FIRE** 
- **Phase 1 (Accumulation)**: Save until barista target reached
- **Phase 2 (Semi-retirement)**: Start 4% withdrawals + low-paying supplemental job
- **Phase 3 (Optional)**: May continue indefinitely or transition to full retirement at social security age
- **Key insight**: Currently withdrawing from portfolio but supplementing with easy work

### **Regular FIRE**
- **Phase 1 (Accumulation)**: Save until full FIRE target (25x expenses)
- **Phase 2 (Retirement)**: Complete work cessation, live on 4% withdrawals
- **Key insight**: Full financial independence, no work required

## Mathematical Corrections Needed

### **1. Coast FIRE Calculations**

#### **Current Issues:**
- Shows portfolio growing to unrealistic amounts (e.g., $2M+)
- Doesn't model the "coasting" phase correctly
- Unclear about reduced work requirements

#### **Correct Calculations:**
```typescript
// Phase 1: Accumulation (save aggressively)
coastTarget = futureValue needed that grows to fullFIRE by retirementAge
// Formula: fullFIRETarget / (1 + returns)^(retirementAge - coastAge)

// Phase 2: Coasting (minimal work, no retirement saving)
coastingIncome = annualExpenses // Just cover living costs
retirementSavings = 0 // Stop contributing to retirement
portfolioGrowth = coastTarget * (1 + returns)^years // Growth from returns only

// Phase 3: Traditional retirement
finalPortfolio = coastTarget * (1 + returns)^(retirementAge - coastAge)
retirementIncome = finalPortfolio * 0.04
```

#### **Example Coast FIRE Scenario:**
- Age 25: $75k income, $50k expenses, $75k net worth
- Coast target: $400k by age 30
- Age 30-55: Earn $50k (covers expenses), save $0 for retirement
- Age 55: Portfolio grown to $1.75M, retire on $70k/year

### **2. Barista FIRE Calculations**

#### **Current Issues:**
- Uses confusing "expenses not covered" calculation
- Stops all income post-milestone
- Doesn't show ongoing withdrawal + work pattern

#### **Correct Calculations:**
```typescript
// Target calculation
baristaTarget = (annualExpenses - expectedPartTimeIncome) / 0.04
// Example: ($60k expenses - $20k part-time) / 0.04 = $1M portfolio

// Post-milestone income
portfolioWithdrawal = baristaTarget * 0.04 // Annual withdrawal
partTimeIncome = expectedPartTimeIncome // Ongoing supplemental work
totalIncome = portfolioWithdrawal + partTimeIncome // Should equal expenses

// Portfolio behavior
// Portfolio slowly declines if withdrawing more than growth
// Or stays stable if withdrawal rate matches return rate
```

#### **Example Barista FIRE Scenario:**
- Age 28: $80k income, $60k expenses, $120k net worth
- Target: $1M portfolio (provides $40k) + $20k barista job = $60k total
- Post-milestone: Work coffee shop 20hrs/week, withdraw $40k annually

### **3. Regular FIRE Calculations**

#### **Current Implementation:** Mostly correct
#### **Minor Improvements:**
```typescript
// Clarify that post-FIRE income comes entirely from portfolio
postFIREIncome = fireTarget * 0.04
workIncome = 0 // Complete work cessation
totalIncome = postFIREIncome // Should equal or exceed expenses
```

## Chart Visualization Improvements

### **Timeline Markers**
1. **Coast FIRE**: 
   - Green line at coast milestone (age 30)
   - Blue line at traditional retirement (age 55)
   - Label: "Coast achieved" and "Full retirement"

2. **Barista FIRE**:
   - Orange line at barista milestone 
   - Optional gray line at social security age (67)
   - Label: "Barista FIRE" and "Full retirement (optional)"

3. **Regular FIRE**:
   - Red line at FIRE milestone
   - Label: "Financial Independence"

### **Post-Milestone Behavior**
1. **Coast FIRE**: Flat/minimal savings line during coasting phase
2. **Barista FIRE**: Portfolio level maintained (withdrawals offset by growth)
3. **Regular FIRE**: Portfolio decline from 4% withdrawals (unless growth exceeds withdrawal)

## Input Panel Updates (Left Card)

### **Add New Fields for Coast FIRE**
```typescript
Strategy Details:
- Coast Target: $400,000
- Target Coast Age: 30
- Full Retirement Age: 55
- Coasting Income Needed: $50,000/year
```

### **Add New Fields for Barista FIRE**  
```typescript
Strategy Details:
- Barista Portfolio Target: $1,000,000
- Expected Part-time Income: $20,000/year
- Portfolio Withdrawal: $40,000/year (4%)
- Optional Full Retirement Age: 67
```

### **Update Regular FIRE Fields**
```typescript
Strategy Details:
- FIRE Target: $1,125,000
- Annual Withdrawal (4%): $45,000
- Withdrawal Rate: 4.0%
- Expected Returns: 7.0%
```

### **Enhanced "How It Works" Sections**

#### **Coast FIRE:**
```
• Save aggressively until coast target reached
• Switch to lower-stress, lower-paying work
• Portfolio grows without additional contributions  
• Achieve full FIRE at traditional retirement age
• Ideal for: Career changes, family time, reduced stress
```

#### **Barista FIRE:**
```
• Reach portfolio target that covers most expenses
• Begin 4% withdrawals from portfolio
• Supplement with part-time/low-stress work
• Work is optional and flexible
• Ideal for: Phased retirement, maintaining purpose
```

#### **Regular FIRE:**
```
• Save until portfolio covers 100% of expenses
• Complete work cessation upon reaching target
• Live entirely on 4% portfolio withdrawals
• Full financial independence achieved
• Ideal for: Complete retirement, pursuing passions
```

## Implementation Priority

### **Phase 1: Fix Calculations**
1. Update Coast FIRE math to show three phases
2. Fix Barista FIRE to show portfolio + part-time income
3. Ensure Regular FIRE shows 4% withdrawal behavior

### **Phase 2: Update UI**
1. Add strategy-specific details to input panel
2. Update "How It Works" explanations
3. Improve timeline markers on charts

### **Phase 3: Chart Enhancements**
1. Add multiple milestone lines where appropriate
2. Show realistic post-milestone portfolio behavior
3. Add phase labels (accumulation, coasting, retirement)

## Expected Outcomes

### **Before Fix:**
- Confusing and unrealistic scenarios
- Barista FIRE shows immediate retirement
- Coast FIRE shows unrealistic growth
- Users don't understand the strategies

### **After Fix:**
- Realistic timelines and numbers
- Clear phase transitions
- Educational value about different FIRE approaches
- Actionable strategies users can implement

## Testing Scenarios

### **Coast FIRE Test:**
- Age 25 → Coast at 30 → Retire at 55
- Should show: aggressive saving, then flat earning, then retirement

### **Barista FIRE Test:**  
- Age 28 → Semi-retire at 35 → Optional full retirement at 67
- Should show: portfolio withdrawals + part-time income

### **Regular FIRE Test:**
- Age 25 → Retire at 40
- Should show: portfolio withdrawals covering all expenses

---

**Created:** 2025-01-24  
**Status:** Planning  
**Priority:** High  
**Estimated Effort:** 4-6 hours  
**Dependencies:** None