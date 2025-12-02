"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { isBase64Image } from "@/lib/services/image-generation";
import type { GeneratedAssets } from "@/types/brand";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Loader2,
  FileImage,
  FileText,
  Mail,
  Linkedin,
  Palette,
  Globe,
} from "lucide-react";

const ASSET_TABS = [
  { id: "logo", label: "Logo", icon: FileImage },
  { id: "letterhead", label: "Letterhead", icon: FileText },
  { id: "emailSignature", label: "Email Signature", icon: Mail },
  { id: "linkedInBanner", label: "LinkedIn Banner", icon: Linkedin },
  { id: "brandSheet", label: "Brand Sheet", icon: Palette },
  { id: "website", label: "Website", icon: Globe },
] as const;

type AssetId = (typeof ASSET_TABS)[number]["id"];

function downloadAsset(content: string, filename: string, mimeType: string) {
  if (content.startsWith("data:")) {
    const anchor = document.createElement("a");
    anchor.href = content;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <OnboardingProgress currentStep={2} />
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-medium">Generating your brand assets...</p>
        <p className="text-muted-foreground">This may take a moment</p>
      </div>
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="space-y-6">
      <OnboardingProgress currentStep={2} />
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-lg font-medium text-destructive">Error: {error}</p>
        <Button
          onClick={onRetry}
          className="active:scale-95 transition-transform"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

function AssetPreview({
  assetId,
  content,
  label,
}: {
  assetId: AssetId;
  content?: string;
  label: string;
}) {
  const isImageAsset = assetId === "logo" || assetId === "linkedInBanner";

  if (isImageAsset) {
    return (
      <div className="p-4 sm:p-8 flex items-center justify-center bg-gray-50">
        {isBase64Image(content) ? (
          <div
            className={
              assetId === "logo"
                ? "relative h-32 sm:h-48 w-full"
                : "relative h-40 sm:h-64 w-full"
            }
          >
            <Image
              src={content!}
              alt={label}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p className="text-muted-foreground">No image generated</p>
        )}
      </div>
    );
  }

  return (
    <iframe
      srcDoc={content}
      className="w-full h-[300px] sm:h-[400px] border-0"
      title={label}
    />
  );
}

export function PreviewPage() {
  const router = useRouter();
  const {
    brandInputs,
    generatedAssets,
    setGeneratedAssets,
    isGenerating,
    setIsGenerating,
  } = useOnboardingStore();
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const generateAssets = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandInputs),
      });

      if (!response.ok) throw new Error("Failed to generate assets");

      const assets: GeneratedAssets = await response.json();
      setGeneratedAssets(assets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }, [brandInputs, setGeneratedAssets, setIsGenerating]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (!brandInputs.companyName) {
      router.push("/brand-inputs");
      return;
    }

    if (Object.keys(generatedAssets).length === 0) {
      generateAssets();
    } else {
      setIsGenerating(false);
    }
  }, [
    brandInputs.companyName,
    generatedAssets,
    generateAssets,
    router,
    setIsGenerating,
  ]);

  const handleDownload = (assetId: AssetId) => {
    const content = generatedAssets[assetId as keyof GeneratedAssets];
    if (!content) return;

    const isImage = isBase64Image(content);
    const extension = isImage ? "png" : "html";
    const mimeType = isImage ? "image/png" : "text/html";
    downloadAsset(content, `${assetId}.${extension}`, mimeType);
  };

  if (isGenerating) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={generateAssets} />;

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      <OnboardingProgress currentStep={2} />

      <div className="text-center space-y-1 sm:space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold font-serif">
          Your Brand Assets
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Preview and download your generated brand materials
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">Brand Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Company:</span>{" "}
              <strong className="wrap-break-word">{brandInputs.companyName}</strong>
            </div>
            {brandInputs.tagline && (
              <div>
                <span className="text-muted-foreground">Tagline:</span>{" "}
                <strong className="wrap-break-word">{brandInputs.tagline}</strong>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Style:</span>{" "}
              <strong className="wrap-break-word">{brandInputs.brandStyle}</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Colors:</span>
              <span
                className="w-5 h-5 sm:w-6 sm:h-6 rounded"
                style={{ backgroundColor: brandInputs.primaryColor }}
              />
              <span
                className="w-5 h-5 sm:w-6 sm:h-6 rounded"
                style={{ backgroundColor: brandInputs.secondaryColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="logo" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full h-auto">
          {ASSET_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-xs py-2 px-1 sm:px-2 flex-col sm:flex-row gap-1"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden xs:inline sm:ml-1">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {ASSET_TABS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">
                  {tab.label}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="active:scale-95 transition-transform w-full sm:w-auto"
                  onClick={() => handleDownload(tab.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="border rounded-lg overflow-hidden bg-white">
                  <AssetPreview
                    assetId={tab.id}
                    content={generatedAssets[tab.id as keyof GeneratedAssets]}
                    label={tab.label}
                  />
                </div>
                {tab.id === "logo" && generatedAssets.logoDescription && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                      Logo Design Concept
                    </p>
                    <p className="text-xs sm:text-sm">
                      {generatedAssets.logoDescription}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/brand-inputs")}
          className="active:scale-95 transition-transform w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>
        <Button
          onClick={() => router.push("/download")}
          className="active:scale-95 transition-transform w-full sm:w-auto"
        >
          Download All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
