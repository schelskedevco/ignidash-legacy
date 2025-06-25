import { Sparkles } from "lucide-react";
import { SectionHeaderIcon } from "@/components/common/section-header-icon";

export function AICopilotSection() {
  return (
    <section className="py-24 sm:py-32 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeaderIcon icon={Sparkles} />
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Your AI Financial Copilot
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized insights that understand your unique situation. Ask
            questions, explore scenarios, and make confident decisions about
            your financial future.
          </p>
        </div>
      </div>
    </section>
  );
}
