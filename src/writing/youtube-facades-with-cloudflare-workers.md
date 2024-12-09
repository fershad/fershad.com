---
title: YouTube facades with Cloudflare Workers
published: 2022/06/24
permalink:  /writing/youtube-facades-with-cloudflare-workers/
summary: >-
  YouTube embeds can added megabytes of data to a website, even if they are not
  watched by the user. This post looks at a way to use Cloudflare Workers plus a
  facade to reduce that initial data load.
---

[Lazy load third-party resources with facades](https://web.dev/third-party-facades/). That’s one of the recommendations you might have come across when running your site through Google Lighthouse audits. Using facades can greatly reduce the amount of data downloaded, and (at times) computation required, when a page first loads.

YouTube embeds are a very good use case for facades. Out of the box, a regular YouTube embed downloads around 1MB of data as a page loads. Not just that, but a lot of this data is in the form of JavaScript which the browser also has to parse and execute.

In most cases, a facade will load a placeholder image & pull in the rest of the content only if the user clicks to view the video. In this way, both data download and execution is deferred until it’s actually needed.

## Using facades without modifying the source

Ideally, you’d be able to modify the source code for a web page to replace YouTube embeds with facade. But what if you can’t? That’s a question that I was having a think about last week.

Often, in audits I run, reducing the impact of YouTube videos is one of the key sustainability findings that emerges. Sometimes, the website owners I work with are in a position to make changes to address that.

But what about when they’re not able to? I was wrestling with that last week, and realised this is a perfect use case for edge functions. So, I wrote up a quick Cloudflare Worker as a proof of concept.

## YouTube Lite Worker

You can find the code for [this Cloudflare Worker on GitHub](https://github.com/fershad/yt-lite-worker). It relies on Cloudflare Worker’s HTML Rewriter API and Cheerio.js to do most of the heavy lifting. It replaces standard YouTube iframes, with [justinribeiro/lite-youtube](https://github.com/justinribeiro/lite-youtube) implementation. Let’s take a quick walk through the code.

<!-- markdownlint-disable -->
{% codeToHtml "javascript" %}
import * as cheerio from 'cheerio';

const ytIdRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

function getID(url) {
  var match = url.match(ytIdRegex);
  return (match && match[7].length == 11) ? match[7] : false;
}

async function findIframes(req) {
  const html = await req.text()
  try {
    const $ = cheerio.load(html)

    const iframes = $('iframe[src*="youtube"]')
    for (const iframe of $(iframes)) {
      let src = $(iframe).attr('src')
      const id = await getID(src)
      const className = $(iframe).attr('class')
      const params = new URL(src).searchParams.toString()

      if (id) {
        const lite = `<lite-youtube class="${className || ''}" videoid="${id}" nocookie params='${params}'> </lite-youtube>`
        $(iframe).replaceWith(lite)
      }
    }

    return $.html()
  } catch {
    console.log('Error parsing html')
    return html
  }
}

class addJS {
  async element(element) {
    element.append(`<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1.3.1/lite-youtube.js"></script>`, {
      html: true,
    })
  }
}

async function handleRequest(req) {
  const acceptHeader = req.headers.get('accept');

  if (acceptHeader && acceptHeader.indexOf('text/html') >= 0) {
    const url = new URL(request.url);
    const res = await fetch(url)
    const html = await findIframes(res);
    const newRes = new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      }
    });


    const rewritter = new HTMLRewriter().on('body', new addJS())

    return rewritter.transform(newRes)
  }

  return fetch(req.url, req)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
{% endcodeToHtml %}
<!-- markdownlint-enable -->

Starting from the bottom, this Worker would sit on a route waiting for `fetch` requests to be made. When a request is made, the Worker sends it to the `handleRequest()` function to perfom some action on it.

The `handleRequest()` function is where all the work happens. First, we check to see if the request being made is for a HTML page. If it’s not, we just pass it through without any modifications.

If we are dealing with a HTML request, then we fetch that page’s content. We then pass that to the `findIframes()` function. In there, Cheerio.js is used to parse the HTML of the page, looking for `iframe` tags with a `src` attribute that contains the string `youtube`. When matching iframes exist, we loop through them, parse the `src` to extracting some parameters like the YouTube video ID. Then, we build the `<lite-youtube>` web component that replaces the YouTube iframe in the HTML.

Once all this is done (within a few tens of milliseconds), the HTML then gets returned to user. From the user’s perspective, they’ll see the same web page as they would have originally. But under the hood, the browser has been able to avoid the overhead of downloading and parsing extra content to show the YouTube videos.

## The same can be done for Vimeo

I’ve also created a [similar repository for Vimeo](https://github.com/fershad/vimeo-lite-worker) embeds. It works much in the same way as described above. That said, Vimeo doesn’t seem to send down *as much* data initially when compared to YouTube, so the sustainability and performance upsides are less pronounced.
