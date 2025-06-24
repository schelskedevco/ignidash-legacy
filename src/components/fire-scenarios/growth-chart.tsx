"use client";

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
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[350px] sm:h-[400px] md:h-[500px]"
    >
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, left: 40, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
        <XAxis
          dataKey="age"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
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
          strokeWidth={2}
        />
        <ReferenceLine
          y={projections.fireNumber}
          stroke="hsl(var(--destructive))"
          strokeDasharray="5 5"
          label={{
            value: "FIRE Target",
            position: "right",
            style: { fontSize: 12 },
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
