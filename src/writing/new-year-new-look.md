---
title: New year, new look.
summary: What better way for a nerd to start the new year than with a redesign of their website.
published: 2024-12-24
---

This one's been a while coming.

I've had "redesign website" on my mental to-do list for a very long while now. I've made starts on that side quest, but never got much beyond `npm install @11ty/eleventy`. That changed at the beginning of December this year, when I had a whole evening free at home and a blank code editor staring me in the face.

I'm really chuffed with how this website redesign has turned out. More than just a fresh lick of paint, the process has given me an opportunity to add new content to this site, and bring all the existing stuff into one repository. It's also proven to be a nice little playground for a few subtle grid-aware changes that I've had in mind. In this post, I'll go through some of the major changes and new additions that have been deployed with this new website.

## Sunsetting Sanity

I've been using [Sanity](https://sanity.io/) as a headless CMS (content management system) for my blog for many years. When I got back into blogging and freelance work in 2019 I wasn't really comfortable with Markdown, and so the thought of having a customisable, visual content editing environment for my blog sounded nice.

I've enjoyed building out my Sanity Studio, and it has given me a place to write pretty much all the content you see on this blog until today. But now, five years on, I'm at peace with Markdown and prefer writing in it when I can. Also, this past year, I've been feeling that the need to log in to an external website to write out my posts and ideas was starting to become a blocker to me actually getting content out there.

As I sat down to redesign this blog, one of the key things I wanted to do was bring _alllll_ the blog content I had on Sanity into Markdown files in this project's repository. With a bit of AI help to parse the HTML content from my previous blog and convert it to Markdown, as well as a bit regex and "replace all" action to tidy up the frontmatter, I was able to achieve that goal. I've also been able to go through and archive a few older posts that are no longer relevant.

So here's to hoping that I might be able to get out a few more blog posts in 2025!

## Bringing in notes

For a little over a year, I've been using [qt.fershad.com](https://qt.fershad.com) as a place to keep short notes, quick thoughts, monthly recaps, and link posts. Originally, I didn't want to have to log in to Sanity Studio for small things like that - hence the subdomain. The notes were kept in Markdown files, and were pretty quick to write up and publish.

Now that I was going to have all my blog writing in Markdown over here, it made sense to bring the notes content over too. That lift was much easier than the Sanity content, with the main time sink being how to display notes on the blog index page so that they are somewhat visually different from longer posts.

### New RSS feeds

With the content from my notes website now in this blog, the main RSS feed was going to be a lot busier. I wanted to give people the option to choose the kind of content they subscribe to. So now, on top of the main RSS feed [(/feed.xml)](/feed.xml), there's also a feed for posts [(/feed-posts.xml)], and notes [(/feed-notes.xml)](/feed-notes.xml). I've written about that in [a bit more detail](/writing/rss-feed-update/) earlier in the week.

## A glitchy new look

When I started out, I was going to make something with boxes and CSS Grid. Half-way through I scrapped all that and changed to a glitchy, pixelated design style. I've got no idea what made me go down that path. I ❤️ the [Departure Mono](https://departuremono.com/) font, and so was probably looking for a way to work that into my design. Looking for a way to achieve some kind of glitchy effect in pure CSS, I came across this 👇🏼 Codepen by F. Rilling which I've leaned mostly for the text-based glitching effects.

{% codepenIframe "vNJoMy" "Pure CSS Glitch Effect" "RillingDev" %}

### A dark-light theme

Something I've never had on any previous iteration of this website has been dark-light color theming. I always just felt like it was too much faffing about with CSS and JavaScript to get it to work.

I started out designing this site in a dark-only theme. But then I heard Chris and Dave on [ShopTalk Show](https://shoptalkshow.com) talking about the CSS `light-dark` function. From what they described, it sounded like that one bit of CSS could take out a load of complexity when it comes to theming a site. Boy oh boy were they right!

I'll blog about it later, but for now do yourself a favour and [check out the MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) for this thing.

### Changing favicons

This is just a silly thing to add a bit of randomness to the website. On each page load, a bit of JavaScript runs which loops through an array of emojis that represent important things in my life. It go through the array 10 times, before settling on an emoji at random and sets it as the favicon for that page.

### User controls

Pixelated fonts and glitching text, lines, and images, or changing favicons aren't everyone's idea of "cool web design". So for those users who need or want a less intense experience, I've add some controls to the top of the page that allow for those things to be turned off/on. There's also a button to change the site's color theme. Any changes made by the user are saved to the browser's local storage for the next time they visit.

## Reading list

I'm not a regular reader, and that's something I want to improve on over time. I've used [Readwise Reader](https://readwise.io/read) as an app to help with that, giving me a place to triage articles & documents, and then read them with the added ability to make highlights and annotations. Recently, I feel that I've been getting better at reading more consistently before bed, and in the morning while having coffee or waiting for breakfast at one of the shops we frequent near home.

It's also nice that [Readwise Reader has an API](https://readwise.io/reader_api) which I've been able to connect to. This has allowed me to explore surfacing the articles and documents I have been reading for others to discover as well. At the moment, they're just presented in a single list on the [/reading](/reading) page, but as time passes that might change. I've also toyed with the idea of having a blogroll, or some kind of list of folks whose content I've been reading on the regular.

The list gets updated whenever the site rebuilds, and there's also an option for users to refresh the list - in the event that the site's not been updated for a while, or if they're just super keen to see what I'm reading.

## A grid-aware website

If you've followed this blog for some time, you'll know that I [made this website carbon-aware](/writing/making-this-website-carbon-aware/) in early 2023. In recent months, I changed that to implement a new idea we're exploring at the Green Web Foundation - [Grid-aware Websites](https://www.thegreenwebfoundation.org/news/introducing-our-grid-aware-websites-project/).

A grid-aware website is one that adjusts how it functions based on how clean or dirty the energy grid on which it's being used is. I've written a bit of a longer explainer, including an overview of how it works, and what changes are applied on this site over on the [/grid-aware-site](/grid-aware-site) page. I'll definitely be writing a longer blog post about this in the coming weeks.

### Reducing work on the frontend and server

Both the initial grid-aware implementation on the previous version of this site, as well as the carbon-aware implementation before that, focused on changing functionality on the frontend to reduce the energy used when the site is served.

With this redesign, and inspired by some of the questions that are coming up through our Grid-aware Websites project, I've begun to also look at what can be done to reduce the server-side (CDN edge in my case) work that's being done to load the site as well. I've explored different ways to serve and cache content, and have some more ideas in my head that I want to explore. Again, more detail to come in future blog posts.

## Edit on GitHub link

Another upside of having all my content in Markdown, saved to a public GitHub repository is that it's allowed me to add an "Edit on GitHub" link to the bottom of each content page. It's a small thing, and I doubt it'll get much use, but it's something I've always wanted to have on my site. And now I do!

P.S. ~~If~~ When you see a typo, I'd love a PR to help fix it. 🙏🏼

## Stuff I might add later

It's on my mind to add a few more things to add on this website, but right now I've spent so much time with it that I just need a bit of a break. Things on my mind include:

- Site search using something like Pagefind.
- A blogroll, authors list, or something similar.
- Webmentions.

## What hasn't changed?

The one constant through all this change has been [Eleventy](https://11ty.dev). It's the 🐐, and I've got such huge admiration and thanks to the work that [Zach](https://www.zachleat.com/) and [all the team](https://github.com/11ty/eleventy/graphs/contributors) put into it..
