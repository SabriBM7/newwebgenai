// app/api/ollama/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { prompt, model, temperature, maxTokens, systemPrompt } = await request.json();

        // Replace with your actual Ollama API endpoint
        const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';

        const response = await fetch(ollamaUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model || 'llama3',
                prompt: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
                temperature: temperature || 0.7,
                max_tokens: maxTokens || 1000,
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({ text: data.response });
    } catch (error) {
        console.error('Error in Ollama API route:', error);
        return NextResponse.json(
            { error: 'Failed to generate content with Ollama' },
            { status: 500 }
        );
    }
}