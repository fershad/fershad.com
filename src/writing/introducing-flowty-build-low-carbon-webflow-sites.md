---
title: 'Introducing Flowty - Build low carbon, self-hosted Webflow sites'
published: 2022/04/29
archived: true
archiveNote: >-
  Due to a legal notice from Webflow, the Flowty project can no longer be
  publicly accessed.
permalink:  /writing/introducing-flowty-build-low-carbon-webflow-sites/
summary: >-
  Webflow is a great service for designers who want to create amazing websites
  for clients. It does leave a few things on the table when it comes to web
  sustainability though. Flowty gives designers who build with Weblow the power
  to create fast, low-carbon, self-hosted sites in minutes.
---

{% callout "Update 24 March 2023" %}
Due to a legal notice from Webflow, the Flowty project can no longer be publicly accessed. Please note that some website links, and Github links in this post may not work as expected.
{% endcallout %}

[Webflow](https://webflow.com/) is a really nice service for designers on the web. It couples a drag and drop builder with options to add more granular configurations on elements. It really allows web designers to create beautiful websites without getting too much into the technical weeds.

That said, this ease can sometimes come at the cost of web sustainability. Webflow sites are hosted on Amazon Web Services (AWS). Although AWS has taken steps to improve the sustainability of their services, they still have a way to go. Webflow itself is also currently lacking a few optimisations that would allow designers to build truly sustainable sites.

## Nerd sniped

The idea for creating optimised, low carbon Webflow sites goes back a couple of months to a conversation in the [Climate Action Tech community](https://climateaction.tech/). A post from [designer Katy Jackson](https://www.suninthecorner.com/) triggered my curiosity. Katy is focused on delivering low-carbon, sustainable websites for her clients. As part of this, she was looking for a sustainable option to host the sites she builds with Webflow.

After some back and forth, and with Katy trying other services that allow Webflow sites to be self-hosted, we jumped on a call. Chatting with her, and getting a sense of how these other services worked, I began to think “heck, I could probably spin up something that could solve this”. I had officially nerd sniped myself.

## The idea behind Flowty

With Flowty, you still use Webflow’s design and editing tools to build, publish, and maintain sites. Flowty’s code then takes your Webflow site, runs the pages through the [Eleventy static site generator](https://www.11ty.dev/), and applies a series of optimisations to the page content and assets. Flowty outputs sites as good old fashioned HTML files. This allows sites to be hosted almost anywhere. Through this flexibility, plus the optimisations applied, Flowty can help designers deliver more sustainable, low carbon Webflow sites for their clients.

## What does Flowty optimise?

In deciding how to allow Flowty to be configured, I wanted to keep things as simple as possible. Designers should be allowed to focus their efforts on creating amazing sites for their clients, not having to hand-roll website code and manually optimise images. For that reason, I have chosen to build an online dashboard that will provide a no code way for designers to select the optimisations to apply on their sites.

Via the dashboard, designers can turn on/off the following optimisations:

### Image optimisations

- **Download:** Images can be downloaded, and served from the same domain as the website itself. This helps with performance, and ensures they are hosted sustainably if a green web host is used.
- **Modern formats:** At the time of writing, Webflow does not serve WebP or AVIF versions of images. Flowty runs all images through an optimisation step and serves modern formats with a fallback for older browsers.
- **Optimise background images:** Background images that are requested via CSS also get downloaded locally, and run through an optimisation step to reduce their size.

### CSS optimisations

- **Download:** Like images, Flowty also downloads Webflow CSS files and serves them locally.
- **Inline critical CSS:** An optional step to help with performance. Flowty extracts the CSS required for the initial rendering of a page, and inlines it into the HTML.
- **Remove unused CSS:** An optional step that should be used with care. Flowty checks each page, and generates a file CSS that includes only the declarations required by that page. This can greatly reduce the CSS file size for some pages.

### JavaScript optimisations

- **Download:** The same idea as CSS and images. Flowty downloads both the Webflow JS and jQuery files used by a site.
- **Remove:** Some sites don’t much interactivity. In these cases, designers can save kilobytes by removing the Webflow JS or jQuery files from the site.
- **Minify:** Sites on Webflow’s free plan come with unminified JS. Flowty runs a minification step on the Javascript files it downloads, to reduce their transfer size.

### Font optimisations

- **Download:** Webflow allows designers to use Google Fonts or upload their own custom fonts. Flowty downloads these font files and hosts them on the same origin as the site itself.

### **Video optimisations**

- **Download:** Background videos uploaded to Webflow are downloaded by Flowty and served locally.
- **Optimise Youtube embeds:** Flowty uses the [Lite Youtube Embed package](https://github.com/paulirish/lite-youtube-embed) to significantly reduce the amount of data consumed by embedded Youtube videos when a page is first loaded.

## A few added extras

One top of having the option to host a Webflow site on a sustainable hosting provider, plus the optimisations mentioned above, Flowty has a few extra bonuses that designers can leverage.

- Download website metadata (icons, open graph images etc) and host them locally.
- Use [instant.page](http://instant.page/) to improve site navigation.
- Add custom code to the `head` and `body` of a site (currently available in Webflow only through a paid plan).
- Remove the “Made in Webflow” branding on pages.
- Generate sitemap and robots.txt.

As the web platform continues to evolve, I’ll be looking at how to bring in more sustainability and performance optimisations into Flowty.

## Show me some results

Glad you asked! In testing with some sites, I’ve seen multiple megabyte reductions in page size. On others the gains are less significant. To test things out for myself, I built a simple landing page for Flowty using Webflow. You can visit it at [https://flowty.site](https://flowty.site/).

Saying it’s just a simple page is a bit of disservice. It does include a background image, and a Youtube embed for good measure. The Webflow hosted version (which [you can find here](https://flowty-landing-page.webflow.io/)) comes in at 1.2mb. Using Flowty, and hosting on Cloudflare pages, the size of the page come down to just 125kb. It’s worth noting that the Flowty version of the site also includes a [Fathom Analytics](https://usefathom.com/ref/CEHKLY) (affiliate link) script that is added to the site via the custom code configuration option in Flowty.

Even with that additional script we’re able to get more than 1MB off the size of the page, and host it on Cloudflare Pages, one of the more sustainable options for static site CI/CD hosting. Pretty neat.

~~## Want to find out more?

Flowty will be open to a very early access set of alpha users in May. If you’re building sites with Webflow and would like to see a demo, then head over to the [Flowty landing page](https://flowty.site/) and use the link at the bottom (or drop me an email)!

**Update Sept 25, 2022:** Flowty is now an open source project. It is also no longer maintained, updated, or supported. Recent actions by Webflow towards similar paid services have made me decide to stop work on this project. By making the code available, I hope that those who do care about web sustainability, but want/need to use Webflow can still have a means to build & host their site sustainably.~~
