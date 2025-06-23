import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export function Section({ children, index, className = "" }: SectionProps) {
  // Create a 3-section repeating pattern
  const patternIndex = index % 3;

  let gradientClass = "";

  switch (patternIndex) {
    case 0:
      // Section 1: Background color with smooth fade to vibrant Vanguard-style purple at bottom
      gradientClass = `
        bg-gradient-to-b
        from-background from-0%
        via-background via-70%
        via-rose-600/30 dark:via-rose-500/20 via-85%
        to-rose-600/45 dark:to-rose-500/30 to-100%
      `;
      break;

    case 1:
      // Section 2: Strong purple color maintained, fade back to background at bottom
      gradientClass = `
        bg-gradient-to-b
        from-rose-600/45 dark:from-rose-500/30 from-0%
        via-rose-600/45 dark:via-rose-500/30 via-70%
        via-rose-600/30 dark:via-rose-500/20 via-85%
        to-background to-100%
      `;
      break;

    case 2:
      // Section 3: Complete the cycle - strong purple fade transitions
      gradientClass = `
        bg-gradient-to-b
        from-rose-600/45 dark:from-rose-500/30 from-0%
        via-rose-600/30 dark:via-rose-500/20 via-15%
        via-background via-30%
        via-background via-70%
        via-rose-600/30 dark:via-rose-500/20 via-85%
        to-rose-600/45 dark:to-rose-500/30 to-100%
      `;
      break;
  }

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      aria-label={`Section ${index + 1}`}
    >
      {/* Main content container with responsive padding */}
      <div className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] py-16 sm:py-20 md:py-24">
        {/* Background gradient layer */}
        <div
          className={`absolute inset-0 ${gradientClass}`}
          aria-hidden="true"
        />

        {/* Content layer with responsive padding and max-width */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center xl:text-left">{children}</div>
        </div>
      </div>
    </section>
  );
}
