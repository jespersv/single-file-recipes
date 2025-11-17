// ============================================================================
// Recipe App - Main Entry Point
// Orchestrates modules: recipeFilter, recipeRenderer, highlightManager, viewManager
// ============================================================================

// State
let currentRecipe = null;
let highlighter = null;

// DOM elements
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const recipeList = document.getElementById('recipe-list');
const recipeDetail = document.getElementById('recipe-detail');
const searchInput = document.getElementById('search');
const backButton = document.getElementById('back-button');
const noResults = document.getElementById('no-results');

// Router (created below once createRouter is available)
let router = null;

/**
 * Handle recipe selection and show detail view
 * @param {Object} recipe - Recipe object to display
 */
function showRecipeDetail(recipe) {
  currentRecipe = recipe;
  
  // Render the recipe detail
  renderRecipeDetail(recipeDetail, recipe);
  
  // Setup cross-highlighting
  highlighter = setupHighlighting(recipeDetail);
  
  // Switch to detail view
  showDetailView(listView, detailView);
}

/**
 * Handle back button and show list view
 */
function showRecipeList() {
  currentRecipe = null;
  if (highlighter) {
    highlighter.clear();
    highlighter = null;
  }
  showListView(listView, detailView);
}

/**
 * Handle search input and filter recipes
 * @param {string} query - Search query
 */
function handleSearch(query) {
  const filtered = filterRecipes(recipes, query);
  renderRecipeList(recipeList, filtered, (r) => router.navigate('/recipe/' + r.id_name), noResults);
}

// ============================================================================
// Event Listeners
// ============================================================================

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});

backButton.addEventListener('click', () => router.navigate('/'));

// ============================================================================
// Initial Setup
// ============================================================================

// Setup router and routes
if (typeof createRouter === 'function') {
  router = createRouter([
    { pattern: '/', handler: () => { showRecipeList(); } },
    { pattern: '/recipe/:id', handler: ({ id }) => {
      // find recipe by id (number or string)
      const found = recipes.find(r => String(r.id_name) === String(id));
      if (found) {
        // render via router-driven flow
        showRecipeDetail(found);
      } else {
        showRecipeList();
      }
    } }
  ]);
  // initial render of list with router-aware navigation
  renderRecipeList(recipeList, recipes, (r) => router.navigate('/recipe/' + r.id_name), noResults);
  router.start();
} else {
  // fallback if router isn't present: render and use direct handlers
  renderRecipeList(recipeList, recipes, showRecipeDetail, noResults);
}