const STATIC_CACHE = 'static-v1.0'
const DYNAMYC_CACHE = 'dynamic-v1.0'
const INMUTABLE_CACHE = 'inmutable-v1.0'

self.addEventListener('install',(event)=>{
    const inmutablePromise = caches.open(INMUTABLE_CACHE)
    .then((cache)=>{
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdn.jsdelivr.net/npm/daisyui@2.31.0/dist/full.css',
            'https://cdn.tailwindcss.com'
        ])
    });

    const staticPromise = caches.open(STATIC_CACHE)
    .then((cache)=>{
        return cache.addAll([
            '/',
            '/index.html',
            '/dashboard.html',
            '/template.html',
            '/js/app.js',
            '/sw.js',
            '/manifest.json',
            '/images/Card 1.svg',
            '/images/Card 2.svg',
            '/images/Card 3.svg',
            '/images/Logo.png',
            '/images/icons/android-launchericon-48-48.png',
            '/images/icons/android-launchericon-72-72.png',
            '/images/icons/android-launchericon-96-96.png',
            '/images/icons/android-launchericon-144-144.png',
            '/images/icons/android-launchericon-192-192.png',
            '/images/icons/android-launchericon-512-512.png',
            'https://img.freepik.com/free-photo/colorful-confetti-sprinkles-textured-background_53876-31921.jpg?w=2000',
            'https://www.londonperfect.com/blog/wp-content/uploads/2018/09/7-Sweet-Shops-In-London-by-London-Perfect1.jpg'
        ])
    }); 
    event.waitUntil(Promise.all([inmutablePromise, staticPromise]))
})

//Only cache
self.addEventListener('fetch', (event)=>{
    event.respondWith(caches.match(event.request))
})