import { WandSparkles } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { AICopilotDemo } from "./ai-copilot-demo";

export function AICopilotSection() {
  return (
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
  );
}
