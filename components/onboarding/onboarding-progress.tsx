import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Brand Info" },
  { id: 2, label: "Preview" },
  { id: 3, label: "Download" },
];

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-start w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "flex items-start",
              index < steps.length - 1 ? "flex-1" : ""
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 transition-colors",
                  currentStep >= step.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 mt-4 transition-colors",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
