import type { BrandCopySchema } from "@/lib/schemas";
import type { EnrichedBrandInputs } from "./types";

export function generateEmailSignatureHTML(
  brandInputs: EnrichedBrandInputs,
  brandCopy?: BrandCopySchema
): string {
  const { companyName } = brandInputs;
  const tagline = brandInputs.tagline || brandCopy?.tagline || "";
  const primaryColor = brandInputs.primaryColor || "#2563EB";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="padding-right: 20px; border-right: 3px solid ${primaryColor};">
      <div style="width: 60px; height: 60px; background: ${primaryColor}; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-weight: bold; font-size: 24px;">${
          (companyName || "C")[0]
        }</span>
      </div>
    </td>
    <td style="padding-left: 20px;">
      <div style="font-weight: bold; font-size: 16px; color: ${primaryColor};">[Your Name]</div>
      <div style="color: #666; margin: 4px 0;">[Your Title]</div>
      <div style="font-weight: 600; margin-top: 8px;">${
        companyName || "Company Name"
      }</div>
      ${
        tagline
          ? `<div style="font-size: 12px; color: #888; font-style: italic;">${tagline}</div>`
          : ""
      }
      <div style="margin-top: 8px; font-size: 12px;">
        <span>📧 email@company.com</span>
        <span style="margin-left: 12px;">📞 (555) 123-4567</span>
      </div>
    </td>
  </tr>
</table>`;
}
