/**
 * highlightManager.js - Manage cross-highlighting between ingredients and instructions
 */

/**
 * Setup cross-highlighting between ingredient groups and instruction steps
 * @param {HTMLElement} container - Container with rendered recipe detail
 */
function setupHighlighting(container) {
  let highlightedGroupId = null;
  
  const ingredientGroupEls = Array.from(container.querySelectorAll('.ingredient-group'));
  const instructionEls = Array.from(container.querySelectorAll('.instruction'));
  
  const ingredientGroupElsById = new Map(
    ingredientGroupEls.map(el => [el.getAttribute('data-group-id'), el])
  );
  
  const instructionElsByGroupId = new Map();
  instructionEls.forEach(el => {
    const gid = el.getAttribute('data-group-id');
    if (!instructionElsByGroupId.has(gid)) {
      instructionElsByGroupId.set(gid, []);
    }
    instructionElsByGroupId.get(gid).push(el);
  });
  
  /**
   * Set or toggle highlight for a group
   * @param {string|null} groupId - Group ID to highlight, or null to clear
   */
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
  
  // Add click listeners to ingredients
  ingredientGroupElsById.forEach((el, gid) => {
    el.addEventListener('click', () => {
      setHighlightedGroup(highlightedGroupId === gid ? null : gid);
    });
  });
  
  // Add click listeners to instructions
  instructionEls.forEach(el => {
    el.addEventListener('click', () => {
      const gid = el.getAttribute('data-group-id');
      setHighlightedGroup(highlightedGroupId === gid ? null : gid);
    });
  });
  
  return {
    setHighlightedGroup,
    clear: () => setHighlightedGroup(null)
  };
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setupHighlighting };
}
