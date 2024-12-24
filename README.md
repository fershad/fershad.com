# Fershad.com

Personal website & blog of Fershad Irani.

This website is built with 11ty. After cloning the repository and running `npm install`, you can:

1. Run `npm run start` to serve the site locally.
2. Run `npm run build` to build the website

Below are links to some parts of this website that people might find interesting.

## Grid-awareness

This site uses the `@greenweb/grid-aware-websites` library inside of a Cloudflare Worker. The code checks the local energy grid of a user, and if it is using < 50% renewable energy the Worker makes changes to the site before returning it to the browser.

The Worker setup can be found in the [/workers/grid-aware](/workers/grid-aware/) folder, with the main code in the [/workers/grid-aware/src/index.js](/workers/grid-aware/src/index.js) file.

Modified page responses are cached in Cloudflare Workers KV for 24 hours.

## On-demand open graph images

Social media open graph images are generated for each page on-demand, and cached in a Cloudflare Workers KV store for 1 year. The code to do this can be found in the [/browser-worker](/browser-worker/) folder, and closely follows the [tutorial in the Cloudflare Docs](https://developers.cloudflare.com/browser-rendering/get-started/screenshots/).
