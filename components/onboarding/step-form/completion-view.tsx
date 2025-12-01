"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BrandInputs } from "@/types/brand";
import { ArrowRight, RotateCcw, Check } from "lucide-react";

interface CompletionViewProps {
  brandInputs: Partial<BrandInputs>;
  onContinue: () => void;
  onStartOver: () => void;
}

const FIELD_LABELS: Record<string, string> = {
  companyName: "Company",
  tagline: "Tagline",
  industry: "Industry",
  brandStyle: "Style",
  primaryColor: "Primary",
  secondaryColor: "Secondary",
};

function TruncatedText({
  text,
  maxLength = 25,
}: {
  text: string;
  maxLength?: number;
}) {
  const isTruncated = text.length > maxLength;

  return (
    <span
      className="font-medium text-right max-w-[150px] sm:max-w-[200px] truncate block"
      title={isTruncated ? text : undefined}
    >
      {text}
    </span>
  );
}

export function CompletionView({
  brandInputs,
  onContinue,
  onStartOver,
}: CompletionViewProps) {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 py-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-8 h-8 sm:w-10 sm:h-10 text-background" />
        </motion.div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif">Perfect!</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your brand details are complete
          </p>
        </div>

        <Card className="w-full">
          <CardContent className="p-4 sm:p-6 space-y-3">
            {Object.entries(FIELD_LABELS).map(([key, label]) => {
              const value = brandInputs[key as keyof BrandInputs];
              if (!value) return null;

              const isColor = key.includes("Color");

              return (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm text-muted-foreground shrink-0">
                    {label}
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    {isColor && typeof value === "string" && (
                      <span
                        className="w-5 h-5 rounded-full border shrink-0"
                        style={{ backgroundColor: value }}
                      />
                    )}
                    <TruncatedText text={value as string} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onStartOver}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button onClick={onContinue} size="lg" className="w-full sm:w-auto">
            Generate Assets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
