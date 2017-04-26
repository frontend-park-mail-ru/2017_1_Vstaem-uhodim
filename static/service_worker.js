"use strict";
const CACHE_NAME = "cr_app_27";

const cacheUrls = [
	"",
	"/",
	"css/style.css",
	"/about",
	"https://fonts.googleapis.com/css?family=Pangolin",
	"https://fonts.gstatic.com/s/pangolin/v1/S-1BH_7IXzlH4pDCWaJVlPesZW2xOQ-xsNqO47m55DA.woff2",
	"https://fonts.gstatic.com/s/pangolin/v1/WEdvnHsn-aHe-ZJn_sH99hTbgVql8nDJpwnrE27mub0.woff2",
	"/build_offline.js"
];

self.addEventListener("install", (event) => {
	console.log('install', event);

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
			return fetch(event.request)
				.catch(error => {
					if (event.request.url === "http://localhost/build_main.js") {
						return caches.open(CACHE_NAME).then(function (cache) {
							return cache.match("http://localhost/build_offline.js").then((cachedResponse) => {
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





