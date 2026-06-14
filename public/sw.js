/*
 * Self-unregistering service worker (kill switch).
 *
 * This site does NOT use a service worker. However, some browsers still have
 * one registered from a previous version of the site (or another project that
 * ran on the same origin, e.g. localhost), so they keep requesting /sw.js and
 * get a 404. Serving this no-op worker lets those browsers fetch a valid
 * script that immediately unregisters itself and clears any old caches, fully
 * removing the stale worker. For fresh visitors nothing registers this file,
 * so it simply sits unused.
 */
self.addEventListener('install', () => {
  // Activate immediately instead of waiting for existing clients to close.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Remove any caches left behind by the previous service worker.
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (e) {
        // ignore
      }

      // Unregister this worker so it never runs again.
      try {
        await self.registration.unregister();
      } catch (e) {
        // ignore
      }

      // Reload open tabs once so they drop the controlled (stale) state.
      try {
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach((client) => client.navigate(client.url));
      } catch (e) {
        // ignore
      }
    })()
  );
});

// No fetch handler -> all requests pass through to the network normally.
