export function HeroSection() {
  return (
    <section className="px-4 py-24 max-w-7xl mx-auto text-left">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl">
        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Design your life.
        </span>
        <br />
        <span className="text-foreground">
          Then plan your FIRE journey around it.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
        Explore retirement timelines, run what-if projections, and get
        AI-powered insights — all tailored to your values and goals.
      </p>
    </section>
  );
}
