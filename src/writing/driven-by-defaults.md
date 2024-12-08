---
title: Driven by defaults
published: 2022/11/25
permalink:  /writing/driven-by-defaults/
summary: >-
  I’ve been thinking about how we can drive broader change to make the web more
  sustainable and performant. As I’ll get into, I believe a large part of that
  comes from the defaults set by the tools and services we use.
---

When talking with folks about web sustainability, there are often two tracks of conversation that we regularly venture down. The first stems from people just being unaware of the physical impact of our digital lives. The other, is often a variation on “but my \[website/app/digital presence\] is so small, changing that won’t make a difference anyway”.

Often, all I can say back is “yeah, you’re probably right”. Because, especially when it comes to web sustainability, our sites are not silos. A more sustainable web requires _all_ website owners to be moving in the same direction. Thinking about this, and the scale of the web, it sounds like an impossible task.

That’s where, I believe, defaults have a vital role to play.

## It starts with requirements

Developers have a lot of decisions to make, even when building what might look like a “simple” website. In most cases they’ll have a visual mockup/wireframe provided by a designer, as well as specifications provided by the person requesting the website. Then comes question, after question. What stack/framework/database should be used? Should this site be SSG, SSR, MPA, SPA, PWA, or whatever other flavour of the month acronym is going around? What will the development setup look like? Do I need a build tool or bundler? What packages or services do I need to achieve functionality? Somewhere along the line there’ll also be a deadline imposed. This might mean some decisions have to be rushed.

In a perfect world, the requirements given to the developer at the start of the project would include performance, accessibility, and sustainability considerations. This would help the developer to at least keep those in mind when making decisions later in the project. Most times, though, these are not included at all. With Google’s focus on performance and legal requirements around accessibility, you **might** find detailed requirements in some briefs. But requirements to ensure a sustainable website is delivered … probably not.

More regulation and reporting around sustainability and carbon emissions might see this change. I hope it does.

## npm install sustainable-web

_I don’t think that’s a real package (yet), but probably best not to run that in your console just to be safe._

Sustainability requirements is a good place to start, but that’s still primarily focused on a single website. To push faster change at a larger scale we need to start looking at some of the questions developers are faced with when building out projects. These focus on the tools and services being used, and ensuring that those come with sustainable defaults out of the box. Often times, these defaults are what gets shipped to production.

What kind of levers can be pulled? What would sustainable defaults look like? You can find some ideas in this [post by Brian Louis Ramirez](https://screenspan.net/blog/green-by-default/). Below are just a few aspirational ideas I’ve got. They range in their degree of practicality and implementability.

### Green regions by default

When you spin up a cloud service using AWS, GCP, Azure, or some other provider, you’re often asked to select a region in which that service should run. Most times, this selection is presented as a list of regions with bugger all (translation: no) additional information. It’s up to developers to find out details about the region, and that includes information about sustainability. When spinning up a new project on a tight deadline, you’ll more often than not end up going with the default presented by these services.

Now I don’t know my `us-east-1` from my `us-east-2`, so I definitely wouldn’t be able to make a snap decision about which region runs on a cleaner energy grid. The only cloud provider I’ve seen with public information about this is Google, who’ve got [a page](https://cloud.google.com/sustainability/region-carbon) dedicated to presenting the grid intensity of their data center locations. Their default `us-central1` location is also one of their most green (though using `northamerica-northeast1` Montreal as the default would be even better).

Having public information on the energy intensity of data center locations from each cloud provider would be terrific. But, even if they want to keep this information private for whatever reason, setting the default region to their most green region would be a massive first step. Not only would it see more developers running cloud operations on low-carbon hosting, but it’s impact would flow down to other providers who’ve built services and abstraction layers on top of the major cloud providers.

### Carbon-aware browsers?

I think this one might be a bit controversial. To what extent can browsers help to automatically reduce the amount of energy being used to serve sites on a user’s device. Could browsers be made carbon-aware, and serve different content based on the grid intensity in the user’s location?

We’re already seeing carbon-awareness entering mainstream software. [Microsoft recently announced](https://support.microsoft.com/en-us/windows/windows-update-is-now-carbon-aware-a53f39bc-5531-4bb1-9e78-db38d7a6df20) that Windows 11 will now schedule updates to run when more electricity is coming from lower-carbon sources on a user’s electric grid. Apple also [announced Clean Energy Charging](https://support.apple.com/en-us/HT213323) for iOS 16.1 users in the US.

The idea of serving different content based on grid intensity is similar to what some websites, [like Branch magazine](https://branch.climateaction.tech/issues/issue-1/designing-branch-sustainable-interaction-design-principles/), already implement today. They’re doing it with [a little bit of JavaScript](https://github.com/climateaction-tech/branch-theme/blob/master/js/gridintensity.browser.min.js) on the client, and using the UK grid as the basis for deciding what content to show. But while the UK grid might be green, I’m visiting the site from Taiwan where we are still very fossil-fuel reliant.

It would probably be a decent hit to Branch’s website performance if each visitor’s location was requested & then an API call was made to get grid intensity data. This would hurt the site’s user experience, and search performance too. But, if the browser was doing that for every site I visit, then everyone is on an equal footing.

This is controversial, in one sense, because a browser’s primary role is to render and serve whatever gets sent to it. If that’s [a 110MB font file](https://almanac.httparchive.org/en/2022/page-weight#other-assets), then so be it. Its implementation would also be fraught with gotchas, since every website is unique. There’d also be privacy concerns to be reckoned with here, since the browser would need to be aware of the user’s location.

### Lightweight embeds

Sticking with the content theme, wouldn’t it be great social media and video embeds were light by default. There’s no reason why a single YouTube video (which I might not even watch) on a page should result in my browser having to download and parse [600 kB of JavaScript](https://www.smashingmagazine.com/2022/02/reducing-web-carbon-footprint-optimizing-social-media-embeds/#youtube). These embeds can also hurt a site’s performance as well.

There are already lightweight alternatives for many popular third-party embeds. In the past, I’ve written about how these could be [used with Cloudflare Workers](https://fershad.com/writing/youtube-facades-with-cloudflare-workers/) to reduce the impact of YouTube & Vimeo content on a page. That’s all good if you’ve got the time to find and implement these packages.

Imagine how nice would it be, though, if the default embed code for a YouTube video was a lightweight snippet that anyone could copy into their code/CMS without having to think about how it might impact web page performance or sustainability.

### Sustainable-first search results

Just picture if Google turned around tomorrow and said “we’re going give a search ranking boost to domains that are hosted on a green web host”. We saw a sudden surge in people taking an active interest in web performance when Google made a similar statement for Core Web Vitals. Albeit that Core Web Vitals is a Google initiative, having them as a ranking factor saw a lot more website owners suddenly focusing on their site’s performance.

The Ecosia search engine already [highlights planet-friendly organisations](https://blog.ecosia.org/green-search/) in its search results. Meanwhile, Alphabet has also started to [surface sustainability information and nudges](https://blog.google/outreach-initiatives/sustainability/sustainability-2021/) across several of its products. Having the default Google search experience return prioritised sustainable results, or presenting indicators next to results, would have a profound impact in the movement towards a more sustainable web.

## More defaults, less thinking

The ideas I’ve presented above are just that, ideas. Some are a pretty whack, while others are more realistic. When it’s all said and done, though, the less I need to actively think about the sustainability impacts of my decisions as a developer, consumer, or human the better.
