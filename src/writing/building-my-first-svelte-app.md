---
title: Building my first app with Svelte 3
published: 2020/04/07
archived: true
archiveNote: >-
  Svelte is now up to version 5, so you probably want to read up about that
  instead.
permalink:  /writing/building-my-first-svelte-app/
summary: >-
  After doing a few tutorials last month, I finally got around to creating my
  first app in Svelte. In this blog post I go through some of my first
  impressions on the framework as I start building with the training wheels
  taken off!
---

{% callout Archived %}
Svelte is now up to version 5, so you probably want to read up about that instead. The [Svelte docs](https://svelte.dev/) are a really good place to start.
{% endcallout %}

Last month I started learning about Svelte. I'd heard a bit about it as a framework, and from what I could see it was quick and easy to get started with.

To start with I took Scott Tolinski's [Svelte for Beginners](https://www.leveluptutorials.com/tutorials/svelte-for-beginners) tutorial series. It took me through everything I needed to know about building web apps with Svelte 3. The fact that we also built a small quiz app with it allowed me to see just what might be possible with Svelte as a framework. It got my mind ticking over.

What impressed me most about Svelte was that it's pretty much vanilla JavaScript, HTML and CSS. Of course there are smatterings of Svelte's syntax & the Svelte way of doing things, but they're not hard to pick up. So if you know these three languages, then you can jump right in and start building with Svelte.

So, after doing some more reading and a couple more tutorials I decided to just go ahead and make my first Svelte web app.

Code and Example

**Site:** [https://markdown.fershad.com](https://markdown.fershad.com)

**Source:** [https://github.com/fishintaiwan/markdown-cheatsheet](https://github.com/fishintaiwan/markdown-cheatsheet)

## The idea

Markdown is something I've started using more now that I develop full-time. That said, I always find myself reaching for Google whenever I am writing Markdown notes. I'm often searching for ways to do things. How do I add an image? How do I add a block of code? What about a quote?

So the idea I had was to create a small, filterable cheat sheet for myself. Making it with Svelte, I planned for it have some kind of filtering functionality. Finally I also wanted it to run as a Progress Web App (PWA).

## Building in Svelte

All told the project took me a bit over two days to complete. Having never used Svelte before, I felt that most of the issue I faced would be around the framework and syntax. I was wrong. So, so wrong. I spent most of my time solving layout issues, and filling up the raw data that the app would use.

Figuring out how to filter the data was probably the most challenging part of the whole process from a Svelte perspective. I toyed with the idea of using a library like [Isotope](https://isotope.metafizzy.co/) to handle this, but wasn't able to get it working with the layout that I wanted. I finally decided to just build my own filter in JavaScript and pass data to it through Svelte [event dispatchers](https://svelte.dev/docs#createEventDispatcher). It works well, albeit without the graceful animation that Isotope can provide.

Looking back it was incredibly straightforward to build my first app in Svelte, despite having little prior experience with the framework.

## Some more thoughts on Svelte

Before going on here, you should definitely give Ryan Atkinson's [analysis of Svelte's pros and cons](https://github.com/feltcoop/why-svelte) a read. Especially if you work on larger projects, or come from a Vue/React background and aren't sure if Svelte is the right choice for you. There's also a very good [Syntax.fm episode](https://syntax.fm/show/173/hasty-treat-wes-and-scott-look-at-svelte-3) on it.

### Compiler = versatility

One of the things I live about Svelte is that it's a compiler. It takes components, and outputs them as pure JavaScript. In a Svelte project you can add the `bundles.js` file that it outputs onto an index.html page you're go to go!

What this also means is that you can build something with Svelte, then take the output and put in into something like a static website. It's an idea I'm flirting with right now to create a few custom landing pages for my website. The idea of building them in Svelte and just adding the compiled files into my Eleventy project is pretty appealing.

### You can still use PostCSS, SCSS, Typescript etc

Out of the box Svelte requires that you use code in vanilla JavaScript and CSS. You can quickly extend that to support most popular preprocessors like PostCSS, SCSS, Coffeescript and Typescript. Using the [Svelte Preprocess](https://github.com/kaisermann/svelte-preprocess) plugin means you don't have to forgo your preferred development language just because you're using Svelte.

### Thorough docs, tutorials, and examples

If you're trying to get started with Svelte, then have a nosey around [https://svelte.dev](https://svelte.dev). The site contains a thorough tutorial series which you can go through to learn the fundamentals of the framework. The docs and examples are also great sources of reference as you go through the process of building your first few apps.

## Closing

As you can tell, I'm definitely going to be using Svelte again for projects in the future. While I don't have any plans at the moment to switch this site over to Svelte, I do have a few other small web apps in mind. I can also see myself turning to Svelte if I needed a more interactive landing page or microsite created for a client.
