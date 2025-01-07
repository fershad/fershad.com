---
title: Grid-aware site
layout: layouts/post.liquid
permalink: grid-aware-site/index.html
isPage: true
ghEdit: true
---

## This website is grid-aware

The concept of a grid-aware website is one where the content/user experience of a site changes depending on some fuel mix of the user's electricity grid. Implementing grid awareness on this website is part of the [Grid-aware Websites project](https://www.thegreenwebfoundation.org/news/introducing-our-grid-aware-websites-project/) that we are developing at Green Web Foundation.

## Jargon buster

There was a bit of jargon in that first sentence, and there might be more further down the page. So here's a summary of some key terms:

- **Grid-aware:** A grid-aware product/tool/service reacts to certain properties of an electricity grid. These could be the types of fuel used to generate power (fossil fuels, renewables, nuclear) or other measures.
- **Fuel mix:** A term used to describe the balance of renewable, low-carbon, and fossil fuel energy used to generate the electricity of a particular region or electricity grid.
- **Cloudflare Workers:** A code execution platform that is globally deployed and runs on CDN edge nodes.

## What makes this site grid-aware?

Below is a short version of how this site is grid-aware. For a longer read with more detail, see the block post [_Making this website respond to your local energy grid_](/writing/making-this-website-grid-aware)

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

- Glitch animations are removed.
- The [https://departuremono.com/](Depature Mono webfont) is replaced with [System Font alternatives](https://modernfontstacks.com/).
- **_Most_ JavaScript is removed**. That includes:
    - Filters and controls on the [/writing](/writing) and [/reading](/reading) pages.
    - Site controls to "deglitch", "depixelate", and switch themes.
    - Functionality that fetches a random image in the Film section of the homepage.
    - Functionality to refresh the list of articles on the [/reading](/reading) page and on the homepage.
    - The silly random emoji favicon code that runs on each page.
- Codepen embeds are replaced with links to the project on Codepen itself.

There is also a banner shown at the top of the page, which allows visitors to learn more about the grid-aware changes they're seeing (this page). It also allows them to opt-out and view the regular site. That is controlled by a cookie that expires after one day.

{% callout About analytics %}
You might have noticed that disabling analytics is missing from the list above. I use Fathom Analytics on this website, and have decided to keep it on when other grid-aware changes are applied. Why? Because, grid-aware websites is a new idea we're working on at the Green Web Foundation, and I'd like to be able to see how many people are getting that experience, and how many are also opting-out.
{% endcallout %}

## Open source

The [Grid-aware Websites](https://github.com/thegreenwebfoundation/grid-aware-websites) library is open-source on GitHub. There is also [a repository with a demo website](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare) that can be deployed to Cloudflare Pages, which also includes [an example Cloudflare Worker](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare?tab=readme-ov-file#example-worker) that's setup to help people get started.
