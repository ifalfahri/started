import type { BrandCopySchema, DesignTokensSchema } from "@/lib/schemas";
import type { EnrichedBrandInputs } from "./types";

export function generateBrandSheetHTML(
  brandInputs: EnrichedBrandInputs,
  brandCopy?: BrandCopySchema,
  designTokens?: DesignTokensSchema
): string {
  const { companyName, brandStyle, industry } = brandInputs;
  const tagline = brandInputs.tagline || brandCopy?.tagline || "";
  const primaryColor =
    designTokens?.colors.primary || brandInputs.primaryColor || "#2563EB";
  const secondaryColor =
    designTokens?.colors.secondary || brandInputs.secondaryColor || "#64748B";

  const colors = designTokens?.colors || {
    primary: primaryColor,
    primaryLight: primaryColor + "80",
    primaryDark: primaryColor,
    secondary: secondaryColor,
    secondaryLight: secondaryColor + "80",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#1f2937",
    textMuted: "#6b7280",
  };

  const typography = designTokens?.typography || {
    headingFont: "Inter",
    bodyFont: "Inter",
    fontPairing: "Clean and modern pairing suitable for professional contexts",
  };

  const brandVoice = brandCopy?.brandVoice || {
    tone: "Professional and approachable",
    keywords: ["Trust", "Excellence", "Growth", "Connection", "Success"],
  };

  return `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=${typography.headingFont.replace(
    " ",
    "+"
  )}:wght@400;600;700&family=${typography.bodyFont.replace(
    " ",
    "+"
  )}:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: '${typography.bodyFont}', system-ui, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px;
      color: ${colors.text};
      background: ${colors.background};
    }
    h1, h2, h3 { font-family: '${
      typography.headingFont
    }', system-ui, sans-serif; }
    h1 { color: ${primaryColor}; border-bottom: 3px solid ${primaryColor}; padding-bottom: 10px; font-size: 2.5rem; }
    h2 { color: ${colors.text}; margin-top: 40px; font-size: 1.5rem; }
    .section { margin: 30px 0; }
    .color-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; margin-top: 20px; }
    .color-box {
      height: 100px;
      border-radius: 12px;
      display: flex;
      align-items: flex-end;
      padding: 12px;
      color: white;
      font-weight: bold;
      font-size: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .brand-values { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
    .value-tag {
      background: ${colors.primary}15;
      color: ${primaryColor};
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 500;
      font-size: 14px;
    }
    .font-sample { margin: 16px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .font-sample h3 { margin: 0 0 8px 0; }
    .logo-concept { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; padding: 30px; border-radius: 12px; margin-top: 16px; }
  </style>
</head>
<body>
  <h1>${companyName || "Company Name"} Brand Guidelines</h1>
  
  <div class="section">
    <h2>Brand Overview</h2>
    ${tagline ? `<p><strong>Tagline:</strong> "${tagline}"</p>` : ""}
    ${industry ? `<p><strong>Industry:</strong> ${industry}</p>` : ""}
    <p><strong>Brand Style:</strong> ${
      brandStyle || "Professional & Modern"
    }</p>
    <p><strong>Brand Voice:</strong> ${brandVoice.tone}</p>
  </div>

  <div class="section">
    <h2>Color Palette</h2>
    <div class="color-grid">
      <div class="color-box" style="background: ${
        colors.primary
      };">Primary<br/>${colors.primary}</div>
      <div class="color-box" style="background: ${
        colors.primaryDark
      };">Primary Dark<br/>${colors.primaryDark}</div>
      <div class="color-box" style="background: ${
        colors.secondary
      };">Secondary<br/>${colors.secondary}</div>
      <div class="color-box" style="background: ${colors.accent};">Accent<br/>${
    colors.accent
  }</div>
      <div class="color-box" style="background: ${colors.text};">Text<br/>${
    colors.text
  }</div>
      <div class="color-box" style="background: ${
        colors.textMuted
      };">Muted<br/>${colors.textMuted}</div>
    </div>
  </div>

  <div class="section">
    <h2>Typography</h2>
    <div class="font-sample">
      <h3 style="font-family: '${
        typography.headingFont
      }', sans-serif; font-size: 28px;">${
    typography.headingFont
  } - Headings</h3>
      <p style="font-size: 20px;">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>abcdefghijklmnopqrstuvwxyz 0123456789</p>
    </div>
    <div class="font-sample">
      <h3 style="font-family: '${typography.bodyFont}', sans-serif;">${
    typography.bodyFont
  } - Body Text</h3>
      <p>The quick brown fox jumps over the lazy dog. Perfect for professional recruitment communications.</p>
    </div>
    <p><strong>Why this pairing:</strong> ${typography.fontPairing}</p>
  </div>

  <div class="section">
    <h2>Brand Keywords</h2>
    <div class="brand-values">
      ${brandVoice.keywords
        .map((keyword: string) => `<span class="value-tag">${keyword}</span>`)
        .join("")}
    </div>
  </div>

  <div class="section">
    <h2>Logo Concept</h2>
    <div class="logo-concept">
      <p><strong>Concept:</strong> ${
        designTokens?.logoDesign.concept ||
        "A modern, professional mark that conveys trust and expertise"
      }</p>
      <p><strong>Icon Suggestion:</strong> ${
        designTokens?.logoDesign.iconSuggestion ||
        "Abstract connecting elements symbolizing talent and opportunity"
      }</p>
      <p><strong>Layout:</strong> ${
        designTokens?.logoDesign.layoutStyle || "lettermark"
      }</p>
    </div>
  </div>

  <div class="section" style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
    <p>Generated for ${
      companyName || "Company Name"
    } | Brand Guidelines v1.0</p>
  </div>
</body>
</html>`;
}
