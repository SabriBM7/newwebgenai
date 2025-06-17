const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const componentsDir = path.join(root, 'src', 'components');
const systemDir = path.join(componentsDir, 'system');
const uiDir = path.join(componentsDir, 'ui');
const baseDatasetPath = path.join(root, 'src', 'lib', 'componentTemplatesBase.json');

function getTSXFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getTSXFiles(full));
    } else if (entry.isFile() && full.endsWith('.tsx')) {
      files.push(full);
    }
  }
  return files;
}

function extractProps(content) {
  const match = content.match(/interface\s+(\w+Props)\s*{([\s\S]*?)}/);
  const props = {};
  if (match) {
    const block = match[2];
    for (const line of block.split('\n')) {
      const trimmed = line.trim();
      const m = trimmed.match(/(\w+)\??:\s*([^;]+)/);
      if (m) {
        props[m[1]] = m[2].trim();
      }
    }
  }
  return props;
}

function createEntry(file) {
  const content = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file);
  const name = path.basename(file, '.tsx');
  const props = extractProps(content);
  return { component_name: name, filepath: relative, props };
}

const files = [...getTSXFiles(systemDir), ...getTSXFiles(uiDir)];
const generated = files.map(createEntry);

let baseDataset = { components: [] };
if (fs.existsSync(baseDatasetPath)) {
  try {
    baseDataset = JSON.parse(fs.readFileSync(baseDatasetPath, 'utf8'));
  } catch (e) {
    console.warn('Failed to parse base dataset:', e);
  }
}

const map = new Map(baseDataset.components.map(c => [c.component_name, c]));
for (const entry of generated) {
  if (!map.has(entry.component_name)) {
    map.set(entry.component_name, entry);
  }
}

const merged = Array.from(map.values());

const datasetPath = path.join(root, 'src', 'lib', 'componentDataset.json');
fs.writeFileSync(datasetPath, JSON.stringify({ components: merged }, null, 2));
console.log(`Generated ${merged.length} component entries to ${datasetPath}`);
