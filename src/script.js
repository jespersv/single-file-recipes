
// State
let currentRecipe = null;

// DOM elements
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const recipeList = document.getElementById('recipe-list');
const recipeDetail = document.getElementById('recipe-detail');
const searchInput = document.getElementById('search');
const backButton = document.getElementById('back-button');
const noResults = document.getElementById('no-results');

// Render recipe list
function renderRecipeList(filteredRecipes) {
    recipeList.innerHTML = '';
    
    if (filteredRecipes.length === 0) {
    noResults.style.display = 'block';
    return;
    }
    
    noResults.style.display = 'none';
    
    filteredRecipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <h2>${recipe.title}</h2>
        <p class="recipe-meta">${recipe.ingredients.length} ingredients · ${recipe.instructions.length} steps</p>
    `;
    card.addEventListener('click', () => showRecipeDetail(recipe));
    recipeList.appendChild(card);
    });
}

// Show recipe detail
function showRecipeDetail(recipe) {
    currentRecipe = recipe;
    
    // Group ingredients by groupId and render with spacing between groups
    const groups = [];
    const groupIndexById = new Map();
    recipe.ingredients.forEach((ing) => {
    const id = ing.groupId ?? '__ungrouped__';
    if (!groupIndexById.has(id)) {
        groupIndexById.set(id, groups.length);
        groups.push({ id, items: [] });
    }
    groups[groupIndexById.get(id)].items.push(ing);
    });

    const ingredientsHtml = groups.map(g => `
    <div class="ingredient-group" data-group-id="${g.id}">
        ${g.items.map(ing => `
        <div class=\"ingredient\">
            <span class=\"ingredient-amount\">${ing.amount ?? ''} ${ing.unitSymbol ?? ''}</span>
            <span>${ing.ingredientName}</span>
        </div>
        `).join('')}
    </div>
    `).join('');
    
    const instructionsHtml = recipe.instructions.map(inst => `
    <li class="instruction" data-group-id="${inst.groupId ?? ''}">
        <span class="step-number"></span>
        <span class="instruction-text">${inst.instruction}</span>
    </li>
    `).join('');
    
    recipeDetail.innerHTML = `
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

    // Cross-highlighting between ingredient groups and instruction steps
    let highlightedGroupId = null;
    const ingredientGroupElsById = new Map(
    Array.from(recipeDetail.querySelectorAll('.ingredient-group'))
        .map(el => [el.getAttribute('data-group-id'), el])
    );
    const instructionEls = Array.from(recipeDetail.querySelectorAll('.instruction'));
    const instructionElsByGroupId = new Map();
    instructionEls.forEach(el => {
    const gid = el.getAttribute('data-group-id');
    if (!instructionElsByGroupId.has(gid)) instructionElsByGroupId.set(gid, []);
    instructionElsByGroupId.get(gid).push(el);
    });

    function setHighlightedGroup(groupId) {
    ingredientGroupElsById.forEach(el => el.classList.remove('highlighted'));
    instructionEls.forEach(el => el.classList.remove('highlighted'));
    highlightedGroupId = groupId;
    if (!groupId) return;
    const groupEl = ingredientGroupElsById.get(String(groupId));
    if (groupEl) groupEl.classList.add('highlighted');
    const steps = instructionElsByGroupId.get(String(groupId)) || [];
    steps.forEach(el => el.classList.add('highlighted'));
    }

    ingredientGroupElsById.forEach((el, gid) => {
    el.addEventListener('click', () => {
        setHighlightedGroup(highlightedGroupId === gid ? null : gid);
    });
    });
    instructionEls.forEach(el => {
    el.addEventListener('click', () => {
        const gid = el.getAttribute('data-group-id');
        setHighlightedGroup(highlightedGroupId === gid ? null : gid);
    });
    });

    listView.classList.add('hidden');
    detailView.classList.add('active');
}

// Show recipe list
function showRecipeList() {
    currentRecipe = null;
    listView.classList.remove('hidden');
    detailView.classList.remove('active');
}

// Filter recipes
function filterRecipes(query) {
    const filtered = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    renderRecipeList(filtered);
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    filterRecipes(e.target.value);
});

backButton.addEventListener('click', showRecipeList);

// Initial render
renderRecipeList(recipes);