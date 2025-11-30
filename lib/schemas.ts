import { z } from "zod";

export const brandInputsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  tagline: z.string().optional(),
  industry: z.string().optional(),
  brandStyle: z.string().min(1, "Brand style is required"),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  inspirationLinks: z.array(z.string().url()).default([]),
  inspirationImages: z.array(z.string()).default([]),
});

export type BrandInputsSchema = z.infer<typeof brandInputsSchema>;

export const partialBrandInputsSchema = brandInputsSchema.partial();

export type PartialBrandInputsSchema = z.infer<typeof partialBrandInputsSchema>;
