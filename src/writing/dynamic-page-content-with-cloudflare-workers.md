---
title: Dynamic page content with Cloudflare Workers
published: 2021/05/24
permalink:  /writing/dynamic-page-content-with-cloudflare-workers/
summary: >-
  A brief guide on how Cloudflare Workers can allow you to add random content to
  your website without client-side JavaScript.
---

{% callout "Disclaimer" %}
This post contains affiliate links for some products/services.
{% endcallout %}

I recently went about giving my website a small redesign. This mainly involved a fresh lick of paint and a revised layout. One other aim I had was to minimise the amount of client-side JavaScript required by my site.

## A brief background

My website is built with [Eleventy](11ty.dev), a static site generator that gives a tonne of power to developers. Eleventy outputs the pages on my site as good old fashion HTML pages. The content is already rendered on each site build. This is great for performance and sustainability - especially for a site like mine that is mainly written content with a long shelf-life.

## Handling dynamic content

But how about when I do need to include some dynamic content on the site? It's impossible to avoid using JavaScript, but my plan all along was to keep it to a minimum. I use client-side JavaScript in the following places on the site:

- For analytics using [Fathom](https://usefathom.com/ref/CEHKLY)​
- To speed up navigation with [instant.page](http://instant.page)​
- To keep track of website carbon estimates on each page view
- In some blog posts for CodePen embeds or syntax highlighting

On most pages, that comes to 11kB of JavaScript (compressed). I'm happy with that, and want to avoid adding to it.

So I had a small problem when I decided it would be a good idea to have some randomised client testimonials on different pages of the site. I wanted these testimonials to be randomly selected from a pool of quotes, but also wanted them to (possibly) change on each page view. This meant that randomly generating them at build time wasn't an option.

## Including content in HTML on-the-fly

In order to achieve what I wanted, I needed to find a way to modify the HTML that was being returned on each page view. That's where Cloudflare Workers come in handy. Workers allow you to intercept and modify HTTP requests and responses. That was exactly what I needed. It would allow me to add randomly selected quotes to a page and return that to the user without a single line of client-side JavaScript!

Here's the Workers code to achieve this. You can see it in action on my [homepage](https://fershad.com/) and [services page](https://fershad.com/services/).

<!-- markdownlint-disable -->
{% codeToHtml "js", "index.js"%}
const quotes = [
    {
    quote: 'Numbers tell more than words: As a result to his involvement and actions, the time to first byte when starting the app was cut by 75%. This had an immediate impact on user satisfaction and revenue.',
    client: `Christian Schraeder, Founder of <a href="https://readle-app.com/">Readle App</a>`,
    },
    {
    quote: 'Fershad has transformed the journey and engagement of visitors on our website. The new homepage design delivers significant improvements in key web performance measurements as well as introducing a more attractive and intuitive interface that helps people navigate the site better.',
    client: `Ben Hall, Marketing Manager at <a href="https://www.displaylink.com/">DisplayLink</a>`,
    },
    {
    quote: "Fershad is passionate about sustainability, and his enthusiasm for the topic and deep knowledge of the web development space make him a really valuable partner. His insights are really practical and particularly important for today's businesses to grow responsibly.",
    client: `Annalee Bloomfield, CEO of <a href="https://www.sustain.life/">Sustain.Life</a>`,
    },
]

class quoteHandler {
    async element(element) {
        const item = quotes[Math.floor(Math.random() * quotes.length)]
        element.setInnerContent(`<blockquote>${item.quote}</blockquote><figcaption>${item.client}</figcaption>`, {
            html: true,
        })
    }
}

async function handleRequest(req) {
    const res = await fetch(req)
    const rewritter = new HTMLRewriter().on('#client-quote', new quoteHandler())
    return rewritter.transform(res)
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
{% endcodeToHtml %}
<!-- markdownlint-enable -->

These are some basic use cases for Cloudflare Workers HTMLRewriter. It feel powerful, as a frontend developer, to be able to control and manipulate data at the edge. Reducing the burden on end-users and their devices, while allow us to deliver faster more sustainable websites.
