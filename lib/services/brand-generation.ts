import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import {
  brandCopySchema,
  designTokensSchema,
  type BrandCopySchema,
  type DesignTokensSchema,
} from "@/lib/schemas";
import {
  buildBrandCopyPrompt,
  buildDesignTokensPrompt,
  buildLogoPrompt,
  buildBannerPrompt,
} from "@/lib/constants/prompts";
import { generateImageWithCloudflare } from "./image-generation";
import {
  generateLetterheadHTML,
  generateEmailSignatureHTML,
  generateBrandSheetHTML,
  generateWebsiteHTML,
} from "@/lib/generators";
import type { BrandInputs, GeneratedAssets } from "@/types/brand";
import type { EnrichedBrandInputs } from "@/types/assets";

const AI_MODEL = "gemini-2.5-flash";

export async function generateBrandCopy(
  brandInputs: Partial<BrandInputs>
): Promise<BrandCopySchema> {
  const result = await generateObject({
    model: google(AI_MODEL),
    schema: brandCopySchema,
    prompt: buildBrandCopyPrompt(brandInputs),
  });
  return result.object;
}

export async function generateDesignTokens(
  brandInputs: Partial<BrandInputs>
): Promise<DesignTokensSchema> {
  const result = await generateObject({
    model: google(AI_MODEL),
    schema: designTokensSchema,
    prompt: buildDesignTokensPrompt(brandInputs),
  });
  return result.object;
}

export async function generateAllBrandAssets(
  brandInputs: Partial<BrandInputs>
): Promise<GeneratedAssets> {
  const [brandCopy, designTokens] = await Promise.all([
    generateBrandCopy(brandInputs),
    generateDesignTokens(brandInputs),
  ]);

  const primaryColor = brandInputs.primaryColor || designTokens.colors.primary;
  const secondaryColor =
    brandInputs.secondaryColor || designTokens.colors.secondary;
  const tagline = brandInputs.tagline || brandCopy.tagline;

  const [logoBase64, bannerBase64] = await Promise.all([
    generateImageWithCloudflare(
      buildLogoPrompt(
        brandInputs,
        primaryColor,
        secondaryColor,
        designTokens.logoDesign.iconSuggestion
      ),
      { width: 1024, height: 1024 }
    ),
    generateImageWithCloudflare(
      buildBannerPrompt(brandInputs, tagline, primaryColor, secondaryColor),
      { width: 1584, height: 396 }
    ),
  ]);

  const enrichedBrandInputs: EnrichedBrandInputs = {
    ...brandInputs,
    tagline,
    aiCopy: brandCopy,
    designTokens,
  };

  return {
    logo: logoBase64,
    logoDescription: designTokens.logoDesign.concept,
    letterhead: generateLetterheadHTML(enrichedBrandInputs, brandCopy),
    emailSignature: generateEmailSignatureHTML(enrichedBrandInputs, brandCopy),
    linkedInBanner: bannerBase64,
    brandSheet: generateBrandSheetHTML(
      enrichedBrandInputs,
      brandCopy,
      designTokens
    ),
    website: generateWebsiteHTML(enrichedBrandInputs, brandCopy, designTokens),
  };
}
