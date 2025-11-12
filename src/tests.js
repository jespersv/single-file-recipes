/**
 * tests.js - Simple tests for recipe modules (Node.js compatible)
 * 
 * Run with: node src/tests.js
 */

// Import modules for testing
const { filterRecipes } = require('./modules/recipeFilter');
const { groupIngredients, renderIngredientsHTML } = require('./modules/recipeRenderer');

// Test data
const testRecipes = [
  { title: 'Pasta Carbonara', ingredients: [], instructions: [] },
  { title: 'Caesar Salad', ingredients: [], instructions: [] },
  { title: 'Grilled Salmon', ingredients: [], instructions: [] }
];

const testIngredients = [
  { groupId: 'base', ingredientName: 'Flour', amount: '200', unitSymbol: 'g' },
  { groupId: 'base', ingredientName: 'Sugar', amount: '100', unitSymbol: 'g' },
  { groupId: 'topping', ingredientName: 'Frosting', amount: '1', unitSymbol: 'cup' },
  { ingredientName: 'Salt', amount: '1', unitSymbol: 'tsp' }
];

// ============================================================================
// Test Helpers
// ============================================================================

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✓ ${message}`);
  }
}

function test(name, fn) {
  console.log(`\n📝 Testing: ${name}`);
  fn();
}

// ============================================================================
// Tests for recipeFilter
// ============================================================================

test('recipeFilter - should filter recipes by title', () => {
  const result = filterRecipes(testRecipes, 'pasta');
  assert(result.length === 1, 'Found 1 recipe matching "pasta"');
  assert(result[0].title === 'Pasta Carbonara', 'Correct recipe returned');
});

test('recipeFilter - should be case-insensitive', () => {
  const result = filterRecipes(testRecipes, 'CAESAR');
  assert(result.length === 1, 'Found 1 recipe matching "CAESAR"');
  assert(result[0].title === 'Caesar Salad', 'Correct recipe returned');
});

test('recipeFilter - should return empty array for no matches', () => {
  const result = filterRecipes(testRecipes, 'nonexistent');
  assert(result.length === 0, 'No recipes returned for non-matching query');
});

test('recipeFilter - should return all recipes for empty query', () => {
  const result = filterRecipes(testRecipes, '');
  assert(result.length === 3, 'All recipes returned for empty query');
});

// ============================================================================
// Tests for recipeRenderer - groupIngredients
// ============================================================================

test('groupIngredients - should group by groupId', () => {
  const groups = groupIngredients(testIngredients);
  assert(groups.length === 3, 'Created 3 groups');
  assert(groups[0].id === 'base', 'First group is "base"');
  assert(groups[1].id === 'topping', 'Second group is "topping"');
  assert(groups[2].id === '__ungrouped__', 'Third group is ungrouped');
});

test('groupIngredients - should correctly partition ingredients', () => {
  const groups = groupIngredients(testIngredients);
  assert(groups[0].items.length === 2, 'Base group has 2 items');
  assert(groups[1].items.length === 1, 'Topping group has 1 item');
  assert(groups[2].items.length === 1, 'Ungrouped has 1 item');
});

test('groupIngredients - should handle empty array', () => {
  const groups = groupIngredients([]);
  assert(groups.length === 0, 'Empty array returns 0 groups');
});

// ============================================================================
// Tests for recipeRenderer - renderIngredientsHTML
// ============================================================================

test('renderIngredientsHTML - should generate valid HTML', () => {
  const groups = groupIngredients(testIngredients);
  const html = renderIngredientsHTML(groups);
  assert(html.includes('ingredient-group'), 'HTML includes ingredient-group divs');
  assert(html.includes('ingredient'), 'HTML includes ingredient divs');
  assert(html.includes('Flour'), 'HTML includes ingredient name');
  assert(html.includes('200 g'), 'HTML includes amount and unit');
});

test('renderIngredientsHTML - should include groupId data attribute', () => {
  const groups = groupIngredients(testIngredients);
  const html = renderIngredientsHTML(groups);
  assert(html.includes('data-group-id="base"'), 'HTML includes base group data attribute');
  assert(html.includes('data-group-id="topping"'), 'HTML includes topping group data attribute');
});

// ============================================================================
// Summary
// ============================================================================

console.log('\n✅ All tests passed!');
