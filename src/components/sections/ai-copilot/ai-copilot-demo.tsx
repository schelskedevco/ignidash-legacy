"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ICON_SIZES, SPACING, MAX_WIDTHS } from "@/lib/design-constants";

const qaData = [
  {
    question:
      "If I keep saving $2,800 a month, how much would going part-time at 40 delay my retirement?",
    answer:
      "Based on your current trajectory, going part-time at 40 would reduce your savings rate by 50% and delay your FIRE age from 45 to 48. You'd still retire early — just with more balance along the way.",
  },
  {
    question:
      "Can I afford to take a year off if I pause investing but keep my current lifestyle?",
    answer:
      "Yes — your portfolio is far enough ahead that a one-year pause would only set you back about 7 months. Just make sure you resume saving at your current rate afterward.",
  },
  {
    question:
      "What happens if I have a second child in 2027 and keep sending both kids to daycare?",
    answer:
      "That would add roughly $24,000/year in expenses through 2031, pushing your retirement age from 46 to 49. If you increase savings by $600/month starting now, you could still retire at 46.",
  },
  {
    question:
      "Right now I have $270K invested. Can I still reach FIRE by 43 if I stop saving at 38?",
    answer:
      "With your current investment balance and projected returns, stopping at 38 still gets you to FIRE by 43 — but just barely. A market downturn could push that back a year or more. Keeping even a small contribution going would give you a better buffer.",
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
        className={`mx-auto w-full ${MAX_WIDTHS.content} ${SPACING.elementSpacing}`}
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
