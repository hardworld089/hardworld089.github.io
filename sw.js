//Asignar un nombre y version al cache

const CACHE_NAME = 'v1_cache_102';
//archivos a guardar
var urlsToChache=[
    './',
    'https://hardworld089.github.io/index.html',
    './sw.js',
    './manifest.json',
    './css/slider.css',
    './css/styles.css',
    './js/nav-menu.js',
    './img/',
];

//install

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            cache.addAll(urlsToChache)
            .then(()=>{
                self.skipWaiting();
            })
        })
        .catch(err =>{
            console.log('no se guardo cache mi compa',err);
        })
    )
});

self.addEventListener('activate', e=>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName=>{
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(()=>{

        })
    );
});

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if (res) {
                return res;
            }
            return fetch(e.request);
        })
    )
})