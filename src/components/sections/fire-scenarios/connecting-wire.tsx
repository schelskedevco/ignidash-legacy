export function ConnectingWire() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Horizontal wire for lg+ screens */}
      <div className="hidden h-20 w-20 items-center justify-center lg:flex">
        <svg
          viewBox="0 0 120 80"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="wireGradientH" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 H30 V55 H60 V25 H120"
            stroke="url(#wireGradientH)"
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
      <div className="flex h-20 w-16 items-center justify-center lg:hidden">
        <svg
          viewBox="0 0 80 120"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="wireGradientV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <path
            d="M40,0 V30 H25 V60 H55 V120"
            stroke="url(#wireGradientV)"
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
