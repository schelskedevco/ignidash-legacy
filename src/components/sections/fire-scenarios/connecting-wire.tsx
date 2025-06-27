interface ConnectingWireProps {
  variant?: "step" | "tight" | "wide" | "flip" | "lean";
  direction?: "normal" | "reverse";
}

export function ConnectingWire({
  variant = "step",
  direction = "normal",
}: ConnectingWireProps) {
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

  return (
    <div className="relative flex items-center justify-center">
      {/* Horizontal wire for lg+ screens */}
      <div className="hidden h-20 w-20 items-center justify-center lg:flex">
        <svg
          viewBox={`0 0 ${total} 80`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id={`wireGradientH-${variant}-${direction}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <path
            d={horizontalPath}
            stroke={`url(#wireGradientH-${variant}-${direction})`}
            strokeWidth="3"
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
        </svg>
      </div>

      {/* Vertical wire for smaller screens */}
      <div className="flex h-20 w-20 items-center justify-center lg:hidden">
        <svg
          viewBox={`0 0 80 ${total}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id={`wireGradientV-${variant}-${direction}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <path
            d={verticalPath}
            stroke={`url(#wireGradientV-${variant}-${direction})`}
            strokeWidth="3"
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
        </svg>
      </div>
    </div>
  );
}
