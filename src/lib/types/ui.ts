/**
 * Shared UI types used across the application
 */

import { LucideIcon } from "lucide-react";

export interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "lg" | "xl" | "3xl";
  className?: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export interface CardOption<T = unknown> {
  id: string;
  label: string;
  value: T;
  description?: string;
  icon?: LucideIcon;
}

export interface SelectionState<T> {
  selected: T | null;
  onChange: (value: T) => void;
}

export type Status = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  status: Status;
  error: Error | null;
}

export interface ChartDataPoint {
  x: number | string;
  y: number;
  label?: string;
}

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: LucideIcon;
}
