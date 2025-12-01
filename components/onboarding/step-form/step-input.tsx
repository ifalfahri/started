"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormStep } from "@/types/chat";

interface StepInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  currentStep: FormStep;
}

export function StepInput({
  value,
  onChange,
  placeholder,
  onKeyDown,
  currentStep,
}: StepInputProps) {
  const isColorStep =
    currentStep === "primaryColor" || currentStep === "secondaryColor";
  const isMultiline = currentStep === "tagline" || currentStep === "brandStyle";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full"
    >
      {isColorStep ? (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div
                className="w-24 h-24 rounded-2xl shadow-lg border-4 border-background ring-2 ring-muted transition-all group-hover:ring-primary group-hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: value.startsWith("#") ? value : "#2563EB",
                }}
              />
              <input
                type="color"
                value={value.startsWith("#") ? value : "#2563EB"}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-background border rounded text-xs font-mono shadow-sm">
                {value.startsWith("#") ? value.toUpperCase() : "#2563EB"}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Click to pick a color
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Or enter hex:</span>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
              className="flex-1 font-mono text-center"
              autoFocus
            />
          </div>
        </div>
      ) : isMultiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-lg min-h-[100px] resize-none"
          autoFocus
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className="text-lg text-center"
          autoFocus
        />
      )}
    </motion.div>
  );
}
