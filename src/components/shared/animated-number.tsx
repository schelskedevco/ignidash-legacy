"use client";

import { useAnimatedNumber } from "@/lib/hooks/useAnimatedNumber";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 500,
}: AnimatedNumberProps) {
  const displayValue = useAnimatedNumber(value, { duration });

  return (
    <span aria-live="polite">
      {prefix}
      {Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
}
