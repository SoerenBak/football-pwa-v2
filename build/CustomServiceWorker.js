console.log("Custom Service Worker!!");

self.addEventListener('install', event => {
    console.log('The service worker is being installed.');
});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'images',
  }),
); 

workbox.routing.registerRoute('https://trans-pwa.herokuapp.com/',
  new workbox.strategies.NetworkFirst(),
  'GET'
);

workbox.routing.registerRoute('https://trans-pwa.herokuapp.com/transfers',
  new workbox.strategies.NetworkFirst(),
  'GET'
);

workbox.routing.registerRoute('https://trans-pwa.herokuapp.com/getTrans',
  new workbox.strategies.NetworkFirst(),
  'GET'
);

/*
workbox.routing.registerRoute('https://trans-pwa.herokuapp.com/createTrans',
   new workbox.strategies.NetworkFirst(),
  'POST'
);
*/

workbox.routing.registerRoute('https://trans-pwa.herokuapp.com/api/push_message',
  new workbox.strategies.NetworkFirst(),
  'POST'
);

self.addEventListener('push', function (event) {
  const data = event.data.json();
  console.log("Getting push data", data);
  event.waitUntil(
      self.registration.showNotification(data.text, {
          body: data.msg,
          vibrate: [500, 100, 500],
          icon: 'https://vectr.com/tmp/a3z24jmieI/a1vkZ86mG.png?width=126&height=125&select=a1vkZ86mGpage0'
      })   
  );
});

