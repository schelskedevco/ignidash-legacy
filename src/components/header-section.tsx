import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface HeaderSectionProps {
  heroSection: ReactNode;
  fireScenarios: ReactNode;
  className?: string;
}

export function HeaderSection({
  heroSection,
  fireScenarios,
  className = "",
}: HeaderSectionProps) {
  // Hero section gets the gradient background (pattern 0)
  const heroGradientClass = `
    bg-gradient-to-b
    from-background from-0%
    via-background via-70%
    via-rose-600/30 dark:via-rose-500/20 via-85%
    to-rose-600/45 dark:to-rose-500/30 to-100%
  `;

  // Fire scenarios section gets solid rose background (pattern 1)
  const fireScenariosGradientClass = `bg-rose-600/45 dark:bg-rose-500/30`;

  return (
    <>
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden ${className}`}
        aria-label="Hero Section"
      >
        <div className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] py-16 sm:py-20 md:py-24">
          <div
            className={`absolute inset-0 ${heroGradientClass}`}
            aria-hidden="true"
          />
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="text-center xl:text-left">{heroSection}</div>
          </div>
          <a
            href="#fire-scenarios"
            className="absolute bottom-0 sm:bottom-16 left-0 right-0 flex justify-center translate-y-1/2 m-4 group"
            aria-label="Scroll to FIRE scenarios section"
          >
            <ChevronDown
              className="h-12 w-12 animate-bounce text-white/70 group-hover:text-white transition-colors"
              aria-hidden="true"
            />
            <span className="sr-only">
              Scroll down to explore FIRE scenarios
            </span>
          </a>
        </div>
      </section>

      {/* Fire Scenarios Section */}
      <section
        id="fire-scenarios"
        className={`relative overflow-hidden ${className}`}
        aria-label="Fire Scenarios Section"
      >
        <div className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] py-16 sm:py-20 md:py-24">
          <div
            className={`absolute inset-0 ${fireScenariosGradientClass}`}
            aria-hidden="true"
          />
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="text-center xl:text-left">{fireScenarios}</div>
          </div>
        </div>
        {/* Enhanced bottom shadow with multiple layers for depth */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          {/* Primary shadow layer - larger and more prominent */}
          <div className="h-24 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
          {/* Secondary shadow layer - adds depth */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 dark:from-black/50 via-black/10 dark:via-black/20 to-transparent" />
          {/* Edge highlight for definition */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20 dark:bg-black/40" />
        </div>
      </section>
    </>
  );
}
