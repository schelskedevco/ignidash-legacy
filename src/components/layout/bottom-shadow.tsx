export function BottomShadow() {
  return (
    <div className="pointer-events-none absolute right-0 bottom-0 left-0">
      <div className="h-24 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
      <div className="absolute right-0 bottom-0 left-0 h-12 bg-gradient-to-t from-black/15 via-black/5 to-transparent dark:from-black/25 dark:via-black/10" />
      <div className="absolute right-0 bottom-0 left-0 h-px bg-black/10 dark:bg-black/20" />
    </div>
  );
}
