export function ConnectingWire() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Horizontal wire for lg+ screens */}
      <div className="hidden h-32 w-48 items-center justify-center lg:flex">
        <svg
          viewBox="0 0 300 100"
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
            d="M0,50 C80,30 220,70 300,50"
            stroke="url(#wireGradientH)"
            strokeWidth="3"
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
      <div className="flex h-48 w-20 items-center justify-center lg:hidden">
        <svg
          viewBox="0 0 100 300"
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
            d="M50,0 C70,50 30,100 50,150 C70,200 30,250 50,300"
            stroke="url(#wireGradientV)"
            strokeWidth="3"
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
