import { ReactNode } from "react";
import { SPACING, MAX_WIDTHS } from "@/lib/design-constants";

interface MultiSectionLayoutProps {
  heroSection: ReactNode;
  fireScenarios: ReactNode;
  aiCopilot: ReactNode;
  className?: string;
}

export function MultiSectionLayout({
  heroSection,
  fireScenarios,
  aiCopilot,
  className = "",
}: MultiSectionLayoutProps) {
  // Improved gradient: background to light rose
  const heroGradientClass = `
    bg-gradient-to-b
    from-background from-0%
    via-rose-100/50 via-70%
    to-rose-200/60 to-100%
    dark:via-rose-400/40 dark:to-rose-400/50
  `;

  // Improved gradient: soft continuation to deeper rose
  const fireScenariosGradientClass = `
    bg-gradient-to-b
    from-rose-200/60 from-0%
    via-rose-300/70 via-70%
    to-rose-500/70 to-100%
    dark:from-rose-400/50 dark:via-rose-500/60 dark:to-rose-500/70
  `;

  return (
    <>
      {/* Hero Section */}
      <section className={`relative ${className}`} aria-label="Hero Section">
        <div
          className={`relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] ${SPACING.sectionVertical}`}
        >
          <div
            className={`absolute inset-0 ${heroGradientClass}`}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div
              className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}
            >
              <div className="text-center xl:text-left">{heroSection}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fire Scenarios Section */}
      <section
        id="fire-scenarios"
        className={`relative overflow-hidden ${className}`}
        aria-label="Fire Scenarios Section"
      >
        <div
          className={`relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] ${SPACING.sectionVertical}`}
        >
          {/* Soft top fade for seamless visual continuity */}
          <div className="from-background/60 dark:from-background/40 absolute top-0 right-0 left-0 h-24 bg-gradient-to-b via-transparent to-transparent" />

          {/* Main gradient background */}
          <div
            className={`absolute inset-0 ${fireScenariosGradientClass}`}
            aria-hidden="true"
          />

          <div className={`relative z-10 ${SPACING.sectionHorizontal}`}>
            <div className="w-full">
              <div className="text-center xl:text-left">{fireScenarios}</div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom shadow */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0">
          <div className="h-24 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
          <div className="absolute right-0 bottom-0 left-0 h-12 bg-gradient-to-t from-black/15 via-black/5 to-transparent dark:from-black/25 dark:via-black/10" />
          <div className="absolute right-0 bottom-0 left-0 h-px bg-black/10 dark:bg-black/20" />
        </div>
      </section>

      {/* AI Copilot Section */}
      <section
        id="ai-copilot"
        className="relative"
        aria-label="AI Copilot Section"
      >
        <div className={`relative ${SPACING.sectionVertical}`}>{aiCopilot}</div>
      </section>
    </>
  );
}
