const STATIC_CACHE = 'static-v1.0'
const DYNAMYC_CACHE = 'dynamic-v1.0'
const INMUTABLE_CACHE = 'inmutable-v1.0'

const clearCache = (cacheName, maxItemSize) => {
    caches.open(cacheName).then((cache) => {

        cache.keys().then((items) => {

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
                'https://cdn.jsdelivr.net/npm/daisyui@2.31.0/dist/full.css',
                'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
                'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
            ])
        });

    const staticPromise = caches.open(STATIC_CACHE)
        .then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/dashboard.html',
                '/observations.html',
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

                '/js/services/ProductService.js',
                '/js/services/LoginService.js',
                '/js/services/VisitService.js',

                '/js/utils/api.js',
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


//self.addEventListener('fetch', (event) => {
//    
//})

//Only cache
//self.addEventListener('fetch', (event) => {
//    event.respondWith(caches.match(event.request))
//})

//Cache with network fallback
self.addEventListener('fetch', (event) => {
    let call = null
    //Cache with network Fallbacks

    call = caches.match(event.request).then((cacheResponse) => {
        //Si existe el recurso en cache, retorna el recurso
        if (cacheResponse) {
            return cacheResponse
        }

        //Si no, va a internet  
        return fetch(event.request).then((response) => {
            caches.open(DYNAMYC_CACHE).then((cache) => {
                cache.put(event.request, response)
                clearCache(DYNAMYC_CACHE, 50)
            })
            return response.clone()
        })
    }).catch((err) => {
        console.log("[ERROR]: ", err)
    })

    event.respondWith(call);

})