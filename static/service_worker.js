"use strict";
const CACHE_NAME = 'cr_app_12';

const cacheUrls = [
	"",
	"/",
	"css/style.css",
	"build_main.js",
	"/build_test.js",
	"/about",
	"/leaderboard",
	"https://fonts.googleapis.com/css?family=Pangolin"
];

self.addEventListener('install', (event) => {
	//console.log('install', event);

	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(cacheUrls);
			})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request);
		})
	);
});

