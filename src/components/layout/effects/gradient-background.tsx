// Gradient definitions for FIRE app rose theme
const GRADIENT_VARIANTS = {
  // Primary gradient - top to bottom
  primary:
    "bg-gradient-to-b from-rose-200/50 to-transparent dark:from-rose-950/40 dark:to-transparent",

  // Primary gradient reversed - bottom to top
  primaryReverse:
    "bg-gradient-to-t from-rose-200/50 to-transparent dark:from-rose-950/40 dark:to-transparent",

  // Hero gradient - concentrated at top
  hero: "bg-gradient-to-b from-rose-200/60 via-rose-100/25 to-transparent dark:from-rose-950/50 dark:via-rose-950/20 dark:to-transparent",

  // Footer gradient - bottom to top
  footer:
    "bg-gradient-to-t from-rose-200/60 via-rose-100/25 to-transparent dark:from-rose-950/50 dark:via-rose-950/20 dark:to-transparent",
} as const;

export type GradientVariant = keyof typeof GRADIENT_VARIANTS;

interface GradientBackgroundProps {
  variant: GradientVariant;
  className?: string;
}

export function GradientBackground({
  variant,
  className = "",
}: GradientBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${GRADIENT_VARIANTS[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}
