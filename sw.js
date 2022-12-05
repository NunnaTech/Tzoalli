importScripts("https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js")
importScripts("./js/utils/sw-db.js")

const STATIC_CACHE = 'static-v1.0'
const DYNAMYC_CACHE = 'dynamic-v1.0'
const INMUTABLE_CACHE = 'inmutable-v1.0'

const clearCache = (cacheName, maxItemSize) => {
    caches.open(cacheName).then((cache) => {

        return cache.keys().then((items) => {

            if (items.length >= maxItemSize) {

                cache.delete(items[0]).then(() => {
                    clearCache(cacheName, maxItemSize)
                })

            }

        })

    })
}

self.addEventListener('install', (event) => {
    const inmutablePromise = caches.open(INMUTABLE_CACHE)
        .then((cache) => {
            return cache.addAll([
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdn.jsdelivr.net/npm/daisyui@2.42.1/dist/full.css',
                'https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css',
                'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
                'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
                'https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js'
            ])
        });

    const staticPromise = caches.open(STATIC_CACHE)
        .then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/dashboard.html',
                '/observations.html',
                'add-observation.html',
                '/order.html',
                '/products.html',
                '/current-products.html',
                '/completed-visits.html',
                '/next-visits.html',
                '/pending-visits.html',
                '/template.html',

                '/js/modules/CompletedVisitModule.js',
                '/js/modules/NextVisitModule.js',
                '/js/modules/PendingVisitModule.js',
                '/js/modules/LoginModule.js',
                '/js/modules/LogoutModule.js',
                '/js/modules/ProductModule.js',
                '/js/modules/OrderModule.js',
                '/js/modules/ProductsInOrderModule.js',
                '/js/modules/ObservationModule.js',
                '/js/modules/AddObservationModule.js',

                '/js/services/ObservationService.js',
                '/js/services/OrderService.js',
                '/js/services/ProductService.js',
                '/js/services/LoginService.js',
                '/js/services/VisitService.js',

                '/js/utils/api.js',
                '/js/utils/sw-db.js',
                '/js/utils/offline.js',
                '/js/utils/notiflix-3.2.5.min.css',
                '/js/utils/notiflix-3.2.5.min.js',

                '/js/app.js',
                '/sw.js',

                '/tailwind.config.js',
                '/dist/output.css',
                '/manifest.json',

                '/images/Card 1.svg',
                '/images/Card 2.svg',
                '/images/Card 3.svg',
                '/images/Logo.png',
                '/images/london.jpg',
                '/images/candies.png',
                '/images/dulce-blueprint.png',
                '/images/icons/android-launchericon-48-48.png',
                '/images/icons/android-launchericon-72-72.png',
                '/images/icons/android-launchericon-96-96.png',
                '/images/icons/android-launchericon-144-144.png',
                '/images/icons/android-launchericon-192-192.png',
                '/images/icons/android-launchericon-512-512.png',
            ])
        });
    event.waitUntil(Promise.all([inmutablePromise, staticPromise]))
})

self.addEventListener('activate', (event) => {
    const promDeleteCaches = caches.keys().then((items) => {
        items.forEach((key) => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(promDeleteCaches);
});


self.addEventListener('fetch', (event) => {
    if (event.request.clone().method === 'POST' || event.request.clone().method === 'PUT') {
        let genericResponse = fetch(event.request.clone())
            .then((response) => {
                return response
            })
            .catch((err) => {
                console.log("[SIN CONEXIÓN] ", err)
                return event.request.clone().json().then((json) => {
                    return savePostOffline(
                        json,
                        event.request.url,
                        event.request.method,
                        event.request.headers.get("Authorization")
                    )
                })
            })

        event.respondWith(genericResponse)
    } else {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    caches.open(DYNAMYC_CACHE).then((cache) => {
                        cache.put(event.request, networkResponse);
                    })
                    return networkResponse.clone()
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        )
    }
})

self.addEventListener('sync', (event) => {

    if (event.tag == "online") {
        event.waitUntil(
            getAllPostOffline().then((document) => {
                document.rows.map((item, i) => {
                    fetch(item.doc.url, {
                        method: item.doc.method,
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': item.doc.token
                        },
                        body: JSON.stringify(item.doc.body)
                    })
                        .then((response) => {
                            db.remove(item.doc._id, item.doc._rev);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })

            })
        )
    }


})


