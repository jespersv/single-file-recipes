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

async function build() {
  const root = path.resolve(__dirname, '..');
  const srcDir = path.join(root, 'src');
  const outDir = path.join(root, 'docs');

  const indexPath = path.join(srcDir, 'index.html');
  const stylePath = path.join(srcDir, 'styling.css');
  const dataPath = path.join(srcDir, 'data.json');
  const scriptPath = path.join(srcDir, 'script.js');

  const [indexHtml, styleCss, dataJson, scriptJs] = await Promise.all([
    readIfExists(indexPath),
    readIfExists(stylePath),
    readIfExists(dataPath),
    readIfExists(scriptPath),
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

  // Replace script placeholder
  if (scriptJs !== null) {
    out = out.replace('%SCRIPT_PLACEHOLDER%', scriptJs);
  } else {
    console.warn('Warning: src/script.js not found — leaving %SCRIPT_PLACEHOLDER% as-is');
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

async function build() {
  const root = path.resolve(__dirname, '..');
  const srcDir = path.join(root, 'src');
  const outDir = path.join(root, 'docs');

  const indexPath = path.join(srcDir, 'index.html');
  const stylePath = path.join(srcDir, 'styling.css');
  const dataPath = path.join(srcDir, 'data.json');
  const scriptPath = path.join(srcDir, 'script.js');

  const [indexHtml, styleCss, dataJson, scriptJs] = await Promise.all([
    readIfExists(indexPath),
    readIfExists(stylePath),
    readIfExists(dataPath),
    readIfExists(scriptPath),
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
    // Ensure JSON is on one line (but keep readable) — preserve formatting
    out = out.replace('%RECIPE_DATA_PLACEHOLDER%', dataJson);
  } else {
    console.warn('Warning: src/data.json not found — leaving %RECIPE_DATA_PLACEHOLDER% as-is');
  }

  // Replace script placeholder
  if (scriptJs !== null) {
    out = out.replace('%SCRIPT_PLACEHOLDER%', scriptJs);
  } else {
    console.warn('Warning: src/script.js not found — leaving %SCRIPT_PLACEHOLDER% as-is');
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
