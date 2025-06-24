"use client";

import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Scenario } from "./types";

interface ScenarioCarouselProps {
  scenarios: Scenario[];
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi) => void;
}

export function ScenarioCarousel({
  scenarios,
  selectedIndex,
  onSelectionChange,
  api,
  setApi,
}: ScenarioCarouselProps) {
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      onSelectionChange(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Set initial selection
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelectionChange]);

  return (
    <div className="max-w-4xl mx-auto px-12">
      <Carousel
        className="w-full"
        opts={{ align: "center", loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <CarouselItem key={index}>
                <div className="p-6">
                  <div
                    className={`mx-auto max-w-md rounded-lg border bg-card text-card-foreground shadow-sm transition-all ${
                      selectedIndex === index ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${scenario.bgColor}`}>
                          <Icon className={`h-8 w-8 ${scenario.color}`} />
                        </div>
                        <div className="flex gap-2">
                          <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                            {scenario.fireType}
                          </span>
                          <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                            {scenario.focusArea}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {scenario.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mt-2">
                        {scenario.subtitle}
                      </p>
                      <p className="text-base leading-relaxed mt-4 mb-4">
                        {scenario.content}
                      </p>
                      <div className="h-px bg-border my-4" />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Current Age:
                          </span>
                          <span className="font-medium">
                            {scenario.inputs.age}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Annual Income:
                          </span>
                          <span className="font-medium">
                            ${scenario.inputs.annualIncome.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Annual Expenses:
                          </span>
                          <span className="font-medium">
                            ${scenario.inputs.annualExpenses.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Current Net Worth:
                          </span>
                          <span className="font-medium">
                            ${scenario.inputs.currentNetWorth.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
