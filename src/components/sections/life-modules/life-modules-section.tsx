"use client";

import { Compass } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";

export function LifeModulesSection() {
  return (
    <SectionWrapper
      header={
        <SectionHeader
          icon={Compass}
          title="Play Out Your What-Ifs"
          description="Drag and drop life events onto your timeline. Kids, time off, career pivots, big purchases—instantly see how each decision shifts your financial future."
        />
      }
    >
      {null}
    </SectionWrapper>
  );
}
