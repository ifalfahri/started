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
  logo?: string; // Base64 or URL
  letterhead?: string; // HTML content
  emailSignature?: string; // HTML content
  linkedInBanner?: string; // Base64 or URL
  brandSheet?: string; // HTML content
  website?: string; // HTML content
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
