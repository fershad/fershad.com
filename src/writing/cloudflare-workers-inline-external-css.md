---
title: Using Cloudflare Workers to inline external CSS
published: 2021/10/08
---

CSS is render blocking. What I mean by that is that when the browser comes across a section of CSS on a page, it will stop what it's doing and start working on parsing the CSS. This happens with both CSS in external files, as well as CSS in `<style>` tags.

That makes sense, right. CSS is what makes the web beautiful. It provides layout, typography, colour schemes and a lot more. So naturally the browser wants to make sure it gets all the layout and style information from the CSS before it goes on with parsing the HTML.

So why might we want to inline CSS in a `<style>` versus fetching it via a `<link>` tag? The biggest benefit comes not having to wait for the CSS to download before it can be parsed. Since the `<style>` tag is inside the HTML document itself, it'll come along with the initial page request. This can really help improve First & Largest Contentful Paint times (FCP & LCP).

In an ideal world, you'd have a build step that generates critical CSS for a page and inlines that in the `<head>` of the document. All other CSS can be loaded asynchronously using a `<link>` tag. The world often isn't ideal though.

## Enter Cloudflare Workers

Cloudflare Workers allow you to intercept page requests, and using the HTMLRewriter API you can modify the content of a page before sending it to the browser. Using Workers we can find any synchronous external stylesheets on a page, and replace their `<link>` tag with CSS inlined with a `<style>` tag.

The script below is a simplified example of how to do this. One thing to note first:

- The script below finds any `<link rel="stylesheet">` tag and replaces them (in the same position within the HTML) with a `<style>` tag.

{% codeToHtml js, "worker.js"%}
// worker.js

addEventListener('fetch', (event) => {
event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
const response = await fetch(url.toString(), request);

    return new HTMLRewriter().on('link[rel="stylesheet"]', new cssInline('href')).transform(response);

}

async function fetchCSS(url) {
const response = await fetch(url);
return response.text();
}

class cssInline {
constructor(attributeName) {
this.attributeName = attributeName;
}

    async element(element) {
      const attribute = element.getAttribute(this.attributeName);
      if (attribute) {
        const styles = await fetchCSS(attribute);
          element.replace(`<style>${styles}</style>`, {
            html: true,
          });
      }
    }

}
{% endcodeToHtml %}
