import { ReactNode } from "react";

interface SectionWrapperProps {
  header: ReactNode;
  children: ReactNode;
}

export function SectionWrapper({ header, children }: SectionWrapperProps) {
  return (
    <>
      {header}

      {/* Main Grid Layout */}
      <div className="w-full px-2 sm:px-4 md:px-6 xl:px-10 3xl:px-20">
        {children}
      </div>
    </>
  );
}
