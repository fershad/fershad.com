/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import auto from '@greenweb/gaw-plugin-cloudflare-workers';

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

// This is the main function that fetches the user's location, fetches the grid data, and determines what page (regular or grid-aware) to return the to the user.
export default {
	async fetch(request, env, ctx) {
		// Check if the request URL contains any of the spammy paths & return a 404 response.
		if (spammyPaths.some((path) => requestUrl.includes(path))) {
			return new Response(null, { status: 404 });
		}

		return auto(request, env, ctx, {
			debug: 'headers',
			gawDataApiKey: env.EMAPS_API_KEY,
			locationType: 'latlon',
			kvCacheData: true,
			kvCachePage: true,
			ignoreRoutes: spammyPaths,
		});
	},
};
