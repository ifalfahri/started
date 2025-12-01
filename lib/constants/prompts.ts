import type { BrandInputs } from "@/types/brand";

export function buildBrandCopyPrompt(
  brandInputs: Partial<BrandInputs>
): string {
  return `Generate professional brand copy for a recruitment company with the following details:
      
Company Name: ${brandInputs.companyName || "Recruitment Company"}
Industry/Niche: ${brandInputs.industry || "General recruitment"}
Brand Style: ${brandInputs.brandStyle || "Professional and modern"}
Tagline (if provided): ${
    brandInputs.tagline || "None provided - please create one"
  }

The copy should match the brand style and appeal to both job seekers and employers looking for recruitment services.`;
}

export function buildDesignTokensPrompt(
  brandInputs: Partial<BrandInputs>
): string {
  return `Generate design tokens for a recruitment company brand with the following details:

Company Name: ${brandInputs.companyName || "Recruitment Company"}
Brand Style: ${brandInputs.brandStyle || "Professional and modern"}
Primary Color: ${brandInputs.primaryColor || "#2563EB"}
Secondary Color: ${brandInputs.secondaryColor || "#64748B"}
Industry: ${brandInputs.industry || "General recruitment"}

Generate a cohesive color palette that extends the primary and secondary colors, suggest appropriate Google Fonts that match the brand style, and provide a logo design concept.`;
}

export function buildLogoPrompt(
  brandInputs: Partial<BrandInputs>,
  primaryColor: string,
  secondaryColor: string,
  iconSuggestion: string
): string {
  const companyName = brandInputs.companyName || "Recruitment Company";
  const industry = brandInputs.industry || "recruitment";
  const style = brandInputs.brandStyle || "Professional and modern";

  return `Professional minimalist logo design for "${companyName}", a ${industry} company. Style: ${style}. Colors: ${primaryColor} and ${secondaryColor}. ${iconSuggestion}.`;
}

export function buildBannerPrompt(
  brandInputs: Partial<BrandInputs>,
  tagline: string,
  primaryColor: string,
  secondaryColor: string
): string {
  const companyName = brandInputs.companyName || "Recruitment Company";
  const style = brandInputs.brandStyle || "Professional and modern";
  const industry = brandInputs.industry || "recruitment";

  return `Professional LinkedIn banner for "${companyName}". Tagline: "${tagline}". ${style} style. Using ${primaryColor} and ${secondaryColor} for the colors. Wide horizontal format, preferenced aesthetic for ${industry} industry.`;
}
