"use strict";
const CACHE_NAME = "cr_app_2k17_deploy-freeze";

const cacheUrls = [
	"",
	"/",
	"/build_offline.js",
	"/fonts/pangolin-v1-latin_cyrillic-regular.woff",
	"/fonts/pangolin-v1-latin_cyrillic-regular.woff2",
	"/fonts/pangolin-v1-latin_cyrillic-regular.eot",
	"/fonts/pangolin-v1-latin_cyrillic-regular.ttf",
	"/fonts/pangolin-v1-latin_cyrillic-regular.svg",
	"https://croco2017.herokuapp.com/best/",
	"/leaderboard",
	"/about",
	"/manifest.json"
];

self.addEventListener("install", (event) => {
	//console.log('install', event);
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(cacheUrls);
			})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (/https:\/\/croco2017\.herokuapp\.com\/best\//.test(event.request.url)) {
				return fetch(event.request)
					.catch(error => {
						if (cachedResponse) {
							return cachedResponse;
						}
					})
			}

			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request)
				.catch(error => {
					if (/\/build_main\.js/.test(event.request.url)) {
						return caches.open(CACHE_NAME).then((cache) => {
							return cache.match("/build_offline.js").then((cachedResponse) => {
								return cachedResponse;
							})
						});
					}
					else {
						throw Error('');
					}
				})
		})
	)
});
