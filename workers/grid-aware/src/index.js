/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { gridAwarePower } from '@greenweb/grid-aware-websites';
import { getLocation, savePageToKv, fetchPageFromKv, saveDataToKv, fetchDataFromKv } from '@greenweb/gaw-plugin-cloudflare-workers';

const excludedPaths = [
	'/wp-includes/',
	'/wp-content/',
	'/wp-admin/',
	'/contact?',
	'.php?',
	'/ueditor/',
	'/Ueditor/',
	'/php-cgi/',
	'/wp-json/'
];

const excludedExtenstion = [
	'.php',
	'.php7',
]





export default {
	async fetch(request, env, ctx) {

		const requestUrl = request.url;

		if (excludedPaths.some((path) => requestUrl.includes(path))) {
			return new Response(null, { status: 404 });
		} else if (excludedExtenstion.some((ext) => requestUrl.endsWith(ext))) {
			return new Response(null, { status: 404 });
		}


		// First fetch the request
		const response = await fetch(request.url, {
			method: "GET",
		});

		try {
			// Then check if the request content type is HTML. If not, return the request and headers as is.
			const contentType = response.headers.get('content-type');

			// Check if the content type is HTML.
			// If not, return the response as is.
			if (!contentType || !contentType.includes('text/html')) {
				return new Response(response.body, {
					...response,
				});
			}

			const COOKIE_NAME = "gaw-status";
			const cookie = request.headers.get("cookie");


			  if ((cookie && cookie.includes(`${COOKIE_NAME}=disable`)) || request.url.includes("/og/?") || request.url.includes("/api/") || request.url.includes("/img/")) {
				// if user has rejected the grid-aware site
				return new Response(response.body, {
					...response,
					headers: {
						...response.headers,
						'grid-aware': 'opt-out',
					},
				});
			  }


			// Get the country of the user from the Cloudflare data
			const cfData = await getLocation(request, {
				"mode": "country"
			})

			let { country } = cfData;

			// If the country is not found, return the response as is.
			if (!country) {
				return new Response(response.body, response);
			}

			let gridData = await fetchDataFromKv(env, country).then((data) => { return JSON.parse(data) });

			if (gridData?.status === 'error') {
				return new Response(response.body, {
					...response,
					headers: {
						...response.headers,
						'GAW-Status': 'error',
						'GAW-Error': gridData?.message,
						'GAW-Cached-Data': 'true',
					},
				});
			}

			if (!gridData) {
				// Fetch the grid data for the country using the @greenweb/grid-aware-websites package
				gridData = await gridAwarePower(country, env.EMAPS_API_KEY, {
					mode: "low-carbon",
				});

				// If the grid data is not found, return the response as is.
				if (gridData.status === 'error') {
					return new Response(response.body, {
						...response,
						headers: {
							...response.headers,
							'GAW-Status': 'error',
							'GAW-Error': gridData.message,
							'GAW-Cached-Data': 'false',
						},
					});
				}

				await saveDataToKv(env, country, JSON.stringify(gridData));
			}

			let gawHeaders = {
				'GAW-grid-aware': 'true',
				'GAW-region': gridData.region,
				'GAW-mode': gridData.data.mode,
			}

			if(gridData.data.mode === "renewable" || gridData.data.mode === "low-carbon") {
				gawHeaders['GAW-Percentage'] = gridData.data.renewablePercentage || gridData.data.lowCarbonPercentage
				gawHeaders['GAW-Minimum'] = gridData.data.minimumPercentage
			  } else if (gridData.data.mode === "average") {
				gawHeaders['GAW-Current-Intensity'] = gridData.data.carbonIntensity
				gawHeaders['GAW-Average-Intensity'] = gridData.data.averageIntensity
			  } else if (gridData.data.mode === "limit") {
				gawHeaders['GAW-Current-Intensity'] = gridData.data.carbonIntensity
				gawHeaders['GAW-Minimum-Intensity'] = gridData.data.minimumIntensity
			  }

			// If the gridAware value is set to true, then let's modify the page
			if (gridData.gridAware) {
				// Check if the response is already stored in KV
				const cachedResponse = await fetchPageFromKv(env, request.url);
				// const cachedResponse = await env.GAW_CACHE.get(request.url);

				if (cachedResponse) {
					return new Response(cachedResponse, {
						...response,
						headers: {
							...response.headers,
							'Content-Type': 'text/html;charset=UTF-8',
							'GAW-cached-page': 'true',
							...gawHeaders
						},
					});
				}

				/*
					Here you can use the HTMLRewriter API, or you can
					use other methods such as redirecting the user to a different page,
					or using a regular expression to change the CSS file used by the page.

					You can also import other libraries like Cheerio or JSDOM to modify the page
					if you are more comfortable with those.
				*/

				// Remove the elements with the data-gaw-remove attribute & add a class to deglitch the page.
				const modifyHTML = new HTMLRewriter().on('[data-gaw-remove]', {
					element(element) {
						element.remove();
					},
				}).on('body', {
					element(element) {
						element.setAttribute('class', 'deglitch');
					},
				});

				let modifiedResponse = new Response(modifyHTML.transform(response).body, {
					...response,
					headers: {
						...response.headers,
						'Content-Type': 'text/html;charset=UTF-8',
						...gawHeaders
					},
				});


				// Store the modified response in the KV for 24 hours
				// await env.GAW_CACHE.put(request.url, modifiedResponse.clone().body, { expirationTtl: 60 * 60 * 24 });
				await savePageToKv(env, request.url, modifiedResponse.clone());
				return modifiedResponse;
			}

			// If the gridAware value is set to false, then return the response as is.
			return new Response(response.body, {
				...response,
				headers: {
					...response.headers,
					'GAW-Cached-Page': 'false',
					...gawHeaders
				}
			})
		} catch (error) {
			console.error(error);
			return new Response(response.body, {
				...response,
				headers: {
					...response.headers,
					'GAW-error': "Fatal error"
				}
			});
		}
	},
};
