"use client";

import { StepForm } from "@/components/onboarding/step-form";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";

export function BrandInputsPage() {
  return (
    <div className="flex flex-col h-full">
      <OnboardingProgress currentStep={1} />
      <div className="flex-1 min-h-0 overflow-hidden">
        <StepForm />
      </div>
    </div>
  );
}
