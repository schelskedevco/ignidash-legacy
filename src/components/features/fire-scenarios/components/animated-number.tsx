"use client";

import { useState, useEffect, useRef } from "react";

// Custom hook to detect reduced motion preference
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

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
  const [displayValue, setDisplayValue] = useState(0);
  const startValueRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || value === startValueRef.current) {
      setDisplayValue(value);
      startValueRef.current = value;
      return;
    }

    const startTime = Date.now();
    const startValue = startValueRef.current;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (value - startValue) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        startValueRef.current = value;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration, prefersReducedMotion]);

  return (
    <span aria-live="polite">
      {prefix}
      {Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
}
