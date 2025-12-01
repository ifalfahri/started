import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import type { BrandInputs } from "@/types/brand";
import type { FormStep } from "@/types/chat";

const stepContentSchema = z.object({
  question: z
    .string()
    .describe("A friendly, personalized question for this step"),
  placeholder: z
    .string()
    .describe("A helpful placeholder text for the input field"),
  suggestions: z
    .array(z.string())
    .describe(
      "3-5 contextual suggestions based on what we know about the brand"
    ),
});

function buildStepPrompt(
  step: FormStep,
  brandInputs: Partial<BrandInputs>
): string {
  const context = `
Company Name: ${brandInputs.companyName || "Not yet provided"}
Tagline: ${brandInputs.tagline || "Not yet provided"}
Industry: ${brandInputs.industry || "Not yet provided"}
Brand Style: ${brandInputs.brandStyle || "Not yet provided"}
Primary Color: ${brandInputs.primaryColor || "Not yet provided"}
Secondary Color: ${brandInputs.secondaryColor || "Not yet provided"}
`;

  const stepInstructions: Record<FormStep, string> = {
    companyName: `Generate a warm, welcoming question asking for their recruitment company's name.
The question should feel personal and engaging, not corporate.
Suggestions should be empty array since company names are unique.
Placeholder should be something like "e.g., Talent Bridge Recruiting"`,

    tagline: `Generate a question asking for their company tagline or slogan.
Reference their company name "${brandInputs.companyName}" in the question naturally.
This is OPTIONAL - make that clear in a friendly way.
Suggestions should include creative tagline ideas that fit a recruitment company.
If they have industry info, tailor suggestions to that.`,

    industry: `Generate a question about what industries or niches they focus on for recruiting.
Reference their company "${brandInputs.companyName}" naturally.
This is FREE TEXT - they can write anything, not a dropdown.
Suggestions should be common recruitment niches but phrase them naturally.
Include options like "Tech startups", "Healthcare professionals", "Executive search", etc.`,

    brandStyle: `Generate a question about their desired brand aesthetic/style.
Consider their industry "${
      brandInputs.industry || "recruitment"
    }" when suggesting styles.
Suggestions should be SHORT style labels ONLY like "Modern & Minimal", "Bold & Energetic", "Professional & Clean".
DO NOT add explanations or descriptions after the style name. Just the style name itself.
Example good suggestions: ["Modern & Minimal", "Bold & Energetic", "Friendly & Warm"]
Example BAD suggestions: ["Modern & Minimal: clean lines and...", "Bold & Energetic - vibrant colors..."]
Reference what you know about them to make suggestions feel personalized.`,

    primaryColor: `Generate a question asking them to pick their primary brand color.
Based on their style "${brandInputs.brandStyle}" and industry "${brandInputs.industry}", suggest appropriate colors.
Suggestions MUST be hex color codes like "#2563EB" with a descriptive name in parentheses.
Example suggestions: ["#2563EB (Professional Blue)", "#10B981 (Trust Green)", "#8B5CF6 (Creative Purple)"]
Keep suggestions relevant to their brand style.`,

    secondaryColor: `Generate a question asking for a secondary/accent color.
Their primary color is "${brandInputs.primaryColor}".
Suggest complementary colors that pair well with their primary color.
Suggestions MUST be hex color codes with descriptions.
Example: ["#64748B (Slate Gray)", "#F59E0B (Warm Amber)"]`,

    complete: `This step means all fields are complete. Return empty content.`,
  };

  return `You are a friendly brand consultant helping create a recruitment company brand.

CURRENT BRAND CONTEXT:
${context}

TASK: Generate content for the "${step}" step.
${stepInstructions[step]}

RULES:
- Keep the question to 1-2 sentences max
- Be warm and conversational, not corporate
- Reference known brand info naturally when relevant
- Suggestions should be helpful starting points, not exhaustive lists
- For colors, ALWAYS use hex codes in suggestions`;
}

export async function POST(request: Request) {
  try {
    const { step, brandInputs } = (await request.json()) as {
      step: FormStep;
      brandInputs: Partial<BrandInputs>;
    };

    if (step === "complete") {
      return Response.json({
        question: "Perfect! Your brand details are complete.",
        placeholder: "",
        suggestions: [],
      });
    }

    const prompt = buildStepPrompt(step, brandInputs);

    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: stepContentSchema,
      prompt,
    });

    return Response.json(object);
  } catch (error) {
    console.error("Step generation error:", error);

    // Fallback content
    return Response.json({
      question: "What would you like to provide?",
      placeholder: "Type your answer...",
      suggestions: [],
    });
  }
}
