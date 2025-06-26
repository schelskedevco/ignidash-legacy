"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ICON_SIZES, SPACING, MAX_WIDTHS } from "@/lib/design-constants";

const qaData = [
  {
    question: "Is putting 20% into Tesla and Ethereum smart?",
    answer:
      "You're already 85% in VTSAX, which includes Tesla — but not Ethereum. Adding crypto and concentrated stocks increases volatility without improving your odds of hitting FIRE by 45. If you want to speculate, keep it to a small fun money bucket so your core plan stays on course.",
  },
  {
    question: "Should I move to cash for a bit?",
    answer:
      "Your current plan already accounts for volatility. You've got a $50K emergency fund and a 90% stock allocation — that's aggressive but reasonable for your timeline. Selling now would delay your FIRE date by 2–3 years. Staying invested keeps you on track for 46.",
  },
  {
    question: "Can I stop saving at 38 and still hit FIRE by 43?",
    answer:
      "At your current $270K balance and $2,800/month savings, you're on track to hit $1.1M by 43. If you stop saving at 38, you'd fall short — around $840K — which won't cover your $48K annual spend. A smaller reduction in savings would keep the plan safer.",
  },
  {
    question: "Should I YOLO into NVIDIA?",
    answer:
      "You already own NVIDIA inside VTSAX — it's one of your top holdings. Going overweight on a single stock adds risk and could push your FIRE age past 50 if it underperforms. Staying diversified gives you better odds of long-term success.",
  },
  {
    question: "Is it dumb to just keep throwing everything into VTSAX?",
    answer:
      "Not at all. VTSAX gives you broad U.S. market exposure with ultra-low fees. Most active strategies underperform it over time — and your current allocation is already beating your target trajectory. Boring is working.",
  },
  {
    question: "Should I change my asset allocation as I get closer to FIRE?",
    answer:
      "You're 90% stocks, 10% bonds right now — aggressive, but fine given your age and timeline. As you get within 5 years of retiring, gradually shifting to 70/30 can reduce sequence of returns risk without losing too much growth. We'll adjust the glide path based on how flexible you want to be post-FIRE.",
  },
];

function useTypewriter(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayedText("");
    setIsComplete(false);
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        const char = text[index];
        if (char !== undefined) {
          setDisplayedText((prev) => prev + char);
        }
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
}

export function AICopilotDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const currentQA = qaData[currentIndex];
  const { displayedText, isComplete } = useTypewriter(
    showAnswer ? currentQA.answer : "",
    12
  );

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    setIsPaused(mediaQuery.matches); // Auto-pause for reduced motion users

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setIsPaused(true); // Auto-pause when reduced motion is enabled
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const questionDelay = setTimeout(() => {
      setShowAnswer(true);
    }, 500);

    return () => clearTimeout(questionDelay);
  }, [currentIndex]);

  useEffect(() => {
    if (showAnswer && isComplete && !isPaused) {
      const cycleDelay = setTimeout(() => {
        setShowAnswer(false);
        setCurrentIndex((prev) => (prev + 1) % qaData.length);
      }, 7000);

      return () => clearTimeout(cycleDelay);
    }
  }, [showAnswer, isComplete, isPaused]);

  return (
    <div
      className={`ai-copilot-demo flex flex-col items-center justify-center ${SPACING.container}`}
    >
      {/* Content container */}
      <div
        className={`mx-auto w-full ${MAX_WIDTHS.content} ${SPACING.elementSpacing} flex min-h-[480px] flex-col`}
      >
        {/* Controls */}
        <div className="mb-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume demo" : "Pause demo"}
            className="flex items-center gap-2"
          >
            {isPaused ? (
              <>
                <Play className={ICON_SIZES.sm} />
                Resume
              </>
            ) : (
              <>
                <Pause className={ICON_SIZES.sm} />
                Pause
              </>
            )}
          </Button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }
            }
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className={SPACING.elementSpacing}
          >
            {/* User Question */}
            <div className="text-left">
              <span className="text-muted-foreground mb-2 block text-sm font-semibold tracking-wide uppercase sm:text-base">
                You ask:
              </span>
              <p className="text-foreground text-lg leading-relaxed font-medium break-words sm:text-xl md:text-2xl lg:text-3xl">
                &ldquo;{currentQA.question}&rdquo;
              </p>
            </div>

            {/* Divider */}
            {showAnswer && <Separator className="my-4 sm:my-6" />}

            {/* AI Response */}
            {showAnswer && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
                className="text-left"
                role="region"
                aria-live="polite"
              >
                <span className="text-muted-foreground mb-2 block text-sm font-semibold tracking-wide uppercase sm:text-base">
                  AI Copilot:
                </span>
                <p className="text-foreground/90 text-lg leading-relaxed break-words sm:text-xl md:text-2xl">
                  {displayedText}
                  {!isComplete && (
                    <span
                      className="bg-primary ml-1 inline-block h-5 w-[2px] animate-pulse"
                      aria-hidden="true"
                    />
                  )}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
