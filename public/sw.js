/**
 * Tombstone for the Gatsby service worker this domain served until Aug 2026.
 *
 * `gatsby-plugin-offline` installed an offline-first worker at this exact path,
 * and it is still registered in the browser of everyone who visited the old
 * site. Such a worker answers navigations from its own cache, so shipping a new
 * site does not reach those visitors — they keep seeing the old one until the
 * registration goes away.
 *
 * A worker can only be replaced by a worker, so this file takes over the path,
 * empties the caches its predecessor left behind, unregisters itself, and
 * reloads any open tab once so the reload lands on the real site.
 *
 * Safe to delete once pre-cutover traffic has aged out; keeping it costs a
 * 200 and nothing else.
 */

self.addEventListener("install", () => {
  // Don't wait for the old worker's clients to close before taking over.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      await self.registration.unregister();

      // Tabs currently controlled by the old worker are still showing its
      // cached shell; navigating them re-requests from the network.
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) client.navigate(client.url);
    })()
  );
});
