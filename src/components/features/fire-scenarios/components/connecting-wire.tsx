"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ConnectingWireProps {
  className?: string;
  placement: "top" | "bottom";
}

// Constants for consistent calculations
const WIRE_COUNT = 4;
const WIRE_SPACING = -20; // Negative for stacking effect
const BASE_VERTICAL_OFFSET = 80; // Base Y position for vertical segment
const VERTICAL_RISE_STEP = 20; // Height difference between wires
const VIEWBOX_X = -70; // Account for negative wire positions
const VIEWBOX_Y = 0;
const VIEWBOX_WIDTH = 250; // Extended to show wires reaching out
const VIEWBOX_HEIGHT = 120;
const WIRE_END_X = 180; // Where wires extend to

const getWireColors = (isDark: boolean) => ({
  gradientStart: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
  gradientEnd: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
  sparkFill: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
});

function WireSvgDefs({
  placement,
  colors,
}: {
  placement: string;
  colors: ReturnType<typeof getWireColors>;
}) {
  const uniqueId = `wire-${placement}`;

  return (
    <defs>
      {/* Single gradient for all wires in this theme */}
      <linearGradient id={`${uniqueId}-gradient`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.gradientStart} />
        <stop offset="100%" stopColor={colors.gradientEnd} />
      </linearGradient>

      {/* Individual spark glows for each wire */}
      {Array.from({ length: WIRE_COUNT }).map((_, i) => {
        const sparkGlowId = `${uniqueId}-sparkGlow-${i}`;

        return (
          <filter key={i} id={sparkGlowId}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        );
      })}
    </defs>
  );
}

function SparkAnimation({
  pathId,
  sparkDuration,
  sparkDelay,
  colors,
  sparkGlowId,
}: {
  pathId: string;
  sparkDuration: number;
  sparkDelay: number;
  colors: ReturnType<typeof getWireColors>;
  sparkGlowId: string;
}) {
  return (
    <circle r="3" fill={colors.sparkFill} filter={`url(#${sparkGlowId})`}>
      <animateMotion
        dur={`${sparkDuration}s`}
        repeatCount="indefinite"
        begin={`${sparkDelay}s`}
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0;1;1;0"
        dur={`${sparkDuration}s`}
        repeatCount="indefinite"
        begin={`${sparkDelay}s`}
      />
      <animate
        attributeName="r"
        values="2;3;4;3;2"
        dur={`${sparkDuration}s`}
        repeatCount="indefinite"
        begin={`${sparkDelay}s`}
      />
    </circle>
  );
}

export function ConnectingWire({
  className = "",
  placement,
}: ConnectingWireProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const colors = getWireColors(isDark);
  const uniqueId = `wire-${placement}`;

  return (
    <div className={`relative hidden sm:flex ${className}`}>
      <div className="z-40 hidden h-20 w-36 overflow-visible lg:flex">
        <svg
          viewBox={`${VIEWBOX_X} ${VIEWBOX_Y} ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-full w-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-hidden="true"
        >
          <WireSvgDefs placement={placement} colors={colors} />

          {Array.from({ length: WIRE_COUNT }).map((_, i) => {
            const wireX = i * WIRE_SPACING;
            const verticalLength =
              BASE_VERTICAL_OFFSET - i * VERTICAL_RISE_STEP;
            const pathId = `${uniqueId}-path-${i}`;
            const gradientId = `${uniqueId}-gradient`;
            const sparkGlowId = `${uniqueId}-sparkGlow-${i}`;

            // Generate path based on placement
            let pathData: string;
            if (placement === "top") {
              // Start from bottom (VIEWBOX_HEIGHT), go up, then right
              const endY = VIEWBOX_HEIGHT - verticalLength;
              pathData = `M ${wireX},${VIEWBOX_HEIGHT} L ${wireX},${endY} L ${WIRE_END_X},${endY}`;
            } else {
              // Start from top (0), go down, then right
              pathData = `M ${wireX},0 L ${wireX},${verticalLength} L ${WIRE_END_X},${verticalLength}`;
            }

            return (
              <React.Fragment key={i}>
                <path
                  id={pathId}
                  d={pathData}
                  stroke={`url(#${gradientId})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="12 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-36"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
                <SparkAnimation
                  pathId={pathId}
                  sparkDuration={2}
                  sparkDelay={i * 0.5}
                  colors={colors}
                  sparkGlowId={sparkGlowId}
                />
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
