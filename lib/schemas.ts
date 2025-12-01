import { z } from "zod";

export const brandInputsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  tagline: z.string().optional(),
  industry: z.string().optional(),
  brandStyle: z.string().min(1, "Brand style is required"),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  inspirationLinks: z.array(z.string().url()).default([]),
  inspirationImages: z.array(z.string()).default([]),
});

export type BrandInputsSchema = z.infer<typeof brandInputsSchema>;

export const partialBrandInputsSchema = brandInputsSchema.partial();

export type PartialBrandInputsSchema = z.infer<typeof partialBrandInputsSchema>;

// AI-generated brand copy schema
export const brandCopySchema = z.object({
  tagline: z
    .string()
    .describe("A catchy, memorable tagline for the company (max 10 words)"),
  aboutText: z
    .string()
    .describe("A compelling 2-3 sentence about section for the company"),
  heroHeadline: z
    .string()
    .describe("A bold headline for the website hero section"),
  heroSubheadline: z
    .string()
    .describe("A supporting subheadline for the hero section"),
  services: z
    .array(
      z.object({
        title: z.string().describe("Service name"),
        description: z
          .string()
          .describe("Brief service description (1-2 sentences)"),
      })
    )
    .length(3)
    .describe("Three main services offered"),
  brandVoice: z.object({
    tone: z
      .string()
      .describe("The tone of voice (e.g., professional, friendly, bold)"),
    keywords: z.array(z.string()).length(5).describe("Five brand keywords"),
  }),
  contactCTA: z
    .string()
    .describe("A compelling call-to-action for the contact section"),
});

export type BrandCopySchema = z.infer<typeof brandCopySchema>;

// AI-generated design tokens schema
export const designTokensSchema = z.object({
  colors: z.object({
    primary: z.string().describe("Primary brand color hex code"),
    primaryLight: z.string().describe("Lighter variant of primary color"),
    primaryDark: z.string().describe("Darker variant of primary color"),
    secondary: z.string().describe("Secondary brand color hex code"),
    secondaryLight: z.string().describe("Lighter variant of secondary color"),
    accent: z.string().describe("Accent color for highlights"),
    background: z.string().describe("Background color"),
    text: z.string().describe("Main text color"),
    textMuted: z.string().describe("Muted text color"),
  }),
  typography: z.object({
    headingFont: z.string().describe("Recommended Google Font for headings"),
    bodyFont: z.string().describe("Recommended Google Font for body text"),
    fontPairing: z
      .string()
      .describe("Description of why these fonts work together"),
  }),
  logoDesign: z.object({
    concept: z.string().describe("Logo design concept description"),
    iconSuggestion: z
      .string()
      .describe("Suggested icon or symbol for the logo"),
    layoutStyle: z
      .enum(["wordmark", "lettermark", "icon-left", "icon-top", "icon-only"])
      .describe("Logo layout style"),
  }),
});

export type DesignTokensSchema = z.infer<typeof designTokensSchema>;

// AI-generated logo SVG schema
export const logoSvgSchema = z.object({
  svgCode: z
    .string()
    .describe(
      "Complete SVG code for the logo. Must start with <svg and end with </svg>. Use viewBox='0 0 200 200' for square logos or '0 0 300 80' for wordmarks. Include proper xmlns attribute."
    ),
  description: z
    .string()
    .describe("Brief description of the logo design and symbolism"),
});
