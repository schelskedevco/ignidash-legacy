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
          title="Your AI Financial Copilot"
          description="Get personalized insights that understand your unique situation. Ask questions, explore scenarios, and make confident decisions about your financial future."
        />
      }
    >
      <AICopilotDemo />
    </SectionWrapper>
  );
}
