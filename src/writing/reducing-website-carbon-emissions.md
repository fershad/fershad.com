---
title: Reducing website carbon emissions
published: 2021/09/29
permalink:  /writing/reducing-website-carbon-emissions/
summary: >-
  As our thirst for data, connectivity, and content grows, so does the portion
  of global carbon emissions attributed to the internet. In this post, we'll
  take a look at the steps frontend developers can take to make sites more
  efficient and better for the planet.
---

I've [written about the carbon impact of the internet before](https://fershad.com/writing/the-environmental-case-for-website-performance/). Here's a quick recap:

- Global information and communication technology (ICT) accounts for around [4% of global CO2 emissions](https://theshiftproject.org/wp-content/uploads/2019/03/Lean-ICT-Report_The-Shift-Project_2019.pdf).
- Just over one-third of that is attributable to data centers and networks (i.e. the internet).
- Some forecasts put ITC as high as 8% of global carbon emissions by 2025 if left unchecked.
- For a bit of perspective, if the internet were a country it would be the 6th largest polluter.

A lot of the carbon impact from websites and apps comes from data centers and networks. So how do we, as frontend developers, go about reducing the carbon emissions associated with what we build?

## Start by measuring

If you want to improve an existing website, then start off by getting a sense of its current impact. Using tools like [Website Carbon Calculator](https://www.websitecarbon.com/), [Beacon](https://digitalbeacon.co/), or [EcoPing](https://ecoping.earth/) you can get an estimate of carbon emissions for a given web page. By using these figures alongside your site's analytics you can estimate your total carbon emissions.

{% callout "Note" %}
You should consider whatever figures you get from these tools as the **_minimum estimated_** carbon emissions for a web page. They are all based on data transferred for the initial page load, and so do not take into account lazy-loaded images, javascript, or other data that might be fetched through user interaction.
{% endcallout %}

## Emissions reductions starts with design

There are a lot of things you can do when designing a new website or app that can ensure you start from a base that's already optimised for lower emissions.

### Use energy efficient colours

This helps reduce the energy a user's device consumes when using your site or app. Consider a darker colour palette or offering a dark mode option (you can switch to this automatically based on user preferences too!). Interestingly, blues are about [25% more energy intensive than reds or greens](https://www.youtube.com/watch?v=N_6sPd0Jd3g).

### Seriously question jumbotron videos, hero images, and image carousels

Large autoplay videos at the top of web pages force an incredible amount of data to be transferred over the network. Often these videos are purely aesthetic. Ask yourself if it's really needed, or if you can instead play the video only if the user interacts with it. [Justdiggit](https://justdiggit.org/) have a really creative example of this practice on their homepage.

The same applies for large hero images or carousels. Carousels, in particular, can result in multiple images being downloaded some of which may never be seen by the user. Plus, there's evidence that they're [not as effective](https://thegood.com/insights/ecommerce-image-carousels/) as your marketing manager might think. If you've got no option but to use a carousel/hero image then ensure its optimised (more on this later), and that any images not required for the initial page load are lazy loaded.

### Reduce the number of fonts used

In an ideal world you'd be using only system fonts for your site's content. That would mean no additional data download for end users. A lot of the time that's not possible, so ensure the fonts you are using a kept to a minimum, and are optimised. This will improve your site's Core Web Vitals too. I've [written about font optimisation](https://fershad.com/writing/introduction-to-optimising-web-fonts/) in an earlier issue.

## Green hosting plus a CDN

Hosting your site on a green provider can go a long way to reducing your site's footprint. The more people who move to green web hosts, the stronger the message will be to the rest of the industry that green options should become the norm.

The Green Web Foundation maintain a [directory of verified green web hosts](https://www.thegreenwebfoundation.org/directory/). You can reference this list to find a provider in your region, or one that's located close to your customers.

Back up your hosting strategy with a CDN that can cache static content closer to your users. By doing so you reduce the amount of electricity required for data transmission. Some providers like [Cloudflare](https://blog.cloudflare.com/cloudflare-committed-to-building-a-greener-internet/) and [Akamai](https://www.akamai.com/company/corporate-responsibility/sustainability) have varying degrees of sustainability commitments outlined on their websites.

## Optimise images

Images often make up the bulk of data transferred for a web page. Effective image optimisation can instantly take megabytes off the total size of your page. This topic is really deep, and I've written more about it [previously in my newsletter, Optimised](https://optimised.email/issues/issue-5-optimising-images-reducing-image-size). A quick checklist of impactful optimisations:

- Use modern image formats like AVIF or WebP.
- Compress JPEG and PNG images.
- Refrain from using GIFs.
- Lazy-load any images that are not visible when the page initially loads.
- Properly size images based on how they appear in the viewport.
- Use an image CDN to take care of most of the above for you 😉.

Taking this a step further, you can even use lightweight images as placeholders and load a higher quality image one user interaction. [Organic Basics' low impact website](https://lowimpact.organicbasics.com/usd/products/accessories-recycled-wool-starter-pack) is a great example of this practice in action.

## Other significant steps you can take

The above few items can take a long way towards ensuring your website or app has a small carbon impact. Below is a list of a few extra steps that will move the needle even further.

- Use facades for heavy content like videos or JavaScript dependent widgets. Load the actual content only when the users interacts with the element.
- Minify your CSS & JS. Check that any third-party code you use is also minified.
- Ensure you have GZIP or Brotli compression enabled on your host or CDN.
- Set [effective cache headers](https://csswizardry.com/2019/03/cache-control-for-civilians/) for static assets.
- If you're running a WordPress website, check if your host or CDN can help you cache HTML pages. This will also improve your performance, and reduce the load on your server too!

## Systemic change is needed

Let's be real. Reducing the carbon emissions of my personal website, with its 700 odd pageviews each month, isn't going to make a difference. However, if we as a web community can increase awareness of the impacts that our sites, apps, and platforms are having then we'll be in a better place to drive system-level change.

A sustainable web is also a faster web. By standardising sustainable web development practices, we can as an industry do our part to provide a cleaner more sustainable future for the planet.
