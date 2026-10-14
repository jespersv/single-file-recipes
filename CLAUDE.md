# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A personal recipe collection (Swedish UI and content, `lang="sv"`) that ships as **one self-contained HTML file**: `docs/index.html`. There is no framework and no bundler. A small Node script inlines the CSS, JS modules and recipe JSON into an HTML template.

## Goals

1. Display recipes in a page that is visually and functionally simple.
2. Keep building the HTML file as simple as possible, with as few external dependencies as possible.

When choosing between approaches, prefer the one that keeps the UI plain and the build trivial. Do not add features, tooling, build steps or packages unless they clearly serve these two goals.

## Commands

- `npm run build:index` (runs `node ./scripts/build-index.js`) builds `docs/index.html`. Run it after any change under `src/`.
- `node src/tests.js` runs the plain-Node tests. There is no test framework and no `npm test` script.
- There is no dev server. Open `docs/index.html` directly in a browser.

## Layout

- `src/index.html` is the template. It contains placeholders: `%STYLE_PLACEHOLDER%`, `%RECIPE_DATA_PLACEHOLDER%`, `%SCRIPT_PLACEHOLDER%`, `%BUILDDATE_PLACEHOLDER%`.
- `src/styling.css` is inlined into the template.
- `src/modules/*.js` are inlined in alphabetical order, then `src/script.js` is appended.
- `src/script.js` is the app entry point. It builds `recipeDict`, wires the DOM, sets up the router and creates the MiniSearch index.
- `src/data/*.json` holds one recipe per file. The build concatenates them, sorted by filename, into a JS array assigned to `recipes`.
- `docs/index.html` is generated output, served as the published site (likely GitHub Pages). Never edit it by hand.
- `_trash/` is an abandoned Vite/React/Tailwind attempt. Ignore it.
- `node_modules/` is present, but the build uses only Node built-ins.

## How the build works (and its gotchas)

- The "modules" are **not ES modules**. They are concatenated into a single `<script>` and share one global scope. Do not use `import` or `export`.
- Each module ends with `if (typeof module !== 'undefined' && module.exports) module.exports = {...}` so that `tests.js` can `require` it in Node. Keep that pattern in new modules.
- Because everything is concatenated, function and variable names must be unique across all modules and `script.js`.
- Module order is alphabetical by filename. A module must not depend at load time on something defined in a later file. Calls made at runtime are fine.
- `src/script.js` uses the globals `recipes` (injected by the build), `MiniSearch` (loaded from a jsDelivr CDN `<script>` in the template) and every module function.
- Recipe JSON is injected raw as a JS literal. Files must be valid JSON, and invalid files break the whole page.
- Search is MiniSearch with prefix n-gram tokenization and fuzzy 0.2. It indexes `id_name`, `title`, ingredient names and instruction text.

## Recipe data format

Files are named `<id>_<snake_case_name>.json` in `src/data/`, for example `21_hummus.json`.

```json
{
  "id_name": "hummus",
  "id": 21,
  "title": "Hummus",
  "serves": null,
  "ingredients": [
    { "groupId": 1, "amount": 400, "unit": "gram", "unitSymbol": "g", "ingredientName": "kikärtor" }
  ],
  "instructions": [
    { "groupId": 1, "stepNumber": 1, "instruction": "Mixa alla ingredienser till en jämn smet." }
  ]
}
```

- `id` must be unique. `recipeDict` is keyed by it, and search results resolve through it.
- `id_name` is the URL slug. Routes are `#/recipe/<id_name>`.
- `groupId` ties ingredients to instruction steps for cross-highlighting (`highlightManager`) and for ingredient grouping. `amount`, `unit` and `unitSymbol` may be `null` (for example "salt").
- Write content in Swedish, using Swedish unit symbols (`msk`, `tsk`, `dl`, `st`).
- Current data issues to be aware of:
  - `5_...jsonallad.json` has a mangled filename.
  - Id 20 is skipped.
  - `21_hummus.json` repeats `stepNumber` 3.

## Testing note

`src/tests.js` calls `filterRecipes(recipes, query)`, but `script.js` calls `filterRecipes(recipes, recipeDict, query, loadRecipes)`. The tests may be out of date relative to the module. Check this before trusting a pass or fail.

## Conventions

- Plain vanilla JS and CSS. Avoid adding dependencies. The only runtime dependency is MiniSearch from the CDN, pinned at 7.2.0. It is the one exception to goal 2, so don't add others.
- Keep the single-file output working offline apart from that CDN script.
- `docs/index.html` is tracked, so rebuild it before committing source changes.
