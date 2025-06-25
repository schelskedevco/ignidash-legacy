import { WandSparkles } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";

export function AICopilotSection() {
  return (
    <section className="py-24 sm:py-32 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={WandSparkles}
          title="Your AI Financial Copilot"
          description="Get personalized insights that understand your unique situation. Ask questions, explore scenarios, and make confident decisions about your financial future."
        />
      </div>
    </section>
  );
}
