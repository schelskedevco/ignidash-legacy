"use client";

import { useState } from "react";
import { Copy, Check, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GrowthChart } from "@/components/features/fire-scenarios/components/financial-outputs/growth-chart";
import { SCENARIOS } from "@/components/features/fire-scenarios/data";
import {
  calculateProjections,
  generateGrowthData,
} from "@/components/features/fire-scenarios/utils";
import { type BaristaFireOutputs } from "@/components/features/fire-scenarios/types";

export function MockBrowser() {
  const [copied, setCopied] = useState(false);

  // Use the Sabbatical Barista scenario for the demo
  const scenario = SCENARIOS[2]; // Sabbatical Barista scenario
  const outputs = calculateProjections(scenario);
  const growthData = generateGrowthData(scenario, outputs);

  // Cast outputs to get specific barista fire values
  const baristaOutputs = outputs as BaristaFireOutputs;
  const yearsToFire = Math.round(
    baristaOutputs.baristaFireAge - scenario.inputs.age
  );

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="hover:border-primary/30 w-full max-w-md shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center gap-2 border-b">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-4 min-w-0 flex-1">
          <div className="bg-muted flex items-center gap-2 rounded-md px-3 py-1.5 text-sm">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <span className="truncate font-mono">
              ignidash.com/p/barista-fire-journey
            </span>
          </div>
        </div>
      </CardHeader>

      {/* Page Content */}
      <CardContent className="space-y-6">
        {/* Social Media Preview Card */}
        <Card className="border-primary/50 bg-accent p-4">
          {/* Mini Chart */}
          <span className="sr-only">
            Portfolio growth chart showing {scenario.subtitle} scenario reaching
            FIRE at age {Math.round(baristaOutputs.baristaFireAge)}
          </span>
          <GrowthChart
            data={growthData}
            outputs={outputs}
            scenario={scenario}
            thumbnailMode={true}
          />

          {/* Content Section */}
          <div className="space-y-3 text-left">
            <h3 className="text-xl font-semibold tracking-tight">
              {scenario.subtitle} — FIRE at{" "}
              {Math.round(baristaOutputs.baristaFireAge)}
            </h3>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-foreground font-medium">
                  {scenario.inputs.age} →{" "}
                  {Math.round(baristaOutputs.baristaFireAge)}
                </span>
                <span className="text-muted-foreground/60 mx-1.5">•</span>
                <span className="tabular-nums">{yearsToFire} years</span>
                <span className="text-muted-foreground/60 mx-1.5">•</span>
                <span className="tabular-nums">
                  ${(scenario.inputs.annualIncome / 1000).toFixed(0)}K income
                </span>
                <span className="text-muted-foreground/60 mx-1.5">•</span>
                <span className="tabular-nums">
                  ${(scenario.inputs.annualExpenses / 1000).toFixed(0)}K
                  expenses
                </span>
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-foreground font-medium tabular-nums">
                  ${(baristaOutputs.baristaFireNumber / 1000000).toFixed(2)}M
                  target
                </span>
                <span className="text-muted-foreground/60 mx-1.5">•</span>
                Part-time work covers expenses
              </p>
            </div>

            <p className="text-muted-foreground/80 pt-2 text-xs leading-relaxed">
              Track your path to financial independence with Ignidash{" "}
              <span className="inline-block">
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </p>
          </div>
        </Card>

        {/* Copy Link Section */}
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            aria-label="Copy shareable link to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
