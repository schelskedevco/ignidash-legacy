export function HeroSection() {
  return (
    <section className="px-4 py-24 max-w-7xl mx-auto text-left">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Smarter FIRE planning,
        </span>
        <br />
        <span className="text-foreground">
          grounded in your real life.
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
        Explore timelines, run projections, and get AI-powered insights — all tailored to your values and goals.
      </p>
    </section>
  );
}