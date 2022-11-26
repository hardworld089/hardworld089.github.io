//Asignar un nombre y version al cache

const CACHE_NAME = 'v1_cache_baconKingdon';
//archivos a guardar
var urlsToChache=[
    'https://hardworld089.github.io/',
    'https://hardworld089.github.io/index.html',
    'https://hardworld089.github.io/sw.js',
    'https://hardworld089.github.io/jquery.js',
    'https://hardworld089.github.io/manifest.json',
    'https://hardworld089.github.io/css/slider.css',
    'https://hardworld089.github.io/css/styles.css',
    'https://hardworld089.github.io/js/nav-menu.js',
    'https://hardworld089.github.io/img/',
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