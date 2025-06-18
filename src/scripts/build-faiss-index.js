const fs = require('fs')
const path = require('path')
const { OpenAIEmbeddings } = require('../src/lib/openai-embeddings')
const { SimpleFaissIndex, saveIndex } = require('../src/lib/component-faiss-index')

async function build() {
    const datasetPath = path.resolve(__dirname, '../src/lib/componentDataset.json')
    const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))

    const embedder = new OpenAIEmbeddings()
    const index = new SimpleFaissIndex()

    for (const component of dataset.components) {
        const text = component.description || component.component_name
        const vector = await embedder.embed(text)
        index.add(vector, component)
    }

    const indexPath = path.resolve(__dirname, '../src/lib/componentIndex.json')
    saveIndex(index, indexPath)
    console.log(`Saved component index to ${indexPath}`)
}

build().catch((err) => {
    console.error(err)
    process.exit(1)
})