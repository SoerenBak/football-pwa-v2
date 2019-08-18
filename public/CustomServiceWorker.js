const cacheName = 'trans-v1';

const cacheAssets = [
  'index.html',
  'style3.css',
  'CustomServiceWorker.js'
]

const cacheImages = [
  '/images/site/adidas.png',
  '/images/icons/icon-144x144.png',
  '/images/site/arrow-logo.png',
  '/images/site/fly.png',
  '/images/site/logo.png'
]

self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
    e.waitUntil(
      caches
        .open(cacheName)
        .then(cache => {
          console.log('Service Worker: Caching Files');
          cache.addAll(cacheAssets);
          cache.addAll(cacheImages);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activated', e => {
  console.log('Service Worker: Activated');
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        )
      })
    )
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})

self.addEventListener('push', function (event) {
  const data = event.data.json();
  console.log("Getting push data", data);
  event.waitUntil(
      self.registration.showNotification(data.text, {
          title: data.msg,
          body: 'Arsenal Transfer: Just now',
          vibrate: [500, 100, 500],
          icon: 'https://vectr.com/tmp/a3z24jmieI/a1vkZ86mG.png?width=126&height=125&select=a1vkZ86mGpage0'
      })   
  );
});

