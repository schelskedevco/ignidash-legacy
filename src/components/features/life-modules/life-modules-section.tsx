"use client";

import { useState, useCallback, useMemo } from "react";
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
import { LifeEventData, LifeEventSelection } from "./lib/life-event-types";
import {
  calculateFireWithLifeEvents,
  calculateTotalCost,
} from "./lib/life-event-utils";
import { cn } from "@/lib/utils";

// Life events data with impact metadata
const LIFE_EVENTS: LifeEventData[] = [
  {
    id: "buy-car",
    title: "Car",
    impactType: "ongoing",
    durationYears: 5,
    options: [
      { label: "Used Reliable", cost: 15000 },
      { label: "New Mid-Range", cost: 35000 },
      { label: "Luxury Vehicle", cost: 65000 },
    ],
  },
  {
    id: "sabbatical",
    title: "Sabbatical",
    impactType: "immediate",
    options: [
      { label: "3 Months", cost: 15000 },
      { label: "6 Months", cost: 30000 },
      { label: "1 Year", cost: 60000 },
    ],
  },
  {
    id: "home-renovation",
    title: "Home Renovation",
    impactType: "immediate",
    options: [
      { label: "Kitchen Update", cost: 25000 },
      { label: "Full Remodel", cost: 75000 },
      { label: "Major Addition", cost: 150000 },
    ],
  },
  {
    id: "have-child",
    title: "Child",
    impactType: "ongoing",
    durationYears: 18,
    options: [
      { label: "Basic Needs", cost: 233000 },
      { label: "With College Fund", cost: 350000 },
      { label: "Premium Education", cost: 500000 },
    ],
  },
  {
    id: "world-travel",
    title: "World Travel",
    impactType: "immediate",
    options: [
      { label: "Budget Backpacking", cost: 12000 },
      { label: "Comfortable Tour", cost: 35000 },
      { label: "Luxury Journey", cost: 75000 },
    ],
  },
  {
    id: "wedding",
    title: "Wedding",
    impactType: "immediate",
    options: [
      { label: "Intimate Ceremony", cost: 15000 },
      { label: "Traditional Wedding", cost: 35000 },
      { label: "Dream Wedding", cost: 75000 },
    ],
  },
  {
    id: "inheritance",
    title: "Inheritance",
    impactType: "windfall",
    options: [
      { label: "Small Inheritance", income: 50000 },
      { label: "Moderate Inheritance", income: 150000 },
      { label: "Large Inheritance", income: 500000 },
    ],
  },
] as const;

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

  // Calculate FIRE projections with selected life events
  const fireCalculations = useMemo(() => {
    const selectedEvents = Array.from(selections.values());
    return calculateFireWithLifeEvents(LIFE_EVENTS, selectedEvents);
  }, [selections]);

  // Calculate total cost of selections
  const totalCost = useMemo(() => {
    const selectedEvents = Array.from(selections.values());
    return calculateTotalCost(selectedEvents);
  }, [selections]);

  // Calculate properly rounded years impact to avoid "+0.0" display
  const displayYearsImpact = useMemo(() => {
    const impact = fireCalculations.yearsImpact;

    // If the absolute impact is less than 0.5 years, treat as zero
    if (Math.abs(impact) < 0.5) {
      return 0;
    }

    // Otherwise, round to nearest whole number
    return Math.round(impact);
  }, [fireCalculations.yearsImpact]);

  const showYearsImpact = displayYearsImpact !== 0;

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
        description="Select life events to see how each decision impacts your financial independence timeline. Kids, time off, career pivots, big purchases—instantly see how each choice shifts your future."
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
              <AnimatedNumber
                value={Math.round(fireCalculations.adjusted.fireAge)}
              />
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
            <div
              className={cn(
                "text-4xl font-bold",
                !showYearsImpact
                  ? "text-muted-foreground"
                  : displayYearsImpact > 0
                    ? "text-orange-600 dark:text-orange-500"
                    : "text-green-600 dark:text-green-500"
              )}
            >
              {!showYearsImpact ? (
                "—"
              ) : (
                <>
                  {displayYearsImpact > 0 && "+"}
                  <AnimatedNumber value={displayYearsImpact} />
                </>
              )}
            </div>
            <div className="text-muted-foreground text-sm">Years Impact</div>
          </div>
        </div>
      </div>
    </ProductPageSection>
  );
}
