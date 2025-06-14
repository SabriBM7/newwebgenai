import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get("text") || "Placeholder"
    const style = searchParams.get("style") || "modern"
    const width = Number.parseInt(searchParams.get("width") || "1200")
    const height = Number.parseInt(searchParams.get("height") || "600")

    const svg = generateStyledSVG(text, style, width, height)

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=31536000",
        },
    })
}

function generateStyledSVG(text: string, style: string, width: number, height: number): string {
    const styles = {
        modern: {
            gradient: ["#3b82f6", "#8b5cf6"],
            accent: "#ffffff",
            pattern: "circles",
        },
        corporate: {
            gradient: ["#1e40af", "#3730a3"],
            accent: "#ffffff",
            pattern: "grid",
        },
        creative: {
            gradient: ["#7c3aed", "#ec4899"],
            accent: "#ffffff",
            pattern: "waves",
        },
    }

    const currentStyle = styles[style as keyof typeof styles] || styles.modern

    return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${currentStyle.gradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${currentStyle.gradient[1]};stop-opacity:1" />
        </linearGradient>
        ${getPatternDef(currentStyle.pattern, currentStyle.accent)}
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg-gradient)"/>
      <rect width="100%" height="100%" fill="url(#pattern)" opacity="0.1"/>
      
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
            fill="${currentStyle.accent}" font-size="${Math.min(width / 20, 48)}" 
            font-family="system-ui, -apple-system, sans-serif" font-weight="600">
        ${text}
      </text>
      
      ${getDecorationElements(width, height, currentStyle.accent)}
    </svg>
  `
}

function getPatternDef(pattern: string, color: string): string {
    switch (pattern) {
        case "circles":
            return `
        <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="20" fill="${color}" opacity="0.1"/>
        </pattern>
      `
        case "grid":
            return `
        <pattern id="pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="${color}" stroke-width="1" opacity="0.1"/>
        </pattern>
      `
        case "waves":
            return `
        <pattern id="pattern" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
          <path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="${color}" stroke-width="2" opacity="0.1"/>
        </pattern>
      `
        default:
            return ""
    }
}

function getDecorationElements(width: number, height: number, color: string): string {
    return `
    <circle cx="${width * 0.1}" cy="${height * 0.2}" r="30" fill="${color}" opacity="0.05"/>
    <circle cx="${width * 0.9}" cy="${height * 0.8}" r="40" fill="${color}" opacity="0.05"/>
    <rect x="${width * 0.8}" y="${height * 0.1}" width="60" height="60" fill="${color}" opacity="0.05" rx="10"/>
  `
}
