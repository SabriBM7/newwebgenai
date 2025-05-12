import type { Website, Section, WebsiteSettings } from "@/lib/db/schema"

interface ExportedWebsite {
    html: string
    css: string
    assets: {
        name: string
        url: string
        type: string
    }[]
}

export async function exportWebsiteToHTML(
    website: Website,
    sections: Section[],
    settings: WebsiteSettings,
): Promise<ExportedWebsite> {
    // Sort sections by order
    const sortedSections = [...sections].sort((a, b) => a.order - b.order)

    // Generate CSS based on settings
    const css = generateCSS(settings)

    // Generate HTML
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${website.title}</title>
  <meta name="description" content="${website.description || ""}">
  <style>
    ${css}
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${settings.typography.headingFont.replace(" ", "+")}&family=${settings.typography.bodyFont.replace(" ", "+")}&display=swap" rel="stylesheet">
</head>
<body>
  ${sortedSections.map((section) => generateSectionHTML(section)).join("\n")}
  
  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${website.title}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
  `.trim()

    // Collect all assets used in the website
    const assets = collectAssets(sections)

    return {
        html,
        css,
        assets,
    }
}

function generateCSS(settings: WebsiteSettings): string {
    return `
    :root {
      --color-primary: ${settings.colorScheme.primary};
      --color-secondary: ${settings.colorScheme.secondary};
      --color-accent: ${settings.colorScheme.accent};
      --color-background: ${settings.colorScheme.background};
      --color-text: ${settings.colorScheme.text};
      --font-heading: "${settings.typography.headingFont}", sans-serif;
      --font-body: "${settings.typography.bodyFont}", sans-serif;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-body);
      color: var(--color-text);
      background-color: var(--color-background);
      line-height: 1.6;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    a {
      color: var(--color-primary);
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .btn {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--font-body);
      font-weight: 600;
      text-align: center;
      transition: background-color 0.3s ease;
    }
    
    .btn:hover {
      background-color: var(--color-primary-dark);
      text-decoration: none;
    }
    
    .btn-secondary {
      background-color: var(--color-secondary);
    }
    
    .btn-secondary:hover {
      background-color: var(--color-secondary-dark);
    }
    
    /* Section styles */
    section {
      padding: 4rem 0;
    }
    
    /* Header styles */
    header {
      background-color: var(--color-background);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
    }
    
    header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    header nav ul {
      display: flex;
      list-style: none;
    }
    
    header nav ul li {
      margin-left: 1.5rem;
    }
    
    /* Hero section */
    .hero {
      background-color: var(--color-primary);
      color: white;
      text-align: center;
      padding: 6rem 0;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto 2rem;
    }
    
    /* Features section */
    .features {
      background-color: var(--color-background-alt);
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    /* Footer */
    footer {
      background-color: var(--color-text);
      color: var(--color-background);
      padding: 2rem 0;
      text-align: center;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `
}

function generateSectionHTML(section: Section): string {
    // This would be a more complex function that generates HTML based on section type and content
    // This is a simplified example
    switch (section.type) {
        case "header":
            return `
        <header>
          <div class="container">
            <div class="logo">
              <h1>${section.content.logo || "Logo"}</h1>
            </div>
            <nav>
              <ul>
                ${(section.content.menuItems || [])
                .map((item: any) => `<li><a href="${item.link}">${item.label}</a></li>`)
                .join("")}
              </ul>
            </nav>
          </div>
        </header>
      `

        case "hero":
            return `
        <section class="hero">
          <div class="container">
            <h1>${section.content.title || "Welcome"}</h1>
            <p>${section.content.subtitle || ""}</p>
            ${
                section.content.buttonText
                    ? `<a href="${section.content.buttonLink || "#"}" class="btn">${section.content.buttonText}</a>`
                    : ""
            }
          </div>
        </section>
      `

        case "features":
            return `
        <section class="features">
          <div class="container">
            <h2>${section.content.title || "Features"}</h2>
            <p>${section.content.subtitle || ""}</p>
            <div class="features-grid">
              ${(section.content.items || [])
                .map(
                    (feature: any) => `
                <div class="feature-card">
                  <h3>${feature.title}</h3>
                  <p>${feature.description}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </section>
      `

        // Add more section types as needed

        default:
            return `<section><div class="container"><p>Unknown section type: ${section.type}</p></div></section>`
    }
}

function collectAssets(sections: Section[]): { name: string; url: string; type: string }[] {
    const assets: { name: string; url: string; type: string }[] = []

    // This would scan through all sections and collect image URLs, etc.
    // Simplified example:
    sections.forEach((section) => {
        if (section.content.imageUrl) {
            const fileName = section.content.imageUrl.split("/").pop() || "image.jpg"
            assets.push({
                name: fileName,
                url: section.content.imageUrl,
                type: "image",
            })
        }

        // Check for background images
        if (section.content.backgroundImage) {
            const fileName = section.content.backgroundImage.split("/").pop() || "background.jpg"
            assets.push({
                name: fileName,
                url: section.content.backgroundImage,
                type: "image",
            })
        }

        // Check for other assets like logos, icons, etc.
    })

    return assets
}
