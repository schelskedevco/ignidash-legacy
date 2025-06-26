import { ReactNode } from "react";
import { SectionContainer } from "./section-container";
import { GradientBackground } from "./gradient-background";
import { ContentWrapper } from "./content-wrapper";
import { TopFade } from "./top-fade";
import { BottomShadow } from "./bottom-shadow";

interface MultiSectionLayoutProps {
  heroSection: ReactNode;
  fireScenarios: ReactNode;
  lifeModules: ReactNode;
  aiCopilot: ReactNode;
  className?: string;
}

export function MultiSectionLayout({
  heroSection,
  fireScenarios,
  lifeModules,
  aiCopilot,
  className = "",
}: MultiSectionLayoutProps) {
  return (
    <>
      {/* Hero Section */}
      <SectionContainer className={className} ariaLabel="Hero Section">
        <GradientBackground variant="hero" />
        <ContentWrapper>{heroSection}</ContentWrapper>
      </SectionContainer>

      {/* Fire Scenarios Section */}
      <SectionContainer
        id="fire-scenarios"
        className={className}
        ariaLabel="Fire Scenarios Section"
      >
        <TopFade />
        <GradientBackground variant="fireScenarios" />
        <ContentWrapper variant="full">{fireScenarios}</ContentWrapper>
        <BottomShadow />
      </SectionContainer>

      {/* Life Modules Section */}
      <SectionContainer
        id="life-modules"
        className={className}
        ariaLabel="Life Modules Section"
      >
        <ContentWrapper>{lifeModules}</ContentWrapper>
      </SectionContainer>

      {/* AI Copilot Section */}
      <SectionContainer
        id="ai-copilot"
        className={className}
        ariaLabel="AI Copilot Section"
      >
        <GradientBackground variant="aiCopilot" />
        <ContentWrapper>{aiCopilot}</ContentWrapper>
      </SectionContainer>
    </>
  );
}
