import { Compass } from "lucide-react";
import { ProductPageSectionHeader } from "@/components/layout/wrappers/product-page-section-header";
import { ProductPageSection } from "@/components/layout/wrappers/product-page-section";
import { LifeEventCarousel } from "./life-event-carousel";
import { LifeEventCard } from "./life-event-card";
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
    title: "Have a Child",
    options: [
      { label: "Basic Needs", cost: 233000 },
      { label: "With College Fund", cost: 350000 },
      { label: "Premium Education", cost: 500000 },
    ],
  },
  {
    id: "buy-car",
    title: "Buy a Car",
    options: [
      { label: "Used Reliable", cost: 15000 },
      { label: "New Mid-Range", cost: 35000 },
      { label: "Luxury Vehicle", cost: 65000 },
    ],
  },
  {
    id: "sabbatical",
    title: "Take Sabbatical",
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
    title: "Buy Investment Property",
    options: [
      { label: "Small Rental", cost: 150000 },
      { label: "Multi-Family", cost: 350000 },
      { label: "Commercial Space", cost: 750000 },
    ],
  },
];

export function LifeModulesSection() {
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
          />
        ))}
      </LifeEventCarousel>
    </ProductPageSection>
  );
}
