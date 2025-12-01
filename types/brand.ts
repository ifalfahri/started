export interface BrandInputs {
  companyName: string;
  tagline?: string;
  industry?: string;
  brandStyle: string;
  primaryColor: string;
  secondaryColor: string;
  inspirationLinks: string[];
  inspirationImages: string[];
}

export interface GeneratedAssets {
  logo?: string;
  logoDescription?: string;
  letterhead?: string;
  emailSignature?: string;
  linkedInBanner?: string;
  brandSheet?: string;
  website?: string;
}

export interface OnboardingState {
  step: number;
  brandInputs: Partial<BrandInputs>;
  generatedAssets: GeneratedAssets;
  isGenerating: boolean;
}

export type OnboardingStep =
  | "welcome"
  | "company-info"
  | "brand-style"
  | "inspiration"
  | "review"
  | "generating"
  | "preview"
  | "download";
