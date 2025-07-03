"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { cn } from "@/lib/utils/cn";
import { LifeEventOption, LifeEventImpactType } from "../types";
export type { LifeEventOption };

interface LifeEventCardProps {
  id: string;
  title: string;
  options: LifeEventOption[];
  impactType?: LifeEventImpactType;
  className?: string;
  onSelectionChange?: (option: LifeEventOption | null, index: number) => void;
  isDisabled?: boolean;
}

export function LifeEventCard({
  id,
  title,
  options,
  impactType,
  className,
  onSelectionChange,
  isDisabled = false,
}: LifeEventCardProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const selectedOption =
    selectedOptionIndex >= 0 ? options[selectedOptionIndex] : null;

  // Helper function to get badge properties based on impact type
  const getBadgeProps = (type: LifeEventImpactType) => {
    switch (type) {
      case "windfall":
        return {
          variant: "default" as const,
          className:
            "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
          label: "Windfall (+)",
        };
      case "immediate":
        return {
          variant: "destructive" as const,
          className:
            "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
          label: "Immediate Expense (-)",
        };
      case "ongoing":
        return {
          variant: "secondary" as const,
          className:
            "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600",
          label: "Ongoing Expense (-)",
        };
    }
  };

  // Memoized formatAmount function
  const formatAmount = useCallback((amount: number): string => {
    const absAmount = Math.abs(amount);

    if (absAmount >= 1000000) {
      return `$${(absAmount / 1000000).toFixed(1)}M`;
    } else if (absAmount >= 1000) {
      return `$${(absAmount / 1000).toFixed(0)}k`;
    } else {
      return `$${absAmount}`;
    }
  }, []);

  const handleOptionSelect = (option: LifeEventOption, index: number) => {
    const newIndex = selectedOptionIndex === index ? -1 : index;
    setSelectedOptionIndex(newIndex);
    onSelectionChange?.(newIndex >= 0 ? option : null, newIndex);
  };

  // Guard against empty or undefined options
  if (!Array.isArray(options) || options.length === 0) {
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
        "my-2 w-full max-w-xs md:w-80",
        "hover:border-primary/30 border-2",
        "transition-all duration-300 hover:shadow-lg",
        "motion-safe:hover:scale-102 motion-reduce:hover:scale-100",
        className
      )}
    >
      <CardHeader>
        <div className="flex flex-col items-center gap-2">
          <CardTitle className="font-heading text-center text-lg font-semibold">
            {title}
          </CardTitle>
          {impactType && (
            <Badge
              variant={getBadgeProps(impactType).variant}
              className={getBadgeProps(impactType).className}
            >
              {getBadgeProps(impactType).label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">
          <div
            className={cn(
              "mb-1 text-2xl font-bold sm:text-3xl",
              selectedOption?.income
                ? "text-green-600 dark:text-green-500"
                : selectedOption?.cost
                  ? "text-red-600 dark:text-red-500"
                  : "text-muted-foreground"
            )}
            aria-label={
              selectedOption
                ? `Selected: ${selectedOption.income ? "Income" : "Cost"} of ${formatAmount(selectedOption.income || selectedOption.cost || 0)}`
                : "No option selected"
            }
          >
            {selectedOption ? (
              <>
                {selectedOption.income ? "+" : "-"}
                <AnimatedNumber
                  value={selectedOption.income || selectedOption.cost || 0}
                  prefix="$"
                />
              </>
            ) : (
              "—"
            )}
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
                disabled={isDisabled && selectedOptionIndex !== index}
                onClick={() => handleOptionSelect(option, index)}
                aria-pressed={index === selectedOptionIndex}
              >
                <span>{option.label}</span>
                <span className="font-semibold">
                  {formatAmount(option.income || option.cost || 0)}
                </span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
