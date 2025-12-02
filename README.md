# Started

AI-guided recruiter onboarding platform that helps new recruiters create their own recruitment company branding in minutes.

## Features

- **AI-Guided Onboarding** — Step-by-step wizard with AI-generated questions and suggestions
- **Brand Asset Generation** — Automatically creates logo, letterhead, email signature, LinkedIn banner, brand guidelines, and a one-page website
- **AI Image Generation** — Uses Cloudflare Workers AI (Phoenix 1.0) for logo and banner generation
- **Download Everything** — Export all assets as a ZIP file

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Vercel AI SDK](https://sdk.vercel.ai/) + [Google Gemini](https://ai.google.dev/)
- **Image Generation**: [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) (Phoenix 1.0)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations**: [Motion](https://motion.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Google AI API key (Gemini)
- Cloudflare account with Workers AI enabled

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ifalfahri/started.git
cd started
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable                       | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Your Google AI (Gemini) API key                  |
| `CLOUDFLARE_ACCOUNT_ID`        | Your Cloudflare account ID                       |
| `CLOUDFLARE_API_TOKEN`         | Cloudflare API token with Workers AI permissions |

### Getting API Keys

**Google Gemini:**

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key

**Cloudflare Workers AI:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Workers AI
3. Create an API token with `Workers AI - Read` and `Workers AI - Edit` permissions
4. Copy your Account ID from the dashboard URL

## How It Works

1. **Brand Inputs** — AI asks personalized questions about your company name, tagline, industry, brand style, and colors
2. **Asset Generation** — AI generates brand copy and design tokens, then creates all brand assets
3. **Preview** — Review all generated assets with the option to regenerate
4. **Download** — Download individual assets or everything as a ZIP

## Generated Assets

| Asset            | Format | Description                        |
| ---------------- | ------ | ---------------------------------- |
| Logo             | PNG    | AI-generated company logo          |
| Letterhead       | HTML   | Professional document template     |
| Email Signature  | HTML   | Ready-to-use email signature       |
| LinkedIn Banner  | PNG    | 1584x396 banner image              |
| Brand Guidelines | HTML   | Colors, typography, and tone guide |
| Website          | HTML   | One-page company website           |

## License

MIT

## Author

[Ifal Fahri Aldo](https://github.com/ifalfahri)
