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
            '/login.html',
            '/template.html',
            '/img/Card 1.svg',
            '/img/Card 2.svg',
            '/img/Card 3.svg',
            '/img/Logo.png',
            '/js/app.js',
            'https://img.freepik.com/free-photo/colorful-confetti-sprinkles-textured-background_53876-31921.jpg?w=2000',
            'https://www.londonperfect.com/blog/wp-content/uploads/2018/09/7-Sweet-Shops-In-London-by-London-Perfect1.jpg'
        ])
    }); 
    event.waitUntil(Promise.all([inmutablePromise, staticPromise]))
})

self.addEventListener('fetch', (event)=>{

    if(event.request.url.includes("https://")){
        event.respondWith(fetch(event.request))
    }else{
        event.respondWith(caches.match(event.request))
    }
})