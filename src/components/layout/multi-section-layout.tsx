import { ReactNode } from "react";

interface MultiSectionLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MultiSectionLayout({
  children,
  className = "",
}: MultiSectionLayoutProps) {
  return <div className={className}>{children}</div>;
}
