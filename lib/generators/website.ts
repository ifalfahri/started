import type { BrandCopySchema, DesignTokensSchema } from "@/lib/schemas";
import type { EnrichedBrandInputs } from "./types";

export function generateWebsiteHTML(
  brandInputs: EnrichedBrandInputs,
  brandCopy?: BrandCopySchema,
  designTokens?: DesignTokensSchema
): string {
  const { companyName, brandStyle, industry } = brandInputs;
  const tagline =
    brandInputs.tagline ||
    brandCopy?.tagline ||
    "Connecting talent with opportunity";
  const primaryColor =
    designTokens?.colors.primary || brandInputs.primaryColor || "#2563EB";
  const secondaryColor =
    designTokens?.colors.secondary || brandInputs.secondaryColor || "#1e40af";

  const colors = designTokens?.colors || {
    primary: primaryColor,
    primaryDark: secondaryColor,
    background: "#ffffff",
    text: "#1f2937",
    textMuted: "#6b7280",
  };

  const typography = designTokens?.typography || {
    headingFont: "Inter",
    bodyFont: "Inter",
  };

  const heroHeadline =
    brandCopy?.heroHeadline ||
    `Welcome to ${companyName || "Your Recruitment Partner"}`;
  const heroSubheadline = brandCopy?.heroSubheadline || tagline;
  const aboutText =
    brandCopy?.aboutText ||
    `${companyName || "We"} specialize in ${industry || "recruitment"} with a ${
      brandStyle || "professional and modern"
    } approach. Our team is dedicated to finding the perfect match between talented professionals and forward-thinking companies.`;
  const services = brandCopy?.services || [
    {
      title: "Executive Search",
      description:
        "Find top-tier leadership talent to drive your organization forward.",
    },
    {
      title: "Permanent Placement",
      description:
        "Build your team with permanent hires who align with your culture.",
    },
    {
      title: "Contract Staffing",
      description: "Flexible staffing solutions for project-based needs.",
    },
  ];
  const contactCTA =
    brandCopy?.contactCTA ||
    "Ready to find your next great hire or career opportunity?";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName || "Recruitment Company"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${typography.headingFont.replace(
    " ",
    "+"
  )}:wght@400;600;700&family=${typography.bodyFont.replace(
    " ",
    "+"
  )}:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: '${typography.bodyFont}', system-ui, sans-serif;
      line-height: 1.6;
      color: ${colors.text};
      background: ${colors.background};
    }
    h1, h2, h3 { font-family: '${
      typography.headingFont
    }', system-ui, sans-serif; }
    
    .nav {
      background: white;
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 100;
    }
    .logo { font-size: 24px; font-weight: bold; color: ${primaryColor}; }
    .nav-links a { margin-left: 30px; text-decoration: none; color: ${
      colors.textMuted
    }; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: ${primaryColor}; }
    
    .hero {
      background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
      color: white;
      padding: 180px 40px 120px;
      text-align: center;
    }
    .hero h1 { font-size: 52px; margin-bottom: 20px; font-weight: 700; }
    .hero p { font-size: 22px; opacity: 0.95; max-width: 600px; margin: 0 auto 40px; }
    .btn {
      display: inline-block;
      background: white;
      color: ${primaryColor};
      padding: 16px 48px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
    
    .section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
    .section h2 { font-size: 40px; margin-bottom: 24px; color: ${primaryColor}; }
    .section p { font-size: 18px; color: ${
      colors.textMuted
    }; max-width: 800px; line-height: 1.8; }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
      margin-top: 48px;
    }
    .service-card {
      background: #f8fafc;
      padding: 36px;
      border-radius: 16px;
      border-top: 4px solid ${primaryColor};
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08); }
    .service-card h3 { margin-bottom: 12px; color: ${
      colors.text
    }; font-size: 22px; }
    .service-card p { color: ${colors.textMuted}; font-size: 16px; }
    
    .about { background: #f8fafc; }
    
    .contact {
      background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
      color: white;
      text-align: center;
    }
    .contact h2 { color: white; }
    .contact p { color: rgba(255,255,255,0.9); margin-bottom: 32px; }
    
    .footer {
      background: #0f172a;
      color: #94a3b8;
      padding: 48px 40px;
      text-align: center;
    }
    .footer a { color: #94a3b8; text-decoration: none; }
    .footer a:hover { color: white; }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 36px; }
      .hero p { font-size: 18px; }
      .section h2 { font-size: 32px; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="logo">${companyName || "Company"}</div>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <section class="hero">
    <h1>${heroHeadline}</h1>
    <p>${heroSubheadline}</p>
    <a href="#contact" class="btn">Get Started</a>
  </section>

  <section id="about" class="section about">
    <h2>About Us</h2>
    <p>${aboutText}</p>
  </section>

  <section id="services" class="section">
    <h2>Our Services</h2>
    <div class="services-grid">
      ${services
        .map(
          (service: { title: string; description: string }) => `
      <div class="service-card">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>

  <section id="contact" class="section contact">
    <h2>Let's Connect</h2>
    <p>${contactCTA}</p>
    <a href="mailto:contact@${(companyName || "company")
      .toLowerCase()
      .replace(/\s+/g, "")}.com" class="btn">Contact Us</a>
  </section>

  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} ${
    companyName || "Company Name"
  }. All rights reserved.</p>
  </footer>
</body>
</html>`;
}
