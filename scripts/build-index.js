const fs = require('fs').promises;
const path = require('path');

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

/**
 * Read all JavaScript files from a directory
 * @param {string} dirPath - Directory path to scan
 * @returns {Promise<string>} Concatenated contents of all JS files
 */
async function readAllJSFiles(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    const jsFiles = files.filter(f => f.endsWith('.js')).sort();
    
    const contents = await Promise.all(
      jsFiles.map(f => readIfExists(path.join(dirPath, f)))
    );
    
    return contents
      .filter(c => c !== null)
      .map((content, idx) => {
        return `// ─────────────────────────────────────────────────────────────\n// Module: ${jsFiles[idx]}\n// ─────────────────────────────────────────────────────────────\n${content}`;
      })
      .join('\n\n');
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

async function build() {
  const root = path.resolve(__dirname, '..');
  const srcDir = path.join(root, 'src');
  const modulesDir = path.join(srcDir, 'modules');
  const outDir = path.join(root, 'docs');

  const indexPath = path.join(srcDir, 'index.html');
  const stylePath = path.join(srcDir, 'styling.css');
  const dataPath = path.join(srcDir, 'data.json');
  const scriptPath = path.join(srcDir, 'script.js');

  const [indexHtml, styleCss, dataJson, scriptJs, modulesJs] = await Promise.all([
    readIfExists(indexPath),
    readIfExists(stylePath),
    readIfExists(dataPath),
    readIfExists(scriptPath),
    readAllJSFiles(modulesDir),
  ]);

  if (!indexHtml) {
    console.error('Error: src/index.html not found');
    process.exit(2);
  }

  let out = indexHtml;

  // Replace style placeholder
  if (styleCss !== null) {
    out = out.replace('%STYLE_PLACEHOLDER%', styleCss);
  } else {
    console.warn('Warning: src/styling.css not found — leaving %STYLE_PLACEHOLDER% as-is');
  }

  // Replace data placeholder. Keep JSON as-is (not escaped) so it becomes JS value in <script>
  if (dataJson !== null) {
    out = out.replace('%RECIPE_DATA_PLACEHOLDER%', dataJson);
  } else {
    console.warn('Warning: src/data.json not found — leaving %RECIPE_DATA_PLACEHOLDER% as-is');
  }

  // Combine modules and main script
  let finalScript = '';
  if (modulesJs !== null) {
    finalScript += modulesJs + '\n\n';
  } else {
    console.warn('Warning: No modules found in src/modules/ — skipping');
  }
  
  if (scriptJs !== null) {
    finalScript += scriptJs;
  } else {
    console.warn('Warning: src/script.js not found — leaving %SCRIPT_PLACEHOLDER% as-is');
  }

  // Replace script placeholder
  if (finalScript) {
    out = out.replace('%SCRIPT_PLACEHOLDER%', finalScript);
  }

  await ensureDir(outDir);
  const outPath = path.join(outDir, 'index.html');
  await fs.writeFile(outPath, out, 'utf8');
  console.log('Wrote', outPath);
}

if (require.main === module) {
  build().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { build };
