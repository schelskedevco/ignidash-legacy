# AI Copilot Demo Section Implementation Plan

## Overview

Create a minimalist, animated Q&A demo section that displays one user question at a time with typewriter-animated AI responses, featuring a soft gradient/ambient glow that adapts to the current theme.

## Implementation Steps

### 1. Install Dependencies

- Add `framer-motion` package for smooth animations
- Command: `npm install framer-motion`

### 2. Create Demo Component Structure

Create `/src/components/sections/ai-copilot/ai-copilot-demo.tsx` with:

- Q&A data structure (4 pairs as provided)
- Typewriter animation for AI responses
- Fade in/out transitions between Q&A pairs
- 5-6 second display duration per pair
- Continuous cycling through all pairs
- Ambient glow effect that adapts to light/dark theme

### 3. Update AI Copilot Section

Modify `/src/components/sections/ai-copilot/ai-copilot-section.tsx` to:

- Add the demo component below the section header
- Apply dark background styling for the demo area
- Ensure proper spacing and layout

## Technical Details

### Animation Flow

1. Question fades in (centered)
2. After 0.5s delay, AI response starts typing with typewriter effect
3. Complete Q&A stays visible for 3-4 more seconds
4. Both fade out together
5. Next Q&A pair fades in after 0.5s gap
6. Cycle repeats continuously

### Styling Requirements

- Dark/black background using Tailwind's dark theme classes
- Centered text with generous spacing (py-16 or more)
- Clean, modern typography using the project's font system
- No interactive elements (no buttons, no cards)
- Mobile responsive with proper text sizing
- Soft gradient/ambient glow effect:
  - Light theme: Subtle blue/purple gradient glow
  - Dark theme: Muted amber/orange gradient glow
  - Use CSS radial gradients or blur effects

### Q&A Content

#### Q&A Pair 1

**User:** "If I keep saving $2,800 a month, how much would going part-time at 40 delay my retirement?"

**Copilot:** "Based on your current trajectory, going part-time at 40 would reduce your savings rate by 50% and delay your FIRE age from 45 to 48. You'd still retire early — just with more balance along the way."

#### Q&A Pair 2

**User:** "Can I afford to take a year off if I pause investing but keep my current lifestyle?"

**Copilot:** "Yes — your portfolio is far enough ahead that a one-year pause would only set you back about 7 months. Just make sure you resume saving at your current rate afterward."

#### Q&A Pair 3

**User:** "What happens if I have a second child in 2027 and keep sending both kids to daycare?"

**Copilot:** "That would add roughly $24,000/year in expenses through 2031, pushing your retirement age from 46 to 49. If you increase savings by $600/month starting now, you could still retire at 46."

#### Q&A Pair 4

**User:** "Right now I have $270K invested. Can I still reach FIRE by 43 if I stop saving at 38?"

**Copilot:** "With your current investment balance and projected returns, stopping at 38 still gets you to FIRE by 43 — but just barely. A market downturn could push that back a year or more. Keeping even a small contribution going would give you a better buffer."

## Component Architecture

### AICopilotDemo Component

```typescript
// Key features:
- Use Framer Motion's AnimatePresence for smooth transitions
- useState to track current Q&A index
- useEffect with interval for automatic cycling
- Custom typewriter hook for AI response animation
- Responsive text sizing (text-lg on mobile, text-xl on desktop)
```

### Ambient Glow Implementation

```css
// Radial gradient approach:
- Use absolute positioned div with blur filter
- Radial gradient from center
- Opacity animation synchronized with Q&A transitions
- Theme-aware colors using CSS variables
```

## Files to Create/Modify

1. **Create:** `/src/components/sections/ai-copilot/ai-copilot-demo.tsx`
   - Main demo component with all animation logic

2. **Modify:** `/src/components/sections/ai-copilot/ai-copilot-section.tsx`
   - Import and add AICopilotDemo component
   - Adjust section padding/spacing

3. **Update:** `package.json`
   - Add framer-motion dependency

## Testing Checklist

- [ ] Typewriter animation is smooth and readable
- [ ] Transitions between Q&A pairs are seamless
- [ ] Timing feels natural (not too fast/slow)
- [ ] Ambient glow adapts to theme changes
- [ ] Mobile responsive (text size, spacing)
- [ ] No layout shifts during animations
- [ ] Performance is smooth (60fps animations)
