// sw.js
const MODULE_CACHE_NAME = 'ubento-module-cache-v1';
const MODULE_ROUTE_PREFIX = '/__ubento_modules/';

// Hold the registry info (baseUrl, headers) in memory for the active session
let registryInfo = null;

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Take control of the page immediately
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept ONLY requests meant for our module manager
  if (url.pathname.startsWith(MODULE_ROUTE_PREFIX)) {
    event.respondWith(handleAuthenticatedFetch(event, url));
  }
});

/**
 * Uses a MessageChannel to request fresh registry info from the specific
 * client (iframe) that triggered this fetch event.
 */
async function requestTokenFromIframe(clientId) {
  const client = await clients.get(clientId);
  if (!client) throw new Error("Cannot find client to request token");

  return new Promise((resolve) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = (messageEvent) => {
      resolve(messageEvent.data);
    };

    client.postMessage({ type: 'REQUEST_TOKEN' }, [channel.port2]);
  });
}

/**
 * Handles the Cache-First strategy, falling back to an authenticated network fetch.
 */
async function handleAuthenticatedFetch(event, url) {
  const request = event.request;
  
  // ----------------------------------------------------------------
  // 1. CACHE CHECK (No authentication required!)
  // ----------------------------------------------------------------
  const cache = await caches.open(MODULE_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Instant load. Bypass all network and token logic.
    sendCodeToClient(event.clientId, cachedResponse.clone());
    return cachedResponse;
  }

  // ----------------------------------------------------------------
  // 2. TOKEN RESOLUTION
  // ----------------------------------------------------------------
  // If we reach here, it's a Cache Miss. We MUST hit the network.
  if (!registryInfo) {
    // Pause execution and ask the iframe for registry info
    registryInfo = await requestTokenFromIframe(event.clientId);
  }

  // ----------------------------------------------------------------
  // 3. NETWORK FETCH
  // ----------------------------------------------------------------

  if (!registryInfo || !registryInfo.registryModuleUrlTemplate) {
    throw new Error("Registry info or registryModuleUrlTemplate not loaded");
  }

  const filename = url.pathname.replace(MODULE_ROUTE_PREFIX, '');
  const [id, versionedExt] = filename.split('@');
  const versionId = versionedExt.replace('.js', '');
  
  const remoteUrl = new URL(
    registryInfo.registryModuleUrlTemplate
      .replace('{module_id}', id)
      .replace('{version_id}', versionId)
      .replace('{filename}', 'index.js')
  );

  
  let networkResponse = await fetch(remoteUrl, {
    headers: registryInfo.headers
  });

  // ----------------------------------------------------------------
  // 4. AUTO-RETRY ON EXPIRATION
  // ----------------------------------------------------------------
  if (networkResponse.status === 401) {
    // Token expired! Request a fresh one and retry immediately.
    registryInfo = await requestTokenFromIframe(event.clientId);
    
    if (!registryInfo || !registryInfo.registryModuleUrlTemplate) {
      throw new Error("Registry info or registryModuleUrlTemplate not loaded on retry");
    }

    const retryUrl = new URL(
      registryInfo.registryModuleUrlTemplate
        .replace('{module_id}', id)
        .replace('{version_id}', versionId)
        .replace('{filename}', 'index.js')
    );

    networkResponse = await fetch(retryUrl, {
      headers: registryInfo.headers
    });
  }

  // Handle generic network failures
  if (!networkResponse.ok) {
    console.error(`Module Fetch Error: ${networkResponse.status}`);
    return new Response(`throw new Error("Failed to load module: ${networkResponse.status}");`, {
      status: 500,
      headers: { 'Content-Type': 'application/javascript' }
    });
  }

  // ----------------------------------------------------------------
  // 5. CACHE WRITE & RETURN
  // ----------------------------------------------------------------
  const responseToCache = networkResponse.clone();
  
  // Force the correct MIME type for ES Module execution
  const finalHeaders = new Headers(responseToCache.headers);
  finalHeaders.set('Content-Type', 'application/javascript');
  
  const code = await responseToCache.text();
  const finalResponse = new Response(code, {
    status: networkResponse.status,
    statusText: networkResponse.statusText,
    headers: finalHeaders
  });

  // Save to cache asynchronously so we don't block the return
  event.waitUntil(cache.put(request, finalResponse.clone()));

  sendCodeToClient(event.clientId, code);

  return finalResponse;
}

/**
 * Sends module source code to the client runtime via postMessage.
 */
async function sendCodeToClient(clientId, responseOrCode) {
  if (!clientId) return;
  try {
    const client = await clients.get(clientId);
    if (client) {
      const code = typeof responseOrCode === 'string' ? responseOrCode : await responseOrCode.text();
      client.postMessage({
        type: 'MODULE_LOADED',
        code: code
      });
    }
  } catch (error) {
    console.error('Failed to send code to client:', error);
  }
}