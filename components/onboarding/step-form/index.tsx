"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { FORM_STEPS, type FormStep, type StepContent } from "@/types/chat";
import { StepQuestion } from "./step-question";
import { StepInput } from "./step-input";
import { StepSuggestions } from "./step-suggestions";
import { StepProgress } from "./step-progress";
import { CompletionView } from "./completion-view";
import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StepForm() {
  const router = useRouter();
  const { brandInputs, updateBrandInputs, reset } = useOnboardingStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepContent, setStepContent] = useState<StepContent | null>(null);
  const [isLoadingStep, setIsLoadingStep] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const currentStep = FORM_STEPS[currentStepIndex] as FormStep | undefined;
  const isComplete = currentStepIndex >= FORM_STEPS.length;

  const fetchStepContent = useCallback(
    async (step: FormStep) => {
      setIsLoadingStep(true);
      try {
        const response = await fetch("/api/ai/step", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step, brandInputs }),
        });
        const data: StepContent = await response.json();
        setStepContent(data);
      } catch {
        setStepContent({
          question: "What would you like to provide?",
          placeholder: "Type your answer...",
          suggestions: [],
        });
      } finally {
        setIsLoadingStep(false);
      }
    },
    [brandInputs]
  );

  useEffect(() => {
    if (currentStep && !isComplete) {
      fetchStepContent(currentStep);
      // Pre-fill input if value already exists
      const existingValue =
        brandInputs[currentStep as keyof typeof brandInputs];
      setInputValue(typeof existingValue === "string" ? existingValue : "");
    }
  }, [currentStep, isComplete, fetchStepContent, brandInputs]);

  const handleNext = useCallback(() => {
    if (!currentStep || !inputValue.trim()) return;

    // Save the value
    updateBrandInputs({ [currentStep]: inputValue.trim() });

    // Clear content first to show loading immediately
    setStepContent(null);
    setIsLoadingStep(true);
    setInputValue("");

    // Move to next step
    setCurrentStepIndex((prev) => prev + 1);
  }, [currentStep, inputValue, updateBrandInputs]);

  const handleSkip = useCallback(() => {
    if (!currentStep) return;

    // Clear content first to show loading immediately
    setStepContent(null);
    setIsLoadingStep(true);
    setInputValue("");

    // Move to next step
    setCurrentStepIndex((prev) => prev + 1);
  }, [currentStep]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleNext();
      }
    },
    [handleNext]
  );

  const handleStartOver = useCallback(() => {
    reset();
    setCurrentStepIndex(0);
    setInputValue("");
  }, [reset]);

  const handleGoToPreview = useCallback(() => {
    router.push("/preview");
  }, [router]);

  const isOptionalStep = currentStep === "tagline";
  const canProceed = inputValue.trim().length > 0;

  if (isComplete) {
    return (
      <CompletionView
        brandInputs={brandInputs}
        onContinue={handleGoToPreview}
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold font-serif">Brand Builder</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleStartOver}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      <StepProgress
        currentStep={currentStepIndex}
        totalSteps={FORM_STEPS.length}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          {isLoadingStep ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Preparing your next question...
              </p>
            </motion.div>
          ) : stepContent ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg space-y-6"
            >
              <StepQuestion question={stepContent.question} />

              <StepInput
                value={inputValue}
                onChange={setInputValue}
                placeholder={stepContent.placeholder}
                onKeyDown={handleKeyDown}
                currentStep={currentStep!}
              />

              {stepContent.suggestions.length > 0 && (
                <StepSuggestions
                  suggestions={stepContent.suggestions}
                  onSelect={handleSuggestionClick}
                  currentStep={currentStep!}
                />
              )}

              <div className="flex gap-3 justify-center pt-4">
                {isOptionalStep && (
                  <Button variant="outline" onClick={handleSkip}>
                    Skip for now
                  </Button>
                )}
                <Button onClick={handleNext} disabled={!canProceed}>
                  {currentStepIndex === FORM_STEPS.length - 1
                    ? "Complete"
                    : "Continue"}
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
