/**
 * recipeRenderer.js - Render recipe list and detail views
 */

/**
 * Render recipe list cards
 * @param {HTMLElement} container - Container to render into
 * @param {Array} recipes - Array of recipe objects
 * @param {Function} onRecipeClick - Callback when recipe is clicked
 * @param {HTMLElement} noResultsEl - Element to show when no results
 */
function renderRecipeList(container, recipes, onRecipeClick, noResultsEl) {
  container.innerHTML = '';
  
  if (recipes.length === 0) {
    if (noResultsEl) noResultsEl.style.display = 'block';
    return;
  }
  
  if (noResultsEl) noResultsEl.style.display = 'none';
  
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h2>${recipe.title}</h2>
      <p class="recipe-meta">${recipe.ingredients.length} ingredients · ${recipe.instructions.length} steps</p>
    `;
    card.addEventListener('click', () => onRecipeClick(recipe));
    container.appendChild(card);
  });
}

/**
 * Group ingredients by groupId
 * @param {Array} ingredients - Array of ingredient objects
 * @returns {Array} Grouped ingredients
 */
function groupIngredients(ingredients) {
  const groups = [];
  const groupIndexById = new Map();
  
  ingredients.forEach((ing) => {
    const id = ing.groupId ?? '__ungrouped__';
    if (!groupIndexById.has(id)) {
      groupIndexById.set(id, groups.length);
      groups.push({ id, items: [] });
    }
    groups[groupIndexById.get(id)].items.push(ing);
  });
  
  return groups;
}

/**
 * Generate HTML for ingredients grouped section
 * @param {Array} groups - Grouped ingredients
 * @returns {string} HTML string
 */
function renderIngredientsHTML(groups) {
  return groups.map(g => `
    <div class="ingredient-group" data-group-id="${g.id}">
      ${g.items.map(ing => `
        <div class="ingredient">
          <span class="ingredient-amount">${ing.amount ?? ''} ${ing.unitSymbol ?? ''}</span>
          <span>${ing.ingredientName}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

/**
 * Generate HTML for instructions
 * @param {Array} instructions - Array of instruction objects
 * @returns {string} HTML string
 */
function renderInstructionsHTML(instructions) {
  return instructions.map(inst => `
    <li class="instruction" data-group-id="${inst.groupId ?? ''}">
      <span class="step-number"></span>
      <span class="instruction-text">${inst.instruction}</span>
    </li>
  `).join('');
}

/**
 * Render recipe detail view
 * @param {HTMLElement} container - Container to render into
 * @param {Object} recipe - Recipe object with title, ingredients, instructions
 */
function renderRecipeDetail(container, recipe) {
  const groups = groupIngredients(recipe.ingredients);
  const ingredientsHtml = renderIngredientsHTML(groups);
  const instructionsHtml = renderInstructionsHTML(recipe.instructions);
  
  container.innerHTML = `
    <h1>${recipe.title}</h1>
    <div class="ingredients-section">
      <h2 class="section-title">Ingredients</h2>
      ${ingredientsHtml}
    </div>
    <div class="instructions-section">
      <h2 class="section-title">Instructions</h2>
      <ol>${instructionsHtml}</ol>
    </div>
  `;
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderRecipeList,
    renderRecipeDetail,
    groupIngredients,
    renderIngredientsHTML,
    renderInstructionsHTML
  };
}
