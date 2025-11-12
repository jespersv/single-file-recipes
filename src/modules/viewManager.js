/**
 * viewManager.js - Manage view switching between list and detail
 */

/**
 * Show recipe list view and hide detail view
 * @param {HTMLElement} listViewEl - List view container
 * @param {HTMLElement} detailViewEl - Detail view container
 */
function showListView(listViewEl, detailViewEl) {
  listViewEl.classList.remove('hidden');
  detailViewEl.classList.remove('active');
}

/**
 * Show recipe detail view and hide list view
 * @param {HTMLElement} listViewEl - List view container
 * @param {HTMLElement} detailViewEl - Detail view container
 */
function showDetailView(listViewEl, detailViewEl) {
  listViewEl.classList.add('hidden');
  detailViewEl.classList.add('active');
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { showListView, showDetailView };
}
