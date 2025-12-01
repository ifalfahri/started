import { NextRequest, NextResponse } from "next/server";
import { generateAllBrandAssets } from "@/lib/services/brand-generation";
import type { BrandInputs } from "@/types/brand";

export async function POST(req: NextRequest) {
  try {
    const brandInputs: Partial<BrandInputs> = await req.json();
    const assets = await generateAllBrandAssets(brandInputs);
    return NextResponse.json(assets);
  } catch (error) {
    console.error("Error generating assets:", error);
    return NextResponse.json(
      { error: "Failed to generate assets", details: String(error) },
      { status: 500 }
    );
  }
}
