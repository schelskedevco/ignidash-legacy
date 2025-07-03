// Gradient definitions for FIRE app rose theme
const GRADIENT_VARIANTS = {
  // Primary gradient - fully responsive with max size cap
  primary:
    "bg-radial-[circle_400px_at_center] from-rose-100/80 from-0% via-rose-100/80 via-40% via-rose-100/80 via-50% via-rose-100/80 via-60% to-transparent to-100% dark:from-rose-950/40 dark:via-rose-950/40 dark:via-rose-950/40 dark:via-rose-950/40 dark:to-transparent",

  // Hero gradient - smaller, concentrated at top
  hero: "bg-radial-[circle_300px_at_50%_0%] from-rose-100/75 from-0% via-rose-100/75 via-30% to-transparent to-100% dark:from-rose-950/40 dark:via-rose-950/40 dark:to-transparent",

  // Footer gradient - smaller, concentrated at bottom
  footer:
    "bg-radial-[circle_300px_at_50%_100%] from-rose-100/75 from-0% via-rose-100/75 via-30% to-transparent to-100% dark:from-rose-950/40 dark:via-rose-950/40 dark:to-transparent",
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
