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
  renderRecipeList(recipeList, filtered, showRecipeDetail, noResults);
}

// ============================================================================
// Event Listeners
// ============================================================================

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});

backButton.addEventListener('click', showRecipeList);

// ============================================================================
// Initial Setup
// ============================================================================

renderRecipeList(recipeList, recipes, showRecipeDetail, noResults);