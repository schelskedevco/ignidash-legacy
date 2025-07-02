import Image from "next/image";

interface RedditIconProps {
  size?: number;
  className?: string;
}

export function RedditIcon({ size = 24, className = "" }: RedditIconProps) {
  return (
    <Image
      src="/icons8-reddit.svg"
      alt="Reddit"
      width={size}
      height={size}
      className={className}
    />
  );
}
