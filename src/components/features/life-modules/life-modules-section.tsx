"use client";

import { useState, useCallback } from "react";
import { Compass } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { Separator } from "@/components/ui/separator";
import { LifeEventCarousel } from "./life-event-carousel";
import { LifeEventCard, type LifeEventOption } from "./life-event-card";
import {
  MAX_WIDTHS,
  TYPOGRAPHY,
  SPACING,
  GRADIENTS,
} from "@/lib/design-constants";

// Life events data
const LIFE_EVENTS = [
  {
    id: "have-child",
    title: "Child",
    options: [
      { label: "Basic Needs", cost: 233000 },
      { label: "With College Fund", cost: 350000 },
      { label: "Premium Education", cost: 500000 },
    ],
  },
  {
    id: "buy-car",
    title: "Car",
    options: [
      { label: "Used Reliable", cost: 15000 },
      { label: "New Mid-Range", cost: 35000 },
      { label: "Luxury Vehicle", cost: 65000 },
    ],
  },
  {
    id: "sabbatical",
    title: "Sabbatical",
    options: [
      { label: "3 Months", cost: 15000 },
      { label: "6 Months", cost: 30000 },
      { label: "1 Year", cost: 60000 },
    ],
  },
  {
    id: "home-renovation",
    title: "Home Renovation",
    options: [
      { label: "Kitchen Update", cost: 25000 },
      { label: "Full Remodel", cost: 75000 },
      { label: "Major Addition", cost: 150000 },
    ],
  },
  {
    id: "start-business",
    title: "Start Business",
    options: [
      { label: "Side Hustle", cost: 5000 },
      { label: "Small Business", cost: 50000 },
      { label: "Tech Startup", cost: 200000 },
    ],
  },
  {
    id: "world-travel",
    title: "World Travel",
    options: [
      { label: "Budget Backpacking", cost: 12000 },
      { label: "Comfortable Tour", cost: 35000 },
      { label: "Luxury Journey", cost: 75000 },
    ],
  },
  {
    id: "wedding",
    title: "Wedding",
    options: [
      { label: "Intimate Ceremony", cost: 15000 },
      { label: "Traditional Wedding", cost: 35000 },
      { label: "Dream Wedding", cost: 75000 },
    ],
  },
  {
    id: "investment-property",
    title: "Investment Property",
    options: [
      { label: "Small Rental", cost: 150000 },
      { label: "Multi-Family", cost: 350000 },
      { label: "Commercial Space", cost: 750000 },
    ],
  },
];

export function LifeModulesSection() {
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const MAX_SELECTIONS = 3;

  const handleSelectionChange = useCallback(
    (cardId: string, option: LifeEventOption | null) => {
      setSelectedCards((prev) => {
        const newSet = new Set(prev);
        if (option === null) {
          // Deselection - remove card from set
          newSet.delete(cardId);
        } else {
          // Selection - add card to set
          newSet.add(cardId);
        }
        return newSet;
      });
    },
    []
  );

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
        description="Drag and drop life events onto your timeline. Kids, time off, career pivots, big purchases—instantly see how each decision shifts your financial future."
      />

      <LifeEventCarousel>
        {LIFE_EVENTS.map((event) => (
          <LifeEventCard
            key={event.id}
            id={event.id}
            title={event.title}
            options={event.options}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSelectionChange={(option, index) =>
              handleSelectionChange(event.id, option)
            }
            isDisabled={
              selectedCards.size >= MAX_SELECTIONS &&
              !selectedCards.has(event.id)
            }
          />
        ))}
      </LifeEventCarousel>

      {/* FIRE Impact Output Section */}
      <div className="mt-16 text-center">
        <div className="flex flex-col items-center justify-center gap-8 md:h-20 md:flex-row">
          <div>
            <div className="text-primary text-4xl font-bold">42</div>
            <div className="text-muted-foreground text-sm">FI Age</div>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="w-24 md:hidden" />

          <div>
            <div className="text-4xl font-bold text-green-600">$0</div>
            <div className="text-muted-foreground text-sm">Total Selected</div>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="w-24 md:hidden" />

          <div>
            <div className="text-muted-foreground text-4xl font-bold">—</div>
            <div className="text-muted-foreground text-sm">Years Impact</div>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="w-24 md:hidden" />

          <div>
            <div className="text-muted-foreground text-4xl font-bold">
              $3,200
            </div>
            <div className="text-muted-foreground text-sm">Monthly Savings</div>
          </div>
        </div>
      </div>
    </ProductPageSection>
  );
}
