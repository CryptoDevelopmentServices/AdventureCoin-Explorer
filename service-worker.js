const cacheName = 'adv-explorer-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/img/favicon-192.png',
  '/img/favicon-512.png',
  '/wallet/index.html',
  '/wallet/multilang.js',
  '/wallet/bitcoinJS-lib.js',
  '/paper-wallets/walletgen.html',
  '/paper-wallets/wallets/sample1.png',
  '/paper-wallets/wallets/sample2.png',
  '/paper-wallets/wallets/sample3.png',
  '/paper-wallets/wallets/sample4.png',
  '/paper-wallets/wallets/sample5.png',
  // Add other files to cache as needed
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
