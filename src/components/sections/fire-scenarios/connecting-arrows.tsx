import Image from "next/image";

interface ConnectingArrowsProps {
  count?: number;
}

export function ConnectingArrows({ count = 3 }: ConnectingArrowsProps) {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <Image
            key={index}
            src="/right-arrow-outline-svgrepo-com.svg"
            alt="Arrow connecting financial inputs to outputs"
            width={48}
            height={48}
            className="opacity-60 animate-pulse dark:invert"
          />
        ))}
      </div>
    </div>
  );
}
