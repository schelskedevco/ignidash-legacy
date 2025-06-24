# Carousel to Tabs Migration Plan

## Overview

Migrate from carousel-based scenario selection to a side-by-side split view with tabs for better UX and clearer input → output relationship.

## Current State

- Carousel component for scenario selection
- Chart updates based on carousel selection
- Disconnected UX between input and output

## Target State

- Left panel: Tabbed scenario switcher with details
- Right panel: Chart + metrics
- Clear cause-and-effect relationship
- Better responsive design

## Architecture Changes

### New File Structure

```
src/components/fire-scenarios/
├── fire-scenarios-section.tsx     # Main container (updated)
├── scenario-tabs.tsx              # NEW: Left panel with tabs
├── scenario-details.tsx           # NEW: Shows selected scenario info
├── growth-chart.tsx               # KEEP: Right panel chart
├── key-metrics.tsx                # KEEP: Chart metrics
├── types.ts                       # KEEP: Type definitions
├── data.ts                        # KEEP: Scenario data
├── utils.ts                       # KEEP: Calculations
└── animated-number.tsx            # KEEP: Number animations
```

### Files to DELETE

- `scenario-carousel.tsx` (no longer needed)

## shadcn Components Usage

1. **Tabs** - Main scenario switcher (Traditional FIRE, Coast FIRE, Barista FIRE)
2. **Card** - Container for scenario details and chart
3. **Badge** - For fire type and focus area tags
4. **Existing** - Keep current chart, metrics, and utilities

## New Layout Structure

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Left Panel */}
  <Card>
    <Tabs>
      <TabsList>Traditional FIRE | Coast FIRE | Barista FIRE</TabsList>
      <TabsContent>
        <ScenarioDetails scenario={selected} />
      </TabsContent>
    </Tabs>
  </Card>

  {/* Right Panel */}
  <Card>
    <GrowthChart data={chartData} />
    <KeyMetrics projections={projections} />
  </Card>
</div>
```

## Implementation Steps

### Step 1: Install shadcn Tabs

```bash
npx shadcn@latest add tabs
```

### Step 2: Create New Components

- `scenario-tabs.tsx` - Tabs wrapper with state management
- `scenario-details.tsx` - Extract scenario card content from carousel

### Step 3: Update Main Container

- Replace carousel with grid layout
- Connect tab state to chart updates
- Handle responsive design (stack on mobile)

### Step 4: Clean Up

- Remove `scenario-carousel.tsx`
- Remove carousel imports from main component
- Remove unused carousel state management

## State Management Changes

### Current State

```tsx
const [selectedIndex, setSelectedIndex] = useState(0);
const [carouselApi, setCarouselApi] = useState<CarouselApi>();
```

### New State

```tsx
const [selectedScenario, setSelectedScenario] = useState("regular-fire");
// Remove all carousel-related state
```

## Responsive Design

**Desktop (lg+):** Side-by-side grid
**Mobile/Tablet:** Stacked layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
```

## Benefits of This Approach

✅ **Cleaner Code** - Remove carousel complexity  
✅ **Better UX** - Clear input → output flow  
✅ **Mobile Friendly** - Tabs work better than carousel on mobile  
✅ **Faster** - No carousel animation overhead  
✅ **Accessible** - Tabs have better keyboard navigation

## Implementation Order

1. Add shadcn tabs component
2. Create scenario-tabs.tsx (reusing scenario data)
3. Create scenario-details.tsx (extract from carousel)
4. Update fire-scenarios-section.tsx with new layout
5. Test responsiveness and interactions
6. Delete scenario-carousel.tsx
7. Clean up unused imports/state

## Testing Checklist

- [ ] Tabs switch properly between scenarios
- [ ] Chart updates immediately when tab changes
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All scenario data displays correctly
- [ ] Animations and interactions work smoothly
- [ ] No console errors or warnings
- [ ] Accessibility (keyboard navigation, screen readers)

## Rollback Plan

If issues arise:

1. Revert fire-scenarios-section.tsx changes
2. Restore scenario-carousel.tsx
3. Remove new tab components
4. Restore original state management

---

**Created:** 2025-01-24  
**Status:** Planning  
**Priority:** High  
**Estimated Effort:** 2-3 hours
