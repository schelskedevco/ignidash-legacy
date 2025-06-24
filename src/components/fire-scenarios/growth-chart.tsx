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
import { GrowthDataPoint, Projections } from "./types";

interface GrowthChartProps {
  data: GrowthDataPoint[];
  projections: Projections;
}

const chartConfig = {
  portfolio: {
    label: "Portfolio Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function GrowthChart({ data, projections }: GrowthChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter data points for mobile to reduce clutter
  const chartData = isMobile
    ? data.filter((_, index) => index % 2 === 0 || index === data.length - 1)
    : data;

  // Responsive configurations
  const margin = isMobile
    ? { top: 10, right: 10, left: 20, bottom: 20 }
    : { top: 20, right: 20, left: 40, bottom: 40 };

  const fontSize = isMobile ? 10 : 12;
  const xAxisInterval = isMobile ? 1 : 0;

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[250px] sm:h-[320px] md:h-[400px]"
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
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="portfolio"
          stroke="hsl(var(--chart-1))"
          fillOpacity={1}
          fill="url(#colorPortfolio)"
          strokeWidth={isMobile ? 1.5 : 2}
        />
        <ReferenceLine
          y={projections.fireNumber}
          stroke="hsl(var(--destructive))"
          strokeDasharray="5 5"
        />
      </AreaChart>
    </ChartContainer>
  );
}
