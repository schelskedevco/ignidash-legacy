interface GradientBackgroundProps {
  variant: "subtleRose" | "warmRose";
  className?: string;
}

export function GradientBackground({
  variant,
  className = "",
}: GradientBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${
        variant === "subtleRose"
          ? "from-background bg-gradient-to-b from-0% via-rose-100/50 via-70% to-rose-200/60 to-100% dark:via-rose-400/10 dark:to-rose-400/20"
          : "bg-gradient-to-b from-rose-200/60 from-0% via-rose-300/70 via-70% to-rose-500/70 to-100% dark:from-rose-400/20 dark:via-rose-500/30 dark:to-rose-500/50"
      } ${className}`}
      aria-hidden="true"
    />
  );
}
