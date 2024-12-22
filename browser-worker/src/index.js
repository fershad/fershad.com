/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import puppeteer from "@cloudflare/puppeteer";

export default {
  async fetch(request, env) {
    const { searchParams } = new URL(request.url);
    let title = searchParams.get("title");
		let page = searchParams.get("page");

		// Decode the page string
		page = decodeURIComponent(page);

		const url = "https://beta.fershad.com/og/?title=" + title + "&page=" + page;
    let img;
    if (title) {
      img = await env.FERSHAD_OG_IMAGES.get(`${page}_${title}`, { type: "arrayBuffer" });
      if (img === null) {
        const browser = await puppeteer.launch(env.MYBROWSER);
        const page = await browser.newPage();
		page.setViewport({
			width: 1200,
			height: 630,
			deviceScaleFactor: 2,
		});
        await page.goto(url);
        img = await page.screenshot();
        await env.FERSHAD_OG_IMAGES.put(`${page}_${title}`, img, {
          // cache for 1 year
					expirationTtl: 60 * 60 * 24 * 365,
        });
        await browser.close();
      }
      return new Response(img, {
        headers: {
          "content-type": "image/jpeg",
        },
      });
    } else {
      return new Response("Please add an ?title= parameter");
    }
  },
};
