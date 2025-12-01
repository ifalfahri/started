import type { BrandCopySchema } from "@/lib/schemas";
import type { EnrichedBrandInputs } from "./types";

export function generateLetterheadHTML(
  brandInputs: EnrichedBrandInputs,
  brandCopy?: BrandCopySchema
): string {
  const { companyName } = brandInputs;
  const tagline = brandInputs.tagline || brandCopy?.tagline || "";
  const primaryColor = brandInputs.primaryColor || "#2563EB";

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    @page { margin: 0; size: A4; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .header {
      background: ${primaryColor};
      color: white;
      padding: 40px 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo { font-size: 28px; font-weight: bold; }
    .tagline { font-size: 14px; opacity: 0.9; margin-top: 4px; }
    .content {
      flex: 1;
      padding: 60px;
      min-height: 600px;
    }
    .footer {
      background: #f8f9fa;
      padding: 30px 60px;
      font-size: 12px;
      color: #666;
      border-top: 3px solid ${primaryColor};
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">${companyName || "Company Name"}</div>
      ${tagline ? `<div class="tagline">${tagline}</div>` : ""}
    </div>
  </div>
  <div class="content">
    <!-- Letter content goes here -->
  </div>
  <div class="footer">
    <p>${
      companyName || "Company Name"
    } | contact@company.com | www.company.com</p>
  </div>
</body>
</html>`;
}
