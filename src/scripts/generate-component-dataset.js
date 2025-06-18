import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve project root so the script works regardless of the current
// working directory. This makes the npm script more robust on different
// machines.
const root = path.resolve(__dirname, "..", "..") // Adjusted to go up two levels from src/scripts
const componentsDir = path.resolve(root, "src", "components")
const systemDir = path.join(componentsDir, "system")
const uiDir = path.join(componentsDir, "ui")
const baseDatasetPath = path.resolve(root, "src", "lib", "componentTemplatesBase.json")

function getTSXFiles(dir) {
    let files = []
    if (!fs.existsSync(dir)) {
        console.warn(`Directory not found: ${dir}`)
        return files
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            files = files.concat(getTSXFiles(full))
        } else if (entry.isFile() && (full.endsWith(".tsx") || full.endsWith(".jsx"))) {
            files.push(full)
        }
    }
    return files
}

function extractProps(content) {
    const match = content.match(/interface\s+(\w+Props)\s*{([\s\S]*?)}/)
    const props = {}
    if (match) {
        const block = match[2]
        for (const line of block.split("\n")) {
            const trimmed = line.trim()
            // Improved regex to handle various type definitions more robustly
            const m = trimmed.match(/(\w+)\s*\??\s*:\s*([^;]+)/)
            if (m) {
                // Remove trailing semicolon if present and trim whitespace
                props[m[1]] = m[2].replace(/;$/, "").trim()
            }
        }
    }
    return props
}

function createEntry(file) {
    const content = fs.readFileSync(file, "utf8")
    const relative = path.relative(root, file).replace(/\\/g, "/") // Normalize path separators
    const name = path.basename(file, path.extname(file)) // Handles .tsx and .jsx
    const props = extractProps(content)
    return { component_name: name, filepath: relative, props }
}

const systemFiles = getTSXFiles(systemDir)
const uiFiles = getTSXFiles(uiDir)
const files = [...systemFiles, ...uiFiles]

console.log(`Found ${systemFiles.length} files in system directory.`)
console.log(`Found ${uiFiles.length} files in ui directory.`)
console.log(`Total files to process: ${files.length}`)

const generated = files.map(createEntry)

let baseDataset = { components: [] }
if (fs.existsSync(baseDatasetPath)) {
    try {
        baseDataset = JSON.parse(fs.readFileSync(baseDatasetPath, "utf8"))
        console.log(`Loaded ${baseDataset.components.length} components from base dataset.`)
    } catch (e) {
        console.warn("Failed to parse base dataset:", e)
        console.error(e) // Log the actual error
    }
} else {
    console.warn(`Base dataset not found at: ${baseDatasetPath}`)
}

const map = new Map(baseDataset.components.map((c) => [c.component_name, c]))
let newComponentsAdded = 0
let existingComponentsUpdated = 0

for (const entry of generated) {
    if (map.has(entry.component_name)) {
        // If component exists in base, update its props and filepath from generated script
        // This ensures that the script's findings (like props) are always up-to-date
        // while preserving other manually added details in componentTemplatesBase.json
        const existingEntry = map.get(entry.component_name)
        Object.assign(existingEntry, {
            // Merge, prioritizing generated props and filepath
            ...existingEntry, // Keep existing fields from base
            props: entry.props, // Overwrite with newly parsed props
            filepath: entry.filepath, // Update filepath
        })
        map.set(entry.component_name, existingEntry)
        existingComponentsUpdated++
    } else {
        // If component does not exist in base, add it fully from generated
        map.set(entry.component_name, entry)
        newComponentsAdded++
    }
}
console.log(`Added ${newComponentsAdded} new components from script generation.`)
console.log(`Updated ${existingComponentsUpdated} existing components with fresh props/filepaths.`)

const merged = Array.from(map.values())

const datasetPath = path.resolve(root, "src", "lib", "componentDataset.json")
fs.writeFileSync(datasetPath, JSON.stringify({ components: merged }, null, 2))
console.log(`Generated/Updated ${merged.length} component entries to ${datasetPath}`)
