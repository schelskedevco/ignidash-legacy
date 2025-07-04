// Gradient definitions for FIRE app rose theme
const GRADIENT_VARIANTS = {
  // Primary gradient - fully responsive with max size cap
  primary:
    "bg-radial-[ellipse_600px_400px_at_center] from-rose-200 to-transparent dark:from-rose-950/70 dark:to-transparent",

  // Hero gradient - smaller, concentrated at top
  hero: "bg-radial-[circle_350px_at_50%_0%] from-rose-200/90 to-transparent dark:from-rose-950/60 dark:to-transparent",

  // Footer gradient - smaller, concentrated at bottom
  footer:
    "bg-radial-[circle_350px_at_50%_100%] from-rose-200/90 to-transparent dark:from-rose-950/60 dark:to-transparent",
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
