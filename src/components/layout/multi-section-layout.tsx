import { ReactNode } from "react";

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
  const heroGradientClass = `
    bg-gradient-to-b
    from-background from-0%
    via-background via-70%
    via-rose-600/30 dark:via-rose-500/20 via-85%
    to-rose-600/45 dark:to-rose-500/30 to-100%
  `;

  const fireScenariosGradientClass = `bg-rose-600/45 dark:bg-rose-500/30`;

  return (
    <>
      {/* Hero Section */}
      <section className={`relative ${className}`} aria-label="Hero Section">
        <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] py-12 sm:py-16 md:py-20">
          <div
            className={`absolute inset-0 ${heroGradientClass}`}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] py-12 sm:py-16 md:py-20">
          <div
            className={`absolute inset-0 ${fireScenariosGradientClass}`}
            aria-hidden="true"
          />
          <div className="relative z-10 px-2 sm:px-4 md:px-6 xl:px-10 3xl:px-20">
            <div className="w-full">
              <div className="text-center xl:text-left">{fireScenarios}</div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom shadow */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <div className="h-24 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 dark:from-black/50 via-black/10 dark:via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20 dark:bg-black/40" />
        </div>
      </section>

      {/* AI Copilot Section */}
      <section
        id="ai-copilot"
        className="relative"
        aria-label="AI Copilot Section"
      >
        {aiCopilot}
      </section>
    </>
  );
}
