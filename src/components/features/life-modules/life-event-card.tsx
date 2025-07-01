"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/features/fire-scenarios/components/animated-number";
import { cn } from "@/lib/utils";

interface LifeEventOption {
  label: string;
  cost: number;
}

interface LifeEventCardProps {
  id: string;
  title: string;
  options: LifeEventOption[];
  className?: string;
  onSelectionChange?: (option: LifeEventOption | null, index: number) => void;
}

export function LifeEventCard({
  id,
  title,
  options,
  className,
  onSelectionChange,
}: LifeEventCardProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1); // Start with no selection
  const selectedOption =
    selectedOptionIndex >= 0 ? options[selectedOptionIndex] : null;

  // Memoized formatCost function
  const formatCost = useCallback((cost: number) => {
    if (cost >= 1000000) {
      return `$${(cost / 1000000).toFixed(1)}M`;
    } else if (cost >= 1000) {
      return `$${(cost / 1000).toFixed(0)}k`;
    } else {
      return `$${cost}`;
    }
  }, []);

  const handleOptionSelect = (option: LifeEventOption, index: number) => {
    // Toggle selection: if already selected, deselect (return to -1)
    const newIndex = selectedOptionIndex === index ? -1 : index;
    setSelectedOptionIndex(newIndex);

    onSelectionChange?.(newIndex >= 0 ? option : null, newIndex);
  };

  // Guard against empty options
  if (!options || options.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="text-muted-foreground py-8 text-center">
          No options available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "my-2 w-64 border-2 md:w-80",
        "hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
        "motion-safe:hover:scale-102 motion-reduce:hover:scale-100",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="font-heading text-center text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">
          <div className="text-primary mb-1 text-2xl font-bold sm:text-3xl">
            <AnimatedNumber
              value={selectedOption ? selectedOption.cost : 0}
              prefix="$"
            />
          </div>
        </div>

        {options.length > 1 && (
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={`${id}-option-${index}`}
                variant={index === selectedOptionIndex ? "default" : "outline"}
                size="sm"
                className="w-full justify-between text-xs"
                onClick={() => handleOptionSelect(option, index)}
              >
                <span>{option.label}</span>
                <span className="font-semibold">{formatCost(option.cost)}</span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
