"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import type { FormStep } from "@/types/chat";

interface StepSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  currentStep: FormStep;
}

function extractColorCode(suggestion: string): string | null {
  const match = suggestion.match(/#[0-9A-Fa-f]{6}/);
  return match ? match[0] : null;
}

export function StepSuggestions({
  suggestions,
  onSelect,
  currentStep,
}: StepSuggestionsProps) {
  const isColorStep =
    currentStep === "primaryColor" || currentStep === "secondaryColor";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <p className="text-sm text-muted-foreground text-center">
        Or choose a suggestion:
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion, index) => {
          const colorCode = isColorStep ? extractColorCode(suggestion) : null;

          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSelect(colorCode || suggestion)}
              className="transition-all hover:scale-105 active:scale-95"
            >
              {colorCode && (
                <span
                  className="w-4 h-4 rounded-full mr-2 border"
                  style={{ backgroundColor: colorCode }}
                />
              )}
              {suggestion}
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}
