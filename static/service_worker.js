"use strict";
const CACHE_NAME = 'cr_app_12';

const cacheUrls = [
	"",
	"/",
	"css/style.css",
	"build_main.js",
	"/build_test.js",
	"/about",
	"/leaderboard"
];

self.addEventListener('install', function(event) {
	console.log('install', event);

	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll(cacheUrls);
			})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(cachedResponse) {
			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request);
		})
	);
});



