"use client";

import { Compass } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionContainer } from "@/components/layout/section-container";
import { ContentWrapper } from "@/components/layout/content-wrapper";

export function LifeModulesSection() {
  return (
    <SectionContainer id="life-modules" ariaLabel="Life Modules Section">
      <ContentWrapper>
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
      </ContentWrapper>
    </SectionContainer>
  );
}
