"use client";

import { useState, useEffect } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import {
  GrowthDataPoint,
  FireOutputs,
  Scenario,
  FireType,
  RegularFireOutputs,
  CoastFireOutputs,
  BaristaFireOutputs,
  CoastFireParameters,
} from "../../lib/fire-types";

interface GrowthChartProps {
  data: GrowthDataPoint[];
  outputs: FireOutputs;
  scenario: Scenario;
}

const chartConfig = {
  portfolio: {
    label: "Portfolio Value",
    color: "#fb7185",
  },
  referenceLine: {
    label: "Reference Line",
    theme: {
      light: "#000000",
      dark: "#FFFFFF",
    },
  },
} satisfies ChartConfig;

export function GrowthChart({ data, outputs, scenario }: GrowthChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Helper to get target retirement age for Coast FIRE
  const getTargetRetirementAge = () => {
    if (scenario.fireType === FireType.COAST_FIRE) {
      const coastParams = scenario.parameters as CoastFireParameters;
      return coastParams.targetRetirementAge;
    }
    return null;
  };

  // Get display values based on fire type
  const getDisplayValues = () => {
    switch (scenario.fireType) {
      case FireType.REGULAR_FIRE: {
        const regularOutputs = outputs as RegularFireOutputs;
        return {
          fireNumber: regularOutputs.fireNumber,
          targetAge: regularOutputs.fireAge,
        };
      }
      case FireType.COAST_FIRE: {
        const coastOutputs = outputs as CoastFireOutputs;
        return {
          fireNumber: coastOutputs.coastFireNumber,
          targetAge: coastOutputs.coastFireAge,
        };
      }
      case FireType.BARISTA_FIRE: {
        const baristaOutputs = outputs as BaristaFireOutputs;
        return {
          fireNumber: baristaOutputs.baristaFireNumber,
          targetAge: baristaOutputs.baristaFireAge,
        };
      }
    }
  };

  const displayValues = getDisplayValues();
  const fireAge = Math.round(displayValues.targetAge);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter data points for mobile to reduce clutter
  // But always ensure the FIRE age point is included
  const chartData = isMobile
    ? data.filter((_, index) => {
        const isEvenIndex = index % 2 === 0;
        const isLastIndex = index === data.length - 1;
        const isFireAgePoint = Math.abs(data[index].age - fireAge) <= 1;
        return isEvenIndex || isLastIndex || isFireAgePoint;
      })
    : data;

  const xAxisInterval = isMobile ? 2 : 1;

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[250px] w-full max-w-full sm:h-[320px] md:h-[400px]"
    >
      <AreaChart
        data={chartData}
        margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
        <XAxis
          dataKey="age"
          tickLine={false}
          axisLine={false}
          interval={xAxisInterval}
        />
        <YAxis tick={true} tickLine={false} axisLine={false} width={0} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => `$${value.toLocaleString()}`}
            />
          }
        />
        <defs>
          <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-portfolio)"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="var(--color-portfolio)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="portfolio"
          stroke="var(--color-portfolio)"
          fillOpacity={1}
          fill="url(#colorPortfolio)"
          strokeWidth={1}
        />
        <ReferenceLine
          x={fireAge}
          stroke="var(--color-referenceLine)"
          strokeDasharray="20 20"
          strokeWidth={1}
          label={{
            value:
              scenario.fireType === FireType.COAST_FIRE
                ? `Coast at ${fireAge}`
                : `FIRE at ${fireAge}`,
            position: "insideBottomLeft",
            style: {
              fontSize: 12,
              fill: "var(--color-referenceLine)",
            },
          }}
        />
        {scenario.fireType === FireType.COAST_FIRE &&
          getTargetRetirementAge() && (
            <ReferenceLine
              x={getTargetRetirementAge()!}
              stroke="var(--color-referenceLine)"
              strokeDasharray="20 20"
              strokeWidth={1}
              label={{
                value: `Full retirement at ${getTargetRetirementAge()}`,
                position: "insideBottomRight",
                style: {
                  fontSize: 12,
                  fill: "var(--color-referenceLine)",
                },
              }}
            />
          )}
      </AreaChart>
    </ChartContainer>
  );
}
