// app/api/rag-chat/route.ts
import { NextResponse } from "next/server";
import { generateEmbedding, similaritySearch } from "@/lib/embeddings";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
    try {
        const { query, threshold = 0.7, limit = 5 } = await request.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(query);

        // Perform similarity search
        const results = await similaritySearch(queryEmbedding, threshold, limit);

        // If no results found, return a generic response
        if (!results || results.length === 0) {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: query }
                ]
            });

            return NextResponse.json({
                answer: response.choices[0].message.content,
                sources: []
            });
        }

        // Format context from retrieved documents
        const context = results.map(doc =>
            `Content: ${doc.content}\nSource: ${doc.metadata?.title || "Unknown"}`
        ).join("\n\n");

        // Generate response with context
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant. Use the following retrieved documents to answer the user's question. If the documents don't contain relevant information, say so and try to provide a helpful response based on your general knowledge.\n\n${context}`
                },
                { role: "user", content: query }
            ]
        });

        return NextResponse.json({
            answer: response.choices[0].message.content,
            sources: results
        });
    } catch (error) {
        console.error("RAG chat error:", error);
        return NextResponse.json({ error: "Failed to process RAG query" }, { status: 500 });
    }
}