import Image from "next/image";

interface iMessageIconProps {
  size?: number;
  className?: string;
}

export function iMessageIcon({ size = 24, className = "" }: iMessageIconProps) {
  return (
    <Image
      src="/icons8-imessage.svg"
      alt="iMessage"
      width={size}
      height={size}
      className={className}
    />
  );
}
