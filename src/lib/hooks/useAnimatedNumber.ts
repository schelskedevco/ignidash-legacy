import { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface UseAnimatedNumberOptions {
  duration?: number;
  easing?: (t: number) => number;
}

const defaultEasing = (t: number) => 1 - Math.pow(1 - t, 4); // easeOutQuart

export function useAnimatedNumber(
  targetValue: number,
  options: UseAnimatedNumberOptions = {}
) {
  const { duration = 500, easing = defaultEasing } = options;
  const [currentValue, setCurrentValue] = useState(targetValue);
  const previousValueRef = useRef(targetValue);
  const animationFrameRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || targetValue === previousValueRef.current) {
      setCurrentValue(targetValue);
      previousValueRef.current = targetValue;
      return;
    }

    const startTime = Date.now();
    const startValue = previousValueRef.current;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easing(progress);
      const current = startValue + (targetValue - startValue) * easedProgress;

      setCurrentValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = targetValue;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration, easing, prefersReducedMotion]);

  return currentValue;
}
