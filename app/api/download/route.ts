import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { base64ToBuffer } from "@/lib/services/image-generation";
import type { GeneratedAssets, BrandInputs } from "@/types/brand";

function createReadme(brandInputs: Partial<BrandInputs>): string {
  return `# ${brandInputs.companyName || "Brand"} Starter Pack

## Contents

- **logo.png** - Your company logo (AI-generated)
- **letterhead.html** - Letterhead template (open in browser, print to PDF)
- **email-signature.html** - Email signature (copy HTML into your email client)
- **linkedin-banner.png** - LinkedIn profile banner (AI-generated)
- **brand-guidelines.html** - Brand style guide
- **website/index.html** - One-page website (ready for Stripe verification)

## Brand Details

- **Company:** ${brandInputs.companyName || "N/A"}
- **Tagline:** ${brandInputs.tagline || "N/A"}
- **Industry:** ${brandInputs.industry || "N/A"}
- **Style:** ${brandInputs.brandStyle || "N/A"}
- **Primary Color:** ${brandInputs.primaryColor || "N/A"}
- **Secondary Color:** ${brandInputs.secondaryColor || "N/A"}

## Usage

1. Open HTML files in a browser to view
2. For letterhead: Print to PDF from browser
3. For email signature: Copy the rendered HTML
4. For website: Host on any static hosting (Vercel, Netlify, etc.)

Generated with Started - AI-Powered Brand Builder
`;
}

function addAssetToZip(
  zip: JSZip,
  content: string | undefined,
  filename: string,
  fallbackFilename?: string
): void {
  if (!content) return;

  if (content.startsWith("data:image/")) {
    const buffer = base64ToBuffer(content);
    if (buffer) {
      zip.file(filename, buffer);
    }
  } else {
    zip.file(fallbackFilename || filename, content);
  }
}

function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export async function POST(req: NextRequest) {
  try {
    const {
      assets,
      brandInputs,
    }: {
      assets: GeneratedAssets;
      brandInputs: Partial<BrandInputs>;
    } = await req.json();

    const zip = new JSZip();
    const companySlug = createSlug(brandInputs.companyName || "brand");

    addAssetToZip(zip, assets.logo, "logo.png", "logo.svg");
    addAssetToZip(zip, assets.letterhead, "letterhead.html");
    addAssetToZip(zip, assets.emailSignature, "email-signature.html");
    addAssetToZip(
      zip,
      assets.linkedInBanner,
      "linkedin-banner.png",
      "linkedin-banner.svg"
    );
    addAssetToZip(zip, assets.brandSheet, "brand-guidelines.html");

    if (assets.website) {
      zip.file("website/index.html", assets.website);
    }

    zip.file("README.md", createReadme(brandInputs));

    const zipBuffer = await zip.generateAsync({ type: "arraybuffer" });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${companySlug}-brand-pack.zip"`,
      },
    });
  } catch (error) {
    console.error("Error creating ZIP:", error);
    return NextResponse.json(
      { error: "Failed to create ZIP file" },
      { status: 500 }
    );
  }
}
