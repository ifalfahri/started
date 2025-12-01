export type FormStep =
  | "companyName"
  | "tagline"
  | "industry"
  | "brandStyle"
  | "primaryColor"
  | "secondaryColor"
  | "complete";

export const FORM_STEPS: FormStep[] = [
  "companyName",
  "tagline",
  "industry",
  "brandStyle",
  "primaryColor",
  "secondaryColor",
];

export interface StepContent {
  question: string;
  placeholder: string;
  suggestions: string[];
}
