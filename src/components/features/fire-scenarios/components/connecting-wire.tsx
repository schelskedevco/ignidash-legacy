"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ConnectingWireProps {
  className?: string;
  idx: number;
  variant?: "step" | "tight" | "wide" | "flip" | "lean";
  direction?: "normal" | "reverse";
}

export function ConnectingWire({
  className = "",
  idx,
  variant = "step",
  direction = "normal",
}: ConnectingWireProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a consistent value during SSR and initial client render
  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Shape breakdown: [left, middle, right] all must sum to 120
  const shape: Record<string, [number, number, number]> = {
    step: [30, 30, 60],
    tight: [20, 50, 50],
    wide: [40, 10, 70],
    flip: [50, 40, 30],
    lean: [60, 20, 40],
  };

  const [left, middle, right] = shape[variant] || shape.step;
  const total = left + middle + right;

  // Directional vertical values
  const yStart = 40;
  const yDown = direction === "reverse" ? 25 : 55;
  const yUp = direction === "reverse" ? 55 : 25;

  // Horizontal path (lg+)
  const x1 = left;
  const x2 = left + middle;
  const x3 = total;

  const horizontalPath = `M0,${yStart} H${x1} V${yDown} H${x2} V${yUp} H${x3}`;

  // Vertical path (mobile)
  const y1 = left;
  const y2 = left + middle;
  const y3 = total;

  const xDown = direction === "reverse" ? 25 : 55;
  const xUp = direction === "reverse" ? 55 : 25;

  const verticalPath = `M40,0 V${y1} H${xDown} V${y2} H${xUp} V${y3}`;

  // Randomize spark timing based on idx
  const sparkDelay = (idx * 0.3) % 2;
  const sparkDuration = 2.5 + (idx % 3) * 0.5; // 2.5s to 4s

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Horizontal wire for lg+ screens */}
      <div className="hidden h-16 w-20 items-center justify-center lg:flex">
        <svg
          viewBox={`0 0 ${total} 80`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id={`wireGradientH-${variant}-${direction}-${idx.toString()}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
              />
              <stop
                offset="100%"
                stopColor={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}
              />
            </linearGradient>

            {/* Glow filter for spark */}
            <filter id={`sparkGlow-${idx}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            id={`pathH-${idx}`}
            d={horizontalPath}
            stroke={`url(#wireGradientH-${variant}-${direction}-${idx.toString()})`}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
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

          {/* Electric spark */}
          <circle
            r="3"
            fill={isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}
            filter={`url(#sparkGlow-${idx})`}
          >
            <animateMotion
              dur={`${sparkDuration}s`}
              repeatCount="indefinite"
              begin={`${sparkDelay}s`}
            >
              <mpath href={`#pathH-${idx}`} />
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
        </svg>
      </div>

      {/* Vertical wire for smaller screens */}
      <div className="flex h-20 w-16 items-center justify-center lg:hidden">
        <svg
          viewBox={`0 0 80 ${total}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id={`wireGradientV-${variant}-${direction}-${idx.toString()}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
              />
              <stop
                offset="100%"
                stopColor={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}
              />
            </linearGradient>

            <filter id={`sparkGlowV-${idx}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            id={`pathV-${idx}`}
            d={verticalPath}
            stroke={`url(#wireGradientV-${variant}-${direction}-${idx.toString()})`}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
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

          {/* Electric spark */}
          <circle
            r="3"
            fill={isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}
            filter={`url(#sparkGlowV-${idx})`}
          >
            <animateMotion
              dur={`${sparkDuration}s`}
              repeatCount="indefinite"
              begin={`${sparkDelay}s`}
            >
              <mpath href={`#pathV-${idx}`} />
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
        </svg>
      </div>
    </div>
  );
}
