"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import {
  ArrowLeft,
  Check,
  Download,
  FileArchive,
  Loader2,
  RotateCcw,
  FileImage,
  FileText,
  Mail,
  Linkedin,
  Palette,
  Globe,
} from "lucide-react";

const DOWNLOAD_ASSETS = [
  { icon: FileImage, label: "Logo", file: "logo.png" },
  { icon: FileText, label: "Letterhead", file: "letterhead.html" },
  { icon: Mail, label: "Email Signature", file: "email-signature.html" },
  { icon: Linkedin, label: "LinkedIn Banner", file: "linkedin-banner.png" },
  { icon: Palette, label: "Brand Guidelines", file: "brand-guidelines.html" },
  { icon: Globe, label: "Website", file: "website/index.html" },
] as const;

function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function DownloadPage() {
  const router = useRouter();
  const { brandInputs, generatedAssets, reset } = useOnboardingStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assets: generatedAssets, brandInputs }),
      });

      if (!response.ok) throw new Error("Failed to create ZIP");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${createSlug(
        brandInputs.companyName || "brand"
      )}-brand-pack.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartOver = () => {
    reset();
    router.push("/brand-inputs");
  };

  const downloadButtonContent = isDownloading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Creating ZIP...
    </>
  ) : downloaded ? (
    <>
      <Check className="w-4 h-4" />
      Downloaded!
    </>
  ) : (
    <>
      <Download className="w-4 h-4" />
      Download ZIP
    </>
  );

  return (
    <div className="space-y-6">
      <OnboardingProgress currentStep={3} />

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold font-serif">
          {downloaded ? "Download Complete! 🎉" : "Download Your Brand Pack"}
        </h2>
        <p className="text-muted-foreground">
          {downloaded
            ? "Your brand assets are ready to use"
            : "Get all your brand assets in one ZIP file"}
        </p>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileArchive className="w-5 h-5" />
            {brandInputs.companyName || "Brand"} Starter Pack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {DOWNLOAD_ASSETS.map((asset) => (
              <li key={asset.file} className="flex items-center gap-3 text-sm">
                <asset.icon className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1">{asset.label}</span>
                <code className="text-xs bg-muted px-2 py-0.5 rounded">
                  {asset.file}
                </code>
              </li>
            ))}
            <li className="flex items-center gap-3 text-sm border-t pt-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1">README with instructions</span>
              <code className="text-xs bg-muted px-2 py-0.5 rounded">
                README.md
              </code>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center gap-4">
        <Button
          size="lg"
          onClick={handleDownloadZip}
          disabled={isDownloading}
          className="gap-2 min-w-[200px] active:scale-95 transition-transform"
        >
          {downloadButtonContent}
        </Button>

        {downloaded && (
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Open the ZIP file to find your logo, letterhead, email signature,
            LinkedIn banner, brand guidelines, and a ready-to-deploy website.
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button
          variant="outline"
          onClick={() => router.push("/preview")}
          className="active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Preview
        </Button>
        <Button
          variant="outline"
          onClick={handleStartOver}
          className="active:scale-95 transition-transform"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Brand
        </Button>
      </div>
    </div>
  );
}
