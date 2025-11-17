/**
 * hashRouter.js - Minimal hash-based router with simple param matching
 *
 * Usage:
 * const router = createRouter([
 *   { pattern: '/', handler: () => {} },
 *   { pattern: '/recipe/:id', handler: ({id}) => {} }
 * ]);
 * router.start();
 */

function createRouter(routes) {
  function normalize(hash) {
    if (!hash) return '/';
    let h = hash.replace(/^#/, '');
    if (!h) return '/';
    if (!h.startsWith('/')) h = '/' + h;
    return h;
  }

  function matchRoute(path, pattern) {
    const pSeg = pattern.split('/').filter(Boolean);
    const pathSeg = path.split('/').filter(Boolean);
    if (pSeg.length !== pathSeg.length) return null;
    const params = {};
    for (let i = 0; i < pSeg.length; i++) {
      const ps = pSeg[i];
      const xs = pathSeg[i];
      if (ps.startsWith(':')) {
        params[ps.slice(1)] = decodeURIComponent(xs);
      } else if (ps !== xs) {
        return null;
      }
    }
    return params;
  }

  function handleHashChange() {
    const raw = normalize(location.hash);
    for (const r of routes) {
      const params = matchRoute(raw, r.pattern === '/' ? '/' : r.pattern);
      if (params !== null) {
        try {
          r.handler(params || {});
        } catch (err) {
          console.error('Route handler error', err);
        }
        return;
      }
    }

    // If no route matched, try root
    const root = routes.find(rr => rr.pattern === '/' || rr.pattern === '');
    if (root) root.handler({});
  }

  return {
    start() {
      // handle initial
      handleHashChange();
      window.addEventListener('hashchange', handleHashChange, false);
    },
    navigate(path) {
      if (!path.startsWith('#')) path = '#' + (path.startsWith('/') ? path.slice(1) : path);
      location.hash = path;
    }
  };
}

// Export for Node tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createRouter };
}
