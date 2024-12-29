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


// Spammy paths that I don't want to serve the content for.
const spammyPaths = [
	'/wp-includes/',
	'/wp-content/',
	'/wp-admin/',
	'/contact?',
	'.php?',
	'/ueditor/',
	'/Ueditor/',
	'/php-cgi/',
	'/wp-json/',
	'.php',
	'.php7',
];

export default {
	async fetch(request, env, ctx) {

		// Get the request URL
		const requestUrl = request.url;

		// Check if the request URL contains any of the spammy paths & return a 404 response.
		if (spammyPaths.some((path) => requestUrl.includes(path))) {
			return new Response(null, { status: 404 });
		}


		// Fetch the request URL
		const response = await fetch(requestUrl, {
			method: "GET",
		});

		try {
			const contentType = response.headers.get('content-type');

			// Check if the content type is HTML.
			// If not, return the response as is.
			if (!contentType || !contentType.includes('text/html')) {
				return new Response(response.body, {
					...response,
				});
			}

			// Okay, we've got an HTML response.
			// Let's check if the user has opted out of the grid-aware website.
			// We do this by looking for a cookie named "gaw-status" with the value "disable".
			const COOKIE_NAME = "gaw-status";
			const cookie = request.headers.get("cookie");

			// If the cookie is found, or the request URL contains "/og/?" or "/api/" or "/img/", then return the response as is.
			// We don't want to modify the content for these requests.
			  if ((cookie && cookie.includes(`${COOKIE_NAME}=disable`)) || requestUrl.includes("/og/?") || requestUrl.includes("/api/") || requestUrl.includes("/img/")) {
				return new Response(response.body, {
					...response,
					headers: {
						...response.headers,
						'grid-aware': 'opt-out',
					},
				});
			  }


			// Since there's no opt-out, we can now check the user's location to determine the grid data.
			// We'll use the Cloudflare Workers plugin (@greenweb/gaw-plugin-cloudflare-workers) to get the user's country.
			const cfData = await getLocation(request, {
				"mode": "country"
			})

			let { country } = cfData;

			// If the country is not found, return the response as is.
			if (!country) {
				return new Response(response.body, response);
			}

			// Check to see if we've already got the grid data for the country in a Cloudflare Workers KV.
			// Again, we'll use the Cloudflare Workers plugin to perform this check.
			let gridData = await fetchDataFromKv(env, country).then((data) => { return JSON.parse(data) });

			// If we've got cached data that is an error, return the response as is, with additional headers.
			// We'd likely get an error message if we're checking for a country that Electricity Maps has no data for.
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

			// If we don't have cached data, fetch the grid data for the country using the @greenweb/grid-aware-websites package.
			if (!gridData) {
				// The grid data is fetched using the gridAwarePower function from the @greenweb/grid-aware-websites package.
				// That function also runs some logic to determine if the current status of the user's energy grid warrants activating the grid-aware flag.
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

				// Save the grid data to the Cloudflare Workers KV for 1 hours.
				// We'll use the Cloudflare Workers plugin to perform this action. The plugin sets an expirationTtl of 1 hour by default, but this can be changed.
				await saveDataToKv(env, country, JSON.stringify(gridData));
			}

			// This is a bit of extra (optional) code that adds headers to the response based on the grid data.
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

			// If the grid aware flag is triggered (gridAware === true), then we'll return a modified HTML page to the user.
			if (gridData.gridAware) {
				// First, check if we've already got a cached response for the request URL. We do this using the Cloudflare Workers plugin.
				const cachedResponse = await fetchPageFromKv(env, request.url);

				// If there's a cached response, return it with the additional headers.
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

				// If there's no cached response, we'll modify the HTML page.

				/*
					Here you can use the HTMLRewriter API, or you can
					use other methods such as redirecting the user to a different page,
					or using a regular expression to change the CSS file used by the page.

					You can also import other libraries like Cheerio or JSDOM to modify the page
					if you are more comfortable with those.
				*/

				// For my website, I'm using the HTMLRewriter API to remove elements with the data-gaw-remove attribute.
				// I'm also adding a class to the body to deglitch the page.
				const modifyHTML = new HTMLRewriter().on('[data-gaw-remove]', {
					element(element) {
						element.remove();
					},
				}).on('body', {
					element(element) {
						element.setAttribute('class', 'deglitch');
					},
				});

				// Transform the response using the HTMLRewriter API.
				let modifiedResponse = new Response(modifyHTML.transform(response).body, {
					...response,
					headers: {
						...response.headers,
						'Content-Type': 'text/html;charset=UTF-8',
						'GAW-cached-page': 'false',
						...gawHeaders
					},
				});


				// Store the modified response in the KV for 24 hours
				// We'll use the Cloudflare Workers plugin to perform this action. The plugin sets an expirationTtl of 24 hours by default, but this can be changed
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
			// If there's an error, return the response as is with an additional header.
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
