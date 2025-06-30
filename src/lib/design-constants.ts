/**
 * Design system constants for consistent Tailwind class usage
 *
 * This file centralizes core design patterns that are shared across
 * the Ignidash application for optimal consistency and maintainability.
 */

// Icon sizes used throughout the application
export const ICON_SIZES = {
  sm: "h-4 w-4",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "3xl": "h-16 w-16",
} as const;

// Button icon size (standardized across all buttons)
export const BUTTON_ICON_SIZE = "h-4 w-4";

// Logo size (standardized across app)
export const LOGO_SIZE = "h-8 w-8";

// Common spacing patterns - responsive and widely used
export const SPACING = {
  container: "px-4 sm:px-6 lg:px-8",
  sectionVertical: "py-12 sm:py-16 md:py-20",
  sectionVerticalLg: "py-16 sm:py-20 md:py-24 lg:py-28",
  sectionVerticalSm: "py-6 sm:py-8",
  elementSpacing: "space-y-2 sm:space-y-4 lg:space-y-6",
} as const;

// Card border radius (primary pattern)
export const CARD_BORDER_RADIUS = "rounded-lg";

// Gradient patterns used across the app
export const GRADIENTS = {
  primaryReverse: "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500",
  text: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent",
  textReverse:
    "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 dark:from-pink-400 dark:via-red-400 dark:to-orange-400 bg-clip-text text-transparent",
} as const;

// Background gradient variants for sections
export const BACKGROUND_GRADIENTS = {
  subtleRose: `
    bg-gradient-to-b
    from-background from-0%
    via-rose-100/50 via-70%
    to-rose-200/60 to-100%
    dark:via-rose-400/40 dark:to-rose-400/50
  `,
  warmRose: `
    bg-gradient-to-b
    from-rose-200/60 from-0%
    via-rose-300/70 via-70%
    to-rose-500/70 to-100%
    dark:from-rose-400/50 dark:via-rose-500/60 dark:to-rose-500/70
  `,
  coolPurple: `
    bg-gradient-to-b
    from-background from-0%
    via-purple-100/50 via-70%
    to-indigo-200/60 to-100%
    dark:via-purple-400/40 dark:to-indigo-400/50
  `,
  freshMint: `
    bg-gradient-to-b
    from-background from-0%
    via-teal-100/50 via-70%
    to-emerald-200/60 to-100%
    dark:from-background dark:via-teal-900/20 dark:to-emerald-900/30
  `,
} as const;

// Focus state for links (primary interactive pattern)
export const LINK_FOCUS_STATE =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm";

// Responsive typography patterns (following HeroSection approach)
export const TYPOGRAPHY = {
  heroTitle: "text-5xl font-bold md:text-7xl",
  heroSubtitle: "text-xl leading-relaxed md:text-2xl",
  alignment: "text-center xl:text-left",
} as const;

// Max width patterns - responsive and widely used
export const MAX_WIDTHS = {
  container: "max-w-7xl",
  content: "max-w-sm md:max-w-2xl lg:max-w-3xl",
  xs: "max-w-xs",
} as const;

// Sheet width for mobile navigation - full width responsive
export const SHEET_WIDTH = "w-full";

// Type exports for TypeScript support
export type IconSize = keyof typeof ICON_SIZES;
export type BackgroundGradient = keyof typeof BACKGROUND_GRADIENTS;
export type MaxWidth = keyof typeof MAX_WIDTHS;
export type SpacingPattern = keyof typeof SPACING;
export type GradientPattern = keyof typeof GRADIENTS;
export type TypographyPattern = keyof typeof TYPOGRAPHY;
