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
import { setResponseHeaders } from './helpers';

const excludedPaths = [
	'/wp-includes/',
	'/wp-content/',
	'/wp-admin/',
	'/contact?',
	'.php?'
];

const excludedExtenstion = [
	'.php',
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
			const resp = setResponseHeaders(response, gridData);
			return resp;
		}

		if (!gridData) {
			console.log('Fetching grid data for the country');
			// Fetch the grid data for the country using the @greenweb/grid-aware-websites package
			gridData = await gridAwarePower(country, env.EMAPS_API_KEY);

			// If the grid data is not found, return the response as is.
			if (gridData.status === 'error') {
				const resp = setResponseHeaders(response, gridData)
				return resp;
			}

			await saveDataToKv(env, country, JSON.stringify(gridData));
		} else {
			console.log('Using cached grid data');
		}

		// If the gridAware value is set to true, then let's modify the page
		if (gridData.gridAware) {
			// Check if the response is already stored in KV
			const cachedResponse = await fetchPageFromKv(env, request.url);
			// const cachedResponse = await env.GAW_CACHE.get(request.url);

			if (cachedResponse) {
				console.log('Returning cached response');
				const resp = setResponseHeaders(cachedResponse, gridData)
				resp.headers.append('GAW-Cached', 'true');
				resp.headers.append('Content-Type', 'text/html;charset=UTF-8');
				return resp;
			}

			console.log('Modifying the page');

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
					// We can also add some of the grid-aware data to the headers of the response
					'GAW-cached': 'false',
				},
			});


			// Store the modified response in the KV for 24 hours
			// await env.GAW_CACHE.put(request.url, modifiedResponse.clone().body, { expirationTtl: 60 * 60 * 24 });
			await savePageToKv(env, request.url, modifiedResponse.clone());
			const resp = setResponseHeaders(modifiedResponse, gridData);
			resp.headers.append('Content-Type', 'text/html;charset=UTF-8');
			resp.headers.append('GAW-Cached', 'false');
			return resp;
		}

		// If the gridAware value is set to false, then return the response as is.
		const resp = setResponseHeaders(response, gridData);
		resp.headers.append('Content-Type', 'text/html;charset=UTF-8');
		resp.headers.append('GAW-Cached', 'false');
		return resp;
	},
};
