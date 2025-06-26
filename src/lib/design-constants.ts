/**
 * Design system constants for consistent Tailwind class usage
 *
 * This file centralizes common design patterns, sizes, and utilities
 * to ensure consistency across the Ignidash application.
 */

// Icon sizes used throughout the application
export const ICON_SIZES = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-10 w-10",
  "3xl": "h-16 w-16",
} as const;

// Button icon sizes for different button variants
export const BUTTON_ICON_SIZES = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

// Logo sizes for different contexts
export const LOGO_SIZES = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
} as const;

// Common spacing patterns
export const SPACING = {
  section: "py-24",
  sectionSm: "py-16",
  sectionVertical: "py-12 sm:py-16 md:py-20",
  sectionVerticalSm: "py-6 sm:py-8",
  container: "px-4 sm:px-6 lg:px-8",
  sectionHorizontal: "px-2 sm:px-4 md:px-6 xl:px-10 3xl:px-20",
  cardPadding: "p-6",
  cardPaddingSm: "p-4",
  elementSpacing: "space-y-4 sm:space-y-6 lg:space-y-8",
  elementSpacingSm: "space-y-2 sm:space-y-3 lg:space-y-4",
} as const;

// Common border radius patterns
export const BORDER_RADIUS = {
  button: "rounded-md",
  card: "rounded-lg",
  input: "rounded-md",
  badge: "rounded-full",
} as const;

// Gradient patterns used across the app
export const GRADIENTS = {
  primary: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
  primaryReverse: "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500",
  text: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent",
} as const;

// Focus states for accessibility
export const FOCUS_STATES = {
  button:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  input:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  link: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm",
  interactive:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
} as const;

// Animation classes for consistent motion
export const ANIMATIONS = {
  fadeIn: "animate-in fade-in duration-200",
  slideIn: "animate-in slide-in-from-bottom-4 duration-300",
  scaleIn: "animate-in zoom-in-95 duration-200",
} as const;

// Responsive breakpoint patterns
export const RESPONSIVE = {
  stack: "flex flex-col sm:flex-row",
  grid2: "grid grid-cols-1 md:grid-cols-2",
  grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  textCenter: "text-center sm:text-left",
  hideOnMobile: "hidden sm:block",
  showOnMobile: "block sm:hidden",
} as const;

// Component size variants
export const COMPONENT_SIZES = {
  button: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  },
  input: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-3",
    lg: "h-12 px-4 text-lg",
  },
  badge: {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-base",
  },
} as const;

// Color patterns for semantic usage
export const SEMANTIC_COLORS = {
  success: "text-green-600 bg-green-50 border-green-200",
  warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
  error: "text-red-600 bg-red-50 border-red-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
} as const;

// Max width patterns
export const MAX_WIDTHS = {
  container: "max-w-7xl",
  content: "max-w-4xl",
  contentSm: "max-w-sm md:max-w-3xl",
  prose: "max-w-prose",
  xs: "max-w-xs",
} as const;

// Type exports for TypeScript support
export type IconSize = keyof typeof ICON_SIZES;
export type ButtonIconSize = keyof typeof BUTTON_ICON_SIZES;
export type LogoSize = keyof typeof LOGO_SIZES;
export type ComponentSize = "sm" | "md" | "lg";
export type SemanticColor = keyof typeof SEMANTIC_COLORS;
