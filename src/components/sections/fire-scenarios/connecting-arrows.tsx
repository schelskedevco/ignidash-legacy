import Image from "next/image";
import { useEffect, useState } from "react";

interface ConnectingArrowsProps {
  count?: number;
  selectedScenario?: string;
}

export function ConnectingArrows({
  count = 3,
  selectedScenario,
}: ConnectingArrowsProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedScenario) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [selectedScenario]);

  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 hover:opacity-100 hover:scale-125 cursor-pointer ${
              isAnimating ? "opacity-100 scale-125" : "opacity-60"
            }`}
          >
            <Image
              src="/right-arrow-outline-svgrepo-com.svg"
              alt="Arrow connecting financial inputs to outputs"
              width={48}
              height={48}
              className={`arrow-flow-${index} dark:invert`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
