/**
 * recipeFilter.js - Filter recipes by search query
 */

/**
 * Filter recipes by title
 * @param {Array<{title: string}>} recipes - Array of recipe objects
 * @param {string} query - Search query
 * @returns {Array} Filtered recipes
 */
function filterRecipes(recipes, query) {
  if(query === '') return recipes;

  if(miniSearch !== 'undefined'){
    var hits= miniSearch.search(query, { prefix: true });
    const loaded = loadRecipes(recipes, hits)
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
