import {
  BACKGROUND_GRADIENTS,
  BackgroundGradient,
} from "@/lib/constants/design-constants";

interface GradientBackgroundProps {
  variant: BackgroundGradient;
  className?: string;
}

export function GradientBackground({
  variant,
  className = "",
}: GradientBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${BACKGROUND_GRADIENTS[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}
