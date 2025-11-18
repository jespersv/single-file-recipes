/**
 * loadRecipes.js - Load recipes by from search hits
 */

/**
 * Filter recipes by title
 * @param {object<{id: number}, {object: recipe}>} recipeDict - Dictionary of recipe objects
 * @param {Array<{object: hits}>} recipes - Array of hit objects
 * @returns {Array} Loaded recipes
 */
function loadRecipes(recipeDict, searchHits) {
  return searchHits.map(s=> recipeDict[s.id]);
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadRecipes };
}
