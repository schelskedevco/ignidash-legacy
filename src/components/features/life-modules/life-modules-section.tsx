"use client";

import { useState, useCallback } from "react";
import { Compass } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { Separator } from "@/components/ui/separator";
import { LifeEventCarousel } from "./components/life-event-carousel";
import {
  LifeEventCard,
  type LifeEventOption,
} from "./components/life-event-card";
import {
  MAX_WIDTHS,
  TYPOGRAPHY,
  SPACING,
  GRADIENTS,
} from "@/lib/design-constants";
import { AnimatedNumber } from "@/components/features/fire-scenarios/components/animated-number";
import { LifeEventSelection } from "./lib/life-event-types";
import { LIFE_EVENTS, calculateInitialFireAge } from "./lib/life-event-utils";
import { cn } from "@/lib/utils";

const MAX_SELECTIONS = 3;

export function LifeModulesSection() {
  const [selections, setSelections] = useState<Map<string, LifeEventSelection>>(
    new Map()
  );

  const handleSelectionChange = useCallback(
    (cardId: string, option: LifeEventOption | null, optionIndex: number) => {
      setSelections((prev) => {
        const newMap = new Map(prev);
        if (option === null) {
          newMap.delete(cardId);
        } else {
          newMap.set(cardId, {
            eventId: cardId,
            option,
            optionIndex,
          });
        }
        return newMap;
      });
    },
    []
  );

  // Calculate baseline FIRE age
  const fireAge = calculateInitialFireAge();

  // Placeholder for total cost - to be implemented
  const totalCost = 0;

  return (
    <ProductPageSection
      className={`${MAX_WIDTHS.container} ${SPACING.container} ${SPACING.sectionVerticalLg} ${TYPOGRAPHY.alignment} mx-auto`}
      id="life-modules"
      ariaLabel="Life Modules Section"
    >
      <ProductPageSectionHeader
        icon={Compass}
        title={
          <>
            Play Out Your <span className={GRADIENTS.text}>What-Ifs</span>
          </>
        }
        description="See how kids, career changes, time off, and other major decisions affect your financial independence timeline."
      />

      <LifeEventCarousel>
        {LIFE_EVENTS.map((event) => (
          <LifeEventCard
            key={event.id}
            id={event.id}
            title={event.title}
            options={event.options}
            impactType={event.impactType}
            onSelectionChange={(option, index) =>
              handleSelectionChange(event.id, option, index)
            }
            isDisabled={
              selections.size >= MAX_SELECTIONS && !selections.has(event.id)
            }
          />
        ))}
      </LifeEventCarousel>

      {/* FIRE Impact Output Section */}
      <div className="mt-16 text-center">
        <div className="flex flex-col items-center justify-center gap-8 md:h-20 md:flex-row">
          <div>
            <div className="text-primary text-4xl font-bold">
              <AnimatedNumber value={fireAge} />
            </div>
            <div className="text-muted-foreground text-sm">FI Age</div>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="w-24 md:hidden" />

          <div>
            <div
              className={cn(
                "text-4xl font-bold",
                totalCost === 0
                  ? "text-muted-foreground"
                  : totalCost > 0
                    ? "text-red-600 dark:text-red-500"
                    : "text-green-600 dark:text-green-500"
              )}
            >
              {totalCost === 0 ? (
                "—"
              ) : (
                <>
                  {totalCost > 0 ? "-" : "+"}
                  <AnimatedNumber value={Math.abs(totalCost)} prefix="$" />
                </>
              )}
            </div>
            <div className="text-muted-foreground text-sm">Total Impact</div>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="w-24 md:hidden" />

          <div>
            <div className="text-muted-foreground text-4xl font-bold">—</div>
            <div className="text-muted-foreground text-sm">Years Impact</div>
          </div>
        </div>
      </div>
    </ProductPageSection>
  );
}
