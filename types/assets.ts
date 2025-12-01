import type { BrandCopySchema, DesignTokensSchema } from "@/lib/schemas";
import type { BrandInputs } from "./brand";

export interface EnrichedBrandInputs extends Partial<BrandInputs> {
  aiCopy?: BrandCopySchema;
  designTokens?: DesignTokensSchema;
}

export interface AssetTabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  content?: string;
}

export interface DownloadAssetConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  file: string;
}
