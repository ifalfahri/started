const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4/accounts";
const PHOENIX_MODEL = "@cf/leonardo/phoenix-1.0";
const DEFAULT_STEPS = 25;

interface ImageGenerationOptions {
  width?: number;
  height?: number;
  steps?: number;
  guidance?: number;
  negativePrompt?: string;
}

export async function generateImageWithCloudflare(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.warn(
      "Cloudflare credentials not configured, skipping image generation"
    );
    return "";
  }

  const {
    width = 1024,
    height = 1024,
    steps = DEFAULT_STEPS,
    guidance = 5,
    negativePrompt,
  } = options;

  try {
    const response = await fetch(
      `${CLOUDFLARE_API_URL}/${accountId}/ai/run/${PHOENIX_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          width,
          height,
          num_steps: steps,
          guidance,
          ...(negativePrompt && { negative_prompt: negativePrompt }),
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Cloudflare AI error:", error);
      return "";
    }

    // Phoenix model returns raw image bytes directly
    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error generating image with Cloudflare:", error);
    return "";
  }
}

export function isBase64Image(content: string | undefined): boolean {
  return content?.startsWith("data:image/") ?? false;
}

export function base64ToBuffer(dataUrl: string): Buffer | null {
  if (!dataUrl.startsWith("data:")) return null;
  const base64Data = dataUrl.split(",")[1];
  if (!base64Data) return null;
  return Buffer.from(base64Data, "base64");
}
