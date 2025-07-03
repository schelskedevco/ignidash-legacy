"use client";

import React, { useEffect, useState, memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils/cn";

interface LifeEventCarouselProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const LifeEventCarousel = memo(function LifeEventCarousel({
  children,
  className,
}: LifeEventCarouselProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Gradient fade masks - positioned to match card content area */}
      <div
        className="from-background pointer-events-none absolute top-2 left-0 z-10 h-[calc(100%-1rem)] w-16 bg-gradient-to-r to-transparent"
        aria-hidden="true"
      />
      <div
        className="from-background pointer-events-none absolute top-2 right-0 z-10 h-[calc(100%-1rem)] w-16 bg-gradient-to-l to-transparent"
        aria-hidden="true"
      />

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={
          prefersReducedMotion
            ? []
            : [
                AutoScroll({
                  speed: 1,
                  stopOnMouseEnter: true,
                  stopOnInteraction: false,
                  stopOnFocusIn: false, // Don't stop on focus to avoid drag conflicts
                  startDelay: 0,
                }),
              ]
        }
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {React.Children.map(children, (child, index) => (
            <CarouselItem key={index} className="basis-auto pl-2 md:pl-4">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
});
