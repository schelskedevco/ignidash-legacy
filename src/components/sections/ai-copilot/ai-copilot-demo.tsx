"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const currentQA = qaData[currentIndex];
  const { displayedText, isComplete } = useTypewriter(
    showAnswer ? currentQA.answer : "",
    12
  );

  useEffect(() => {
    const questionDelay = setTimeout(() => {
      setShowAnswer(true);
    }, 500);

    return () => clearTimeout(questionDelay);
  }, [currentIndex]);

  useEffect(() => {
    if (showAnswer && isComplete) {
      const cycleDelay = setTimeout(() => {
        setShowAnswer(false);
        setCurrentIndex((prev) => (prev + 1) % qaData.length);
      }, 5500);

      return () => clearTimeout(cycleDelay);
    }
  }, [showAnswer, isComplete]);

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Content container */}
      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* User Question */}
            <div className="text-left">
              <h2 className="text-sm sm:text-base text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                You ask:
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed break-words">
                &ldquo;{currentQA.question}&rdquo;
              </p>
            </div>

            {/* AI Response */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-left"
                role="region"
                aria-live="polite"
              >
                <h3 className="text-sm sm:text-base text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                  AI Copilot:
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed break-words">
                  {displayedText}
                  {!isComplete && (
                    <span
                      className="inline-block w-[2px] h-5 bg-primary ml-1 animate-pulse"
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
