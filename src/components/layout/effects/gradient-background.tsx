interface GradientBackgroundProps {
  variant: "hero" | "fireScenarios" | "aiCopilot";
  className?: string;
}

const GRADIENT_VARIANTS = {
  hero: `
    bg-gradient-to-b
    from-background from-0%
    via-rose-100/50 via-70%
    to-rose-200/60 to-100%
    dark:via-rose-400/40 dark:to-rose-400/50
  `,
  fireScenarios: `
    bg-gradient-to-b
    from-rose-200/60 from-0%
    via-rose-300/70 via-70%
    to-rose-500/70 to-100%
    dark:from-rose-400/50 dark:via-rose-500/60 dark:to-rose-500/70
  `,
  aiCopilot: `
    bg-gradient-to-b
    from-background from-0%
    via-purple-100/50 via-70%
    to-indigo-200/60 to-100%
    dark:via-purple-400/40 dark:to-indigo-400/50
  `,
};

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
