// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTUM · service-worker push handlers (DOC10 §4.4)
// ─────────────────────────────────────────────────────────────────────────────
// Imported into the vite-plugin-pwa generated SW via workbox.importScripts.
// Sends are PAYLOAD-LESS: the push event carries no data; we fetch today's
// date-based message from the push worker and show it. If the fetch fails
// (offline at receipt), a graceful generic reminder shows instead — browsers
// require a visible notification for every push received.
// ─────────────────────────────────────────────────────────────────────────────

const PUSH_MESSAGE_URL = 'https://elementum-push.jiaxinxuyago.workers.dev/message';

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let msg = {
      title: 'Elementum',
      body: "Today's elemental current is ready — see what it stirs in your chart.",
      url: '/#/app-today',
    };
    // Sends carry the message as an encrypted payload (RFC 8291 — required by
    // Apple's push service). Fall back to fetching it for legacy payload-less
    // pushes or if parsing fails.
    let havePayload = false;
    try {
      if (event.data) { msg = event.data.json(); havePayload = true; }
    } catch { /* not JSON — use the fetch path */ }
    if (!havePayload) {
      try {
        const res = await fetch(PUSH_MESSAGE_URL, { cache: 'no-store' });
        if (res.ok) msg = await res.json();
      } catch { /* offline — fall back to the generic reminder */ }
    }
    await self.registration.showNotification(msg.title, {
      body: msg.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'elementum-daily', // one per day — a re-push replaces, never stacks
      data: { url: msg.url || '/#/app-today' },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/#/app-today';
  event.waitUntil((async () => {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientList) {
      if ('focus' in client) { client.navigate(url); return client.focus(); }
    }
    return self.clients.openWindow(url);
  })());
});
