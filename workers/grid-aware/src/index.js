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
import { getLocation } from '@greenweb/gaw-plugin-cloudflare-workers';

export default {
	async fetch(request, env, ctx) {

		// First fetch the request
		const response = await fetch(request.url);
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


		  if (cookie && cookie.includes(`${COOKIE_NAME}=disable`)) {
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
		let cfData = getLocation(request);
		let { country } = cfData;

		// If the country is not found, return the response as is.
		if (!country) {
			return new Response(response.body, {
				...response,
				headers: {
					...response.headers,
					'grid-aware': 'Error - Country not found',
				},
			});
		}

		// Fetch the grid data for the country using the @greenweb/grid-aware-websites package
		const gridData = await gridAwarePower(country, env.EMAPS_API_KEY);

		// If the grid data is not found, return the response as is.
		if (gridData.status === 'error') {
			return new Response(response.body, {
				...response,
				headers: {
					...response.headers,
					'grid-aware': 'Error - Unable to fetch grid data',
				},
			});
		}

		// If the gridAware value is set to true, then let's modify the page
		if (gridData.gridAware) {
			// Check if the response is already stored in KV
			const cachedResponse = await env.GAW_CACHE.get(request.url);

			if (cachedResponse) {
				return new Response(cachedResponse, {
					...response,
					headers: {
						...response.headers,
						'Content-Type': 'text/html;charset=UTF-8',
						'grid-aware': 'true',
						'grid-aware-zone': gridData.region,
						'grid-aware-power-mode': gridData.data.mode,
						'grid-aware-power-minimum': gridData.data.minimumPercentage,
						'grid-aware-renewable-percentage': gridData.data.renewablePercentage,
						'grid-aware-cached': 'true',
					},
				});
			}

			let gridAwarePage = response
			/*
				Here you can use the HTMLRewriter API, or you can
				use other methods such as redirecting the user to a different page,
				or using a regular expression to change the CSS file used by the page.

				You can also import other libraries like Cheerio or JSDOM to modify the page
				if you are more comfortable with those.

				For this example, we will use the HTMLRewriter API to add a banner to the top of the page
				to show that this is a modified page.

				return new Response(new HTMLRewriter().on('html', {
					element(element) {
						element.prepend('<div>This is a modified page</div>', { html: true });
					},
				}).transform(response).body, {
					...response,
					contentType: 'text/html',
				});
			*/

			const modifyHTML = new HTMLRewriter().on('[data-gaw-remove]', {
				element(element) {
					element.remove();
				},
			}).on('body', {
				element(element) {
					element.setAttribute('class', 'deglitch');
				},
			});

			let modifiedResponse = new Response(modifyHTML.transform(gridAwarePage).body, {
				...gridAwarePage,
				headers: {
					...gridAwarePage.headers,
					'Content-Type': 'text/html;charset=UTF-8',
					// We can also add some of the grid-aware data to the headers of the response
					'grid-aware': 'true',
					'grid-aware-zone': gridData.region,
					'grid-aware-power-mode': gridData.data.mode,
					'grid-aware-power-minimum': gridData.data.minimumPercentage,
					'grid-aware-renewable-percentage': gridData.data.renewablePercentage,
					'grid-aware-cached': 'false',
				},
			});


			// Store the modified response in the KV for 24 hours
			await env.GAW_CACHE.put(request.url, modifiedResponse.clone().body, { expirationTtl: 60 * 60 * 24 });

			return modifiedResponse;
		}

		// If the gridAware value is set to false, then return the response as is.
		return new Response(response.body, {
			headers: {
				...response.headers,
				'Content-Type': 'text/html;charset=UTF-8',
				// We can also add some of the grid-aware data to the headers of the response
				'grid-aware': 'false',
				'grid-aware-zone': gridData.region,
				'grid-aware-power-mode': gridData.data.mode,
				'grid-aware-power-minimum': gridData.data.minimumPercentage,
				'grid-aware-renewable-percentage': gridData.data.renewablePercentage,
				'grid-aware-cached': 'false',
			},
		});
	},
};
