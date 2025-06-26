# Tailwind CSS Development Guidelines for Ignidash

This document outlines the established patterns and best practices for using Tailwind CSS consistently throughout the Ignidash application.

## Design System Overview

Our Tailwind setup uses:

- **Tailwind CSS v4** with modern `@import` syntax
- **shadcn/ui** components with stone theme
- **Design constants** for consistent patterns (`src/lib/design-constants.ts`)
- **CSS utilities** for common patterns (`src/app/globals.css`)
- **Prettier plugin** for automatic class sorting

## Core Principles

1. **Use design constants over hardcoded values**
2. **Prefer CSS utilities for repeated patterns**
3. **Maintain consistent focus states for accessibility**
4. **Follow responsive-first design patterns**
5. **Use semantic color tokens over direct colors**

## Design Constants Usage

Always import and use constants from `@/lib/design-constants.ts`:

```typescript
import {
  ICON_SIZES,
  SPACING,
  FOCUS_STATES,
  MAX_WIDTHS
} from '@/lib/design-constants';

// ✅ Good
<Icon className={ICON_SIZES.lg} />
<div className={SPACING.container}>

// ❌ Avoid
<Icon className="h-6 w-6" />
<div className="px-4 sm:px-6 lg:px-8">
```

### Available Constants

#### Icon Sizes

```typescript
ICON_SIZES = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-10 w-10",
};
```

#### Spacing Patterns

```typescript
SPACING = {
  section: "py-24", // Large section padding
  sectionSm: "py-16", // Smaller section padding
  sectionVertical: "py-12 sm:py-16 md:py-20", // Responsive vertical
  sectionVerticalSm: "py-6 sm:py-8", // Smaller responsive vertical
  container: "px-4 sm:px-6 lg:px-8", // Standard container padding
  sectionHorizontal: "px-2 sm:px-4 md:px-6 xl:px-10 3xl:px-20", // Wide responsive
  cardPadding: "p-6", // Card content padding
  cardPaddingSm: "p-4", // Smaller card padding
  elementSpacing: "space-y-4 sm:space-y-6 lg:space-y-8", // Element spacing
};
```

#### Focus States

```typescript
FOCUS_STATES = {
  button:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  input:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  link: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm",
  interactive:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
};
```

## Design Constants Only

**Important**: This project uses **design constants exclusively** for consistency. All CSS utilities have been removed in favor of TypeScript constants which provide better type safety and IDE support.

## Component Patterns

### Interactive Elements

Always apply proper focus states:

```tsx
// ✅ Links
<Link
  href="/dashboard"
  className={`text-foreground hover:text-primary transition-colors ${FOCUS_STATES.link}`}
>
  Dashboard
</Link>

// ✅ Custom interactive elements
<button
  className={`p-2 rounded-md hover:bg-accent ${FOCUS_STATES.interactive}`}
>
  Click me
</button>
```

### Responsive Design

Use established responsive patterns:

```tsx
// ✅ Container layout
<div className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}>

// ✅ Responsive sections
<section className={SPACING.sectionVertical}>

// ✅ Responsive grids
<div className={RESPONSIVE.grid2}> // grid-cols-1 md:grid-cols-2
```

### Color Usage

Prefer semantic tokens over direct colors:

```tsx
// ✅ Semantic colors
<div className="bg-background text-foreground">
<span className="text-muted-foreground">
<button className="bg-primary text-primary-foreground">

// ❌ Direct colors (avoid unless specific design need)
<div className="bg-white text-black">
<span className="text-gray-500">
```

## Best Practices

### 1. Class Ordering

Classes are automatically sorted by prettier-plugin-tailwindcss:

- Layout properties first
- Spacing and sizing
- Typography
- Colors and backgrounds
- Interactive states

### 2. Responsive Design

- Start with mobile-first approach
- Use consistent breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `3xl:`
- Apply responsive patterns from `RESPONSIVE` constants

### 3. Accessibility

- Always include focus states on interactive elements
- Use `focus-visible:` instead of `focus:` for better UX
- Ensure sufficient color contrast
- Test keyboard navigation

### 4. Performance

- Use the `cn()` utility for conditional classes
- Prefer utilities over custom CSS when possible
- Leverage design constants to reduce bundle size

## File Organization

```
src/
├── lib/
│   └── design-constants.ts    # All design system constants
├── app/
│   └── globals.css           # CSS utilities and base styles
└── components/
    └── ui/                   # shadcn/ui components (don't modify)
```

## Component Development Workflow

1. **Check existing patterns** - Look for similar components first
2. **Use design constants** - Import needed constants
3. **Apply focus states** - Add appropriate `FOCUS_STATES`
4. **Test responsiveness** - Verify mobile and desktop layouts
5. **Run formatter** - `npm run format` to sort classes
6. **Check accessibility** - Test keyboard navigation

## Common Mistakes to Avoid

❌ **Hardcoded sizes and spacing**

```tsx
<Icon className="h-6 w-6" />
<div className="px-4 sm:px-6 lg:px-8">
```

❌ **Missing focus states**

```tsx
<button className="p-2 hover:bg-accent">
```

❌ **Inconsistent responsive patterns**

```tsx
<div className="px-2 md:px-8"> // Non-standard pattern
```

❌ **Direct color usage**

```tsx
<div className="bg-gray-100 text-gray-900">
```

✅ **Correct approach**

```tsx
import { ICON_SIZES, SPACING, FOCUS_STATES } from '@/lib/design-constants';

<Icon className={ICON_SIZES.lg} />
<div className={SPACING.container}>
<button className={`p-2 hover:bg-accent ${FOCUS_STATES.interactive}`}>
<div className="bg-background text-foreground">
```

## Testing and Validation

- **Format check**: `npm run format:check`
- **Lint check**: `npm run lint`
- **Build check**: `npm run build`
- **Manual testing**: Test keyboard navigation and screen readers

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Design Constants Reference](../src/lib/design-constants.ts)
- [Global CSS Utilities](../src/app/globals.css)

## Questions?

When in doubt:

1. Check existing components for patterns
2. Refer to design constants
3. Test for accessibility
4. Ask the team for clarification

---

_This document is maintained alongside the design system. Update it when adding new patterns or constants._
