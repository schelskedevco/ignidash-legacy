// Gradient definitions for FIRE app rose theme
const GRADIENT_VARIANTS = {
  // Primary gradient - used for most sections
  primary:
    "bg-gradient-to-b from-transparent from-0% via-rose-100/80 via-50% to-transparent to-100% dark:from-transparent dark:via-rose-950/40 dark:to-transparent",

  // Hero gradient - fades down from top (opposite of footer)
  hero: "bg-gradient-to-b from-rose-100/75 from-0% via-transparent via-30% to-transparent to-100% dark:from-rose-950/40 dark:via-transparent dark:to-transparent",

  // Footer gradient - fades up from bottom
  footer:
    "bg-gradient-to-t from-rose-100/75 from-0% via-transparent via-30% to-transparent to-100% dark:from-rose-950/40 dark:via-transparent dark:to-transparent",
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
