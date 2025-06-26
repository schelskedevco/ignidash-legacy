import { WandSparkles } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionContainer } from "@/components/layout/section-container";
import { GradientBackground } from "@/components/layout/gradient-background";
import { ContentWrapper } from "@/components/layout/content-wrapper";
import { AICopilotDemo } from "./ai-copilot-demo";

export function AICopilotSection() {
  return (
    <SectionContainer id="ai-copilot" ariaLabel="AI Copilot Section">
      <GradientBackground variant="aiCopilot" />
      <ContentWrapper>
        <SectionWrapper
          header={
            <SectionHeader
              icon={WandSparkles}
              title="Your AI Retirement Advisor"
              description="Get wisdom inspired by the best minds in financial independence, personalized to your exact situation."
            />
          }
        >
          <AICopilotDemo />
        </SectionWrapper>
      </ContentWrapper>
    </SectionContainer>
  );
}
