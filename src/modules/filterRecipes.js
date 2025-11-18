/**
 * recipeFilter.js - Filter recipes by search query
 */

/**
 * Filter recipes by title
 * @param {Array<{object: recipe}>} recipes - Array of recipe objects
 * @param {object<{id: number}, {object: recipe}>} recipeDict - Dictionary of recipe objects
 * @param {string} query - Search query
 * @param {func} loadRecipes - Load recipes function
 * @returns {Array} Filtered recipes
 */
function filterRecipes(recipes, recipeDict, query, loadRecipes) {
  if(query === '') return recipes;

  if(miniSearch !== 'undefined'){
    var hits= miniSearch.search(query, { prefix: true });
    const loaded = loadRecipes(recipeDict, hits)
    return loaded;
  }

  console.error("MiniSearch is not defined, falling back to basic filter");
  const lowerQuery = query.toLowerCase();
  return recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(lowerQuery)
  );
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filterRecipes };
}
