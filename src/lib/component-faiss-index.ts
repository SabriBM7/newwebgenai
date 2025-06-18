// Simple FAISS-like index for component retrieval
import fs from 'fs'
import path from 'path'

export interface VectorEntry<T> {
    vector: number[]
    item: T
}

function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0
    let normA = 0
    let normB = 0
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

export class SimpleFaissIndex<T> {
    private entries: VectorEntry<T>[] = []

    add(vector: number[], item: T) {
        this.entries.push({ vector, item })
    }

    search(vector: number[], k = 5): T[] {
        const scored = this.entries.map((e) => ({
            item: e.item,
            score: cosineSimilarity(vector, e.vector),
        }))
        scored.sort((a, b) => b.score - a.score)
        return scored.slice(0, k).map((s) => s.item)
    }

    toJSON() {
        return this.entries
    }

    static fromJSON<T>(data: VectorEntry<T>[]): SimpleFaissIndex<T> {
        const index = new SimpleFaissIndex<T>()
        index.entries = data
        return index
    }
}

export function loadIndex<T>(filePath: string): SimpleFaissIndex<T> | null {
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf8')
    return SimpleFaissIndex.fromJSON(JSON.parse(raw))
}

export function saveIndex<T>(index: SimpleFaissIndex<T>, filePath: string) {
    fs.writeFileSync(filePath, JSON.stringify(index.toJSON()))
}