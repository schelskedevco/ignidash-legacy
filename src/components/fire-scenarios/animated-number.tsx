"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startValueRef = useRef(0);

  useEffect(() => {
    const duration = 500;
    const startTime = Date.now();
    const startValue = startValueRef.current;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (value - startValue) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        startValueRef.current = value;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <>
      {prefix}
      {Math.round(displayValue).toLocaleString()}
      {suffix}
    </>
  );
}
