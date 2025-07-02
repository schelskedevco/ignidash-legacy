import Image from "next/image";

interface XIconProps {
  size?: number;
  className?: string;
}

export function XIcon({ size = 24, className = "" }: XIconProps) {
  return (
    <Image
      src="/icons8-x.svg"
      alt="X (Twitter)"
      width={size}
      height={size}
      className={className}
    />
  );
}
