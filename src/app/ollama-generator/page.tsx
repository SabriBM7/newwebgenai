import OllamaWebsiteGeneratorForm from "@/components/ollama-website-generator-form"

export const metadata = {
    title: "AI Website Generator with Ollama",
    description: "Generate personalized website content using your local Ollama models",
}

export default function OllamaGeneratorPage() {
    return <OllamaWebsiteGeneratorForm />
}
