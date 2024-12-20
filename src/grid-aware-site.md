---
title: Grid-aware site
layout: layouts/post.liquid
css: post.css
permalink: grid-aware/index.html
isPage: true
---

## This website is grid-aware

The concept of a grid-aware website is one where the content/user experience of a site changes depending on some fuel mix of the user's electricity grid. Implementing grid awareness on this website is part of the [Grid-aware Websites project](https://www.thegreenwebfoundation.org/news/introducing-our-grid-aware-websites-project/) that we are developing at Green Web Foundation.

## Jargon buster

There was a bit of jargon in that first sentence, and there might be more further down the page. So here's a summary of some key terms:

- **Grid-aware:** A grid-aware product/tool/service reacts to certain properties of an electricity grid. These could be the types of fuel used to generate power (fossil fuels, renewables, nuclear) or other measures.
- **Fuel mix:** A term used to describe the balance of renewable, low-carbon, and fossil fuel energy used to generate the electricity of a particular region or electricity grid.
- **Cloudflare Workers:** A code execution platform that is globally deployed and runs on CDN edge nodes.

## What makes this site grid-aware?

All of the magic that makes this website grid-aware is thanks to [Cloudflare Workers](https://developers.cloudflare.com/workers), [Electricity Maps](https://www.electricitymaps.com/), and the [Grid-aware Websites](https://github.com/thegreenwebfoundation/grid-aware-websites) library.

When someone visits this website, the following process is kicked off:

1. A Cloudflare Worker checks the request.
2. The [Grid-aware Websites Cloudflare Plugin](https://github.com/thegreenwebfoundation/grid-aware-websites/tree/main/plugins/edge/cloudflare) is run to get the origin country of the request (that is, the country the website visitor is based in).
3. The Grid-aware Websites library is then used to:
   - Fetch data about the current power breakdown of that region from the Electricity Maps API.
   - Determine if the amount of "low-carbon" power (i.e. renewables plus nuclear) is lower than 50%.
   - If so, then it will return a status of `gridAware: true`.
   - This tells the Cloudflare Worker that the page should be modified to make it "low impact" before it is returned to the user.

If at any point along in that process there is no data available, something goes wrong, or `gridAware: false` is returned then the original web page will be shown.

### What gets modified on the site?

When the grid-aware flag is set on this website, the following changes are made inside the Cloudflare Worker before the page is returned to the user:

- Images are pixelated.
    - Visitors can click to download better quality versions of any image if they need to.
- Remove AVIF images, since decoding AVIF images for display can also take up more CPU power than other formats.
- Non-critical JavaScript is removed from the site. This includes:
    - Analytics scripts are removed.
    - Progress bars when reading blog posts.
    - Share links (using the Navigator.share API).
    - Instant.page script.
    - JavaScript that creates CodePen embeds. The embeds are replaced with a link to the pen.

## Open source

The [Grid-aware Websites](https://github.com/thegreenwebfoundation/grid-aware-websites) library is open-source on GitHub. There is also [a repository with a demo website](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare) that can be deployed to Cloudflare Pages, which also includes [an example Cloudflare Worker](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare?tab=readme-ov-file#example-worker) that's setup to help people get started.
