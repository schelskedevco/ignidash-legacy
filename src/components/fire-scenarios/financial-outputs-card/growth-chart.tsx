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
} from "../shared/fire-types";

interface GrowthChartProps {
  data: GrowthDataPoint[];
  outputs: FireOutputs;
  scenario: Scenario;
}

const chartConfig = {
  portfolio: {
    label: "Portfolio Value",
    theme: {
      light: "#000000",
      dark: "#FFFFFF", // Light gray for dark mode
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
    if (scenario.fireType === FireType.REGULAR_FIRE) {
      const regularOutputs = outputs as RegularFireOutputs;
      return {
        fireNumber: regularOutputs.fireNumber,
        targetAge: regularOutputs.fireAge,
      };
    } else if (scenario.fireType === FireType.COAST_FIRE) {
      const coastOutputs = outputs as CoastFireOutputs;
      return {
        fireNumber: coastOutputs.coastFireNumber,
        targetAge: coastOutputs.coastFireAge,
      };
    } else {
      const baristaOutputs = outputs as BaristaFireOutputs;
      return {
        fireNumber: baristaOutputs.baristaFireNumber,
        targetAge: baristaOutputs.baristaFireAge,
      };
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

  // Responsive configurations
  const margin = { top: 18, right: 18, left: 18, bottom: 18 };

  const fontSize = isMobile ? 10 : 12;
  const xAxisInterval = isMobile ? 2 : 1;

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[250px] sm:h-[320px] md:h-[400px] w-full max-w-full"
    >
      <AreaChart data={chartData} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
        <XAxis
          dataKey="age"
          tick={{ fontSize }}
          tickLine={false}
          axisLine={false}
          interval={xAxisInterval}
        />
        <YAxis
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          tick={{ fontSize }}
          tickLine={false}
          axisLine={false}
          width={isMobile ? 35 : 50}
        />
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
          stroke="#ef4444"
          strokeDasharray="20 20"
          strokeWidth={1}
          label={{
            value:
              scenario.fireType === FireType.COAST_FIRE
                ? `Coast at ${fireAge}`
                : `FIRE at ${fireAge}`,
            position: "top",
            style: { fontSize: isMobile ? 10 : 12, fill: "#ef4444" },
          }}
        />
        {scenario.fireType === FireType.COAST_FIRE &&
          getTargetRetirementAge() && (
            <ReferenceLine
              x={getTargetRetirementAge()!}
              stroke="#10b981"
              strokeDasharray="20 20"
              strokeWidth={1}
              label={{
                value: `Full retirement at ${getTargetRetirementAge()}`,
                position: "top",
                style: { fontSize: isMobile ? 10 : 12, fill: "#10b981" },
              }}
            />
          )}
      </AreaChart>
    </ChartContainer>
  );
}
