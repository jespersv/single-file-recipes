/**
 * loadRecipes.js - Load recipes by from search hits
 */

/**
 * Filter recipes by title
 * @param {Array<{title: string}>} recipes - Array of recipe objects
 * @param {string} searchHits - Search query
 * @returns {Array} Loaded recipes
 */
function loadRecipes(recipes, searchHits) {
  return searchHits.map(s=> recipes.find(r => r.id === s.id)); //todo change to dict
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadRecipes };
}
