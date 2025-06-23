import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CoreProductSection() {
  const scenarios = [
    {
      title: "Traditional Saver",
      subtitle: "Steady path to FIRE",
      content: "Consistent income and expenses, building wealth over time.",
    },
    {
      title: "Career Changer",
      subtitle: "Flexible income journey",
      content: "Navigate income variations while staying on track to FIRE.",
    },
    {
      title: "Early Retiree",
      subtitle: "Aggressive savings approach",
      content:
        "High savings rate for maximum acceleration to financial independence.",
    },
  ];

  return (
    <>
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Three simple steps to your FIRE plan
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {scenarios.map((scenario, index) => (
              <CarouselItem key={index}>
                <div className="p-6 text-center space-y-4">
                  <h3 className="text-2xl font-semibold">{scenario.title}</h3>
                  <p className="text-lg text-muted-foreground">
                    {scenario.subtitle}
                  </p>
                  <p className="text-base leading-relaxed">
                    {scenario.content}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Dynamic output section placeholder */}
      <div className="mt-16 p-8 bg-muted/30 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Your Path to Freedom</h3>
        <p className="text-muted-foreground">
          Dynamic output will appear here based on carousel selection
        </p>
      </div>
    </>
  );
}
