---
title: Making this website carbon aware
published: 2023/02/03
archived: true
archiveNote: This website is now grid-aware.
permalink:  /writing/making-this-website-carbon-aware/
summary: >-
  Building carbon awareness into products is an important strategy to in the
  challenge to develop a more sustainable future. In this post, I cover how I
  used Cloudflare Workers and real-time data to make this website carbon aware.
---

{% callout "This website is now grid-aware" %}
Through a new project we're working on at Green Web Foundation, called Grid-aware Websites I've changed the functionality of this site to be grid-aware and respond to the fuel mix of a visitors national energy grid.

[Learn more about that here.](https://fershad.com/writing/making-this-website-grid-aware)
{% endcallout %}

The idea of building carbon awareness into digital products, services, or apps is something that you’ll probably start to read a bit more about in the coming years. You might here some people talk about it as _“moving compute through time and space”_. Sounds very sci-fi, ey?

In fact, making digital products carbon aware is already starting to be a thing. Last year, Microsoft announced that [Windows Update is now carbon aware](https://support.microsoft.com/en-us/windows/windows-update-is-now-carbon-aware-a53f39bc-5531-4bb1-9e78-db38d7a6df20), while Apple have also taken [tentative steps in this direction](https://support.apple.com/en-us/HT213323) with iOS version 16.1. Google’s been [shifting workloads between data centers](https://blog.google/outreach-initiatives/sustainability/carbon-aware-computing-location/) based on the availability of carbon-free energy since 2021. The Green Software Foundation also held [CarbonHack22](https://greensoftware.foundation/articles/carbonhack22-a-big-leap-in-carbon-aware-computing) last year, the first ever hackathon focused on carbon aware software and their applications.

## What makes something carbon aware?

At its simplest, for something to be carbon aware means that it has an understanding of how clean/dirty the electricity grid it operates on is. This is called “grid intensity”, and it’s an important term that you’ll see mentioned a lot through this post. I’ll use it interchangeably with the term “carbon intensity”. These terms describe a way of measuring how much CO2 is emitted by producing a unit of electricity.

A clean grid is powered by more renewable/low-carbon fuel sources, while a dirtier grid gets more generation from fossil-fuels. Grid intensity isn’t a static metric. It can shift throughout the day and night, for example, as more solar is available when the sun’s up compared to when it’s not. Things that are carbon aware will have access to this information, and can be built to perform more resource intensive operations during periods when the grid is powered by more renewable energy (low grid intensity), while offloading less power-hungry tasks to period of higher fossil-fuel generation (high grid intensity).

Asim Hussain has [a terrific post about carbon-aware and carbon-efficient software](https://devblogs.microsoft.com/sustainable-software/carbon-aware-vs-carbon-efficient-applications/), which is definitely worth taking the time to read.

## So, a carbon-aware website?

The idea of making a website carbon aware first came into my consciousness when [ClimateAction.Tech’s Branch Magazine](https://branch.climateaction.tech/) launched in 2020. Depending on the carbon intensity of the UK’s electricity grid at the time you visit, you’ll be presented with a different version of the site.

Tom Jarrett has [written about the considerations](https://branch.climateaction.tech/issues/issue-1/designing-branch-sustainable-interaction-design-principles/) that went into designing the Branch Magazine website to be responsive to grid intensity at a given time. The site is built on WordPress, and hosted in the United Kingdom. As far as I can tell from looking at the code, the Branch Magazine website uses data from [https://www.carbonintensity.org.uk/](https://www.carbonintensity.org.uk/) to determine the current grid intensity and adjust the site’s appearance accordingly.

What this means, is that when I visit the site from Taiwan (which doesn’t have the cleanest power grid) I will see a carbon-aware version of the site that is based on where it is hosted rather than my local grid’s current intensity. I have no problem with this, and in some ways the decision makes sense to me. But since I first saw the carbon-aware design of Branch Magazine, I’ve always wondered if it would be possible to do the same thing but for it to be _based on the current grid intensity of the website visitor’s location_ rather than the host.

![ ](../../public/img/blog/3050520fa7f1e223db7537bac618dad01efeaefd-2376x1290.jpeg "A side-by-side comparison of the carbon-aware (left) and regular (right) versions of my website. Visually, there’s not much noticeable difference, which is by design.")

## The wait for data

Branch was launched in late 2020. I’m now writing this in early 2023. Does that mean I’ve been subconsciously nerdsniped by this problem for the last two- and a-bit years? Yes. Yes, it does.

The problem stopping me from going further with my initial thought was having access to real-time grid intensity data. In 2020, the only provider I knew of was [Electricity Maps](https://electricitymaps.com). However, access to their API was paid and well out of reach for me in terms of affordability - especially for what effectively would be a prototyping exercise.

In recent times I’ve become aware of [WattTime](https://www.watttime.org/), another provider of real-time grid intensity data and forecasting. Again, especially at the time I found it, WattTime’s data was offered through a paid API which I couldn’t justify spending on.

From time to time, I’d have thoughts of sourcing grid intensity data myself. I’ve consider doing this for a handful of locations where most of my website’s visitors were coming from. But as a freelancer, just keeping my head above the water through a global pandemic, I wasn’t able to dedicate the time that would be required for that endeavour.

### Enter CO2signal

The data problem was resolved when I stumbled across [CO2signal](https://co2signal.com/). It is a free, rate-limited API provided by Electricity Maps. The CO2signal API returns real-time, country-level grid intensity data based on either latitude & longitude coordinates, or a valid country code. This is pretty much what I needed to try out my crazy idea.

I cannot emphasise enough how important open, accessible data is in driving the ideation and innovation that will be critical in our transition to a cleaner, greener web/world. I’m not saying that folks should not be able to package up their hard work into paid services. It’s worth remembering, though, that developers especially have a lot of leverage. Allowing them to have access to quality data enables them to try new ideas, and build prototypes that can help shift thinking, inspire others, and help drive the change the planet needs.

## Building out an idea

Okay, so I finally had some real-time grid intensity data I could use. Next, I needed time.

Living in Taiwan, the Lunar New Year holiday provides a solid 5-10 days (depending on the year) where things are closed, and people are either spending time with family or travelling. In our house, we normally head to central Taiwan for a few days, before returning north to Taipei.

I found out about CO2signal in December, 2022. Lunar New Year was early this year, in mid-January, 2023, so I sat on the idea until then. It gave me some time to think about what I might want to build, and some ways to go about it.

### Roughly specing it out in my head

In the lead up to Lunar New Year, I started thinking more about this _thing_ I wanted to do. I decided to try and apply carbon awareness to my own website, because it’s there to allow me to test out crazy ideas like this, right? Thinking through what I wanted to build revolved around a few key questions:

- What would a carbon-aware site look like for me?
- What should the threshold be before “low-carbon mode” is activated?
- Should/could this be implemented server-side, or did it need to run in the browser?
- What, if any, control should users have over applying carbon-aware changes to the site?
- How can I keep it working without blowing through CO2signal’s API limits?

#### What would a carbon-aware site look like?

My website is already pretty lean, and I’ve tried to apply [Sustainable Web Design principles](https://sustainablewebdesign.org/) where ever they’ve made sense. So, I had a think about what adjustments I could still make on a carbon-aware version of my site.

- Dark mode - nope, not yet. I’ll get a dark mode added one day. I could have done a quick and dirty colour swap, but I’d rather take time to make something more polished.
- Lower image quality - definitely doable. I serve images from [Cloudinary](https://cloudinary.com/), and can easily change up a URL parameter or two to achieve this.
- Remove/block JavaScript - again, pretty doable. There’s only a handful of JavaScript on this site anyway, none of which is critical to functionality.
- Remove/block CSS - doable, but nah. I felt that might be a bit jarring for visitors to start with. It could be something I can allow users to turn on though. [Zach Leatherman has a feature like that on his site (scroll to the footer).](https://www.zachleat.com/)
- Remove/hide images - Possible. But after trying it out, I felt the site would need a further redesign to make it look good when images were missing. Decided against it for now.

#### When does “low-carbon mode” kick in?

As far as I’m aware, there’s no agreed upon standard that says _“at this carbon intensity, a grid should be considered high intensity”_. Without this, I had to make my own call. I settled on 221 g/kWh (grams per kilowatt-hour). This is half of the global average grid intensity, and so felt as good as any number I could pluck out of thin air.

#### Server- or client-side?

In Branch Magazine’s solution, the carbon intensity check takes place through a client-side script that runs when a user lands on a page. I wanted to avoid this if I could. First, there’s the “cost” of waiting for the script to parse, fetch data, and execute. I’d need to wait for this to complete before rendering the page, to ensure I’m not downloading content that’s not needed. On some pages, like my [writing index page](https://fershad.com/writing/), it would also require a large amount of DOM manipulation. This all could take time on slow connections or low-powered devices.

I also needed to know what country the website visitor was located in. I thought about trying out the Geolocation API, but it requests user permission to be activated. As someone visiting a blog website like mine, I’d be pretty freaked out if I saw the browser requesting my location, even if only for a _trying-out-an-idea-prototype_.

After a bit of digging, I found that the `request` object received by Cloudflare Workers [includes `cf.country`, `cf.latitude`, and `cf.longitude` headers](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) with each request. This information comes from Cloudflare’s edge. I host my site on Cloudflare Pages, and so hooking up a Worker script would be absolutely possible. To boot, I’d be able to use [Cloudflare Workers HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/) to modify a page on the server, before sending it back to the browser. I’ve used it before, but it still blows my mind every time I reach for it.

So that settled it. I’d be doing things server-side (or more specifically, on the edge).

#### How much control should the user have?

I’ve decided to make the carbon-aware experience on this site _opt-out_. Part of building out this idea is to expose people to the notion of carbon-aware digital. By making it opt-out, more people are likely to see it as a starter. If that can trigger the interest of a few more folks to start thinking about how they build for/use the web, then that’s a win.

I also want the experience of a carbon-aware website to be as seamless as possible for the visitor. In a way, it’s a challenge to the thinking that “low carbon” equals a poorer experience, or poorer performance.

In the end I decided that if a visitor was presented with the low carbon experience, they would be shown a message explaining what they are seeing. They’d have the option to visit the regular version of the site if they want to. If they opt for this, I set a cookie that expires after 1 day to indicate their preference. The Cloudflare Worker that does the heavy lifting to make the site carbon-aware looks for this cookie in the request, so the user can continue navigating the site without being bothered again.

#### Operating within the CO2signal rate limits

CO2signal allows for 30 requests per hour. Most of the time, my website doesn’t go anywhere near that number of visitors. Occasionally, though, it does. Also, grid intensity data doesn’t update _that frequently_, so I could probably get away with saving it somewhere for a while. Since I was using Cloudlfare Workers, an easy solution for this was to use [Workers KV](https://developers.cloudflare.com/workers/runtime-apis/kv) to cache data from the API. I decided to cache results for 1-hour, after which time the grid intensity would be fetched again from the API. This prevents me having to repeatedly hit the CO2signal API, especially in the rare times when there’s a spike in traffic.

## Putting it all together

### How it works

When someone visits any page of this website, the following process is kicked off:

1. A Cloudflare Worker checks the request object for the latitude, longitude, and country of the request.
2. If data is found, then a fetch request is made to the CO2signal API.
3. CO2signal sends back data about the _current_ grid intensity at that location, if it has data for that country.
4. The Cloudflare Worker then checks if there is grid intensity in the returned data.
5. If the grid intensity is equal to or greater than 221 g/kWh, then the HTML response is modified before it is returned to the browser. If it’s less, then the original web page is returned.

If at any point along in that process there is no data available or something goes wrong then the original web page will be shown.

### What gets modified on a page?

When the grid intensity is equal to or greater than 221 g/kWh, the following modifications are made:

- Image quality is greatly reduced.
    - Visitors can click to download better quality versions of any image if they need to.
- Remove AVIF images, since [decoding them can be more CPU intensive](<https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#:~:text=Decoding> AVIF images for display can also take up more CPU power than other codecs%2C though smaller file sizes may compensate for this.). Although there is [research to suggest otherwise](https://greenspector.com/en/which-image-format-to-choose-to-reduce-its-energy-consumption-and-its-environmental-impact/) (I have to follow up on this).
- Non-critical JavaScript is removed from the site. This includes:
    - Progress bars when reading blog posts.
    - Share links (using the Navigator.share API).
    - Instant.page script
    - JavaScript that creates CodePen embeds. The embeds are replaced with a link to the pen.

I also add a small snippet of HTML & JavaScript which shows a message at the bottom of the screen telling the user they are viewing a modified version of the site. The user can dismiss this, or choose to be shown the regular page. In both cases, a cookie is set to note the user’s preference. That cookie expires in 1 day.

### The outcome

Overall, making the changes listed above sees about 50 kB to 100 kB reduction in the data downloaded on page load. For most pages on my site, that’s a reduction of 20% or greater.

I haven’t yet tested out the device level power savings of these changes. That could be something for a later post. It’s a pretty good reason to try out [power profiling in the Firefox Profiler](https://fershad.com/writing/co2e-estimates-in-firefox-profiler/).

### **Open source**

If you want to get a sense for how all that looks in code then I've created [a starter repository](https://github.com/fershad/carbon-aware-site-worker) on Github. It has some of the core code that powers the carbon-aware implementation, but doesn’t contain the image modifications or notification message.

I’ve kept this starter code minimal on purpose. In building this project I realised that there’s no cookie cutter solution for carbon awareness. It will look and feel different for each application and site. There’s a lot of planning, care, and design considerations that have to go into ensuring a low-carbon experience is still a useful, pleasant user experience.

## How could this be better/different?

This whole project started as a way for me to test out an idea that’s been bugging me for ages. Are there ways that it could be better? Absolutely. Are they ways it could be implemented differently? It depends, but yeah probably. And are there ways that browsers could help promote low-carbon web design? Yes, I’ve got thoughts.

### Making it better

There are a few things that could make the setup I’ve described earlier better.

#### Regional grid intensity data

In some countries (mostly large landmasses), electricity generation in different regions is taken care of by different providers. Sure, you can aggregate the grid intensity for all regions and provide a country-level average. But a more accurate carbon-aware implementation would get to the regional level if that data was available.

Electricity Map say that they plan to introduce regional level data into CO2signal in an upcoming version of the API. I hope they do. Since I’m using the latitude and longitude of the request, I’d be able to make full use of that regional data should it exist.

![ ](../../public/img/blog/4ad050c8e8d00b8f63de2123e37a5a5f16a48776-3640x1929.jpeg "Screenshot of Electricity Maps visual dashboard. Here you can see that some countries (like the US and Australia) have data available for regional grids.")

#### Falling back to annual average grid intensity

This was raised by [Marc Radziwill on Mastodon](https://indieweb.social/@marcradziwill@social.tchncs.de/109778055451906037). In the cases where CO2signal has no data for a location, I could try falling back to the annual average grid intensity for that country. As Marc points out, [CO2.js already has this data available](https://developers.thegreenwebfoundation.org/co2js/data/). Heck, I wouldn’t even need to install the library, since the data is available in [both JS and JSON](https://github.com/thegreenwebfoundation/co2.js/tree/main/data/output) files on Github.

#### Relative grid intensity

Right now, I’ve picked a number of out thin air and set that as the value which determines whether or not a user gets a carbon-aware experience. For me, living in Taiwan, I’m _always_ going to see the carbon-aware experience, because our grid is mostly powered by coal & natural gas.

It would make more sense if I could somehow look back historically and say _okay, the average grid intensity in Taiwan is X, so if the current grid intensity is above that **then** show the low-carbon page_. Actually, as I typed that I realised it’s something I _could_ do today using the annual average grid intensity data I mentioned above.

I feel a version 2.0 coming on.

{% callout "Update - 12th Feb., 2023" %}
Since writing this, I have gone ahead and implemented the idea above. This website is now carbon-aware _relative_ to the average annual grid intensity of the country a visitor is located in.
{% endcallout %}

#### I’ve noticed it sometimes fails

I’ve noticed that occasionally the Workers script will fail, and return the regular web page with a custom header `carbon-aware-site: Error fetching data`. I’ve noticed this only happens sometimes, which makes it harder to work out what’s going on. It’s something to debug later.

#### I kinda broke some links

Yeah. Not the worst, since I could find and replace them in my code. But, after I implemented the Worker all paths on my site now need a trailing `/` to work. Without the trailing slash, Cloudflare chucks a tantrum and errors out. Another one to debug later.

### Doing it differently

My site is built with Eleventy. All the pages are built, and pushed up to Cloudflare’s CDN network. Whenever a page is requested, a HTML file gets sent back. That’s why I had to use a Cloudflare Worker and HTMLRewriter to apply any carbon-aware changes outside of the browser. So now, I’ve got to remember now that this Worker exists & needs a separate deploy step whenever I update its code.

_If_ this site was instead a server-side rendered (SSR) site, then I could probably have some middleware as part of the backend code which renders a page whenever someone visits it. That feels like a nicer solution to me, having all the code in one place when it’s published.

If this was a PHP site … I don’t know much about that, but PHP is SSR right? This sounds like something a WordPress plugin could do.

Another option could be to build two versions of a website (like what Organic Basics have done - [regular](https://us.organicbasics.com/), [low-impact](https://lowimpact.organicbasics.com/)). Then, I could redirect visitors to the appropriate version of the site.

### How could browsers help?

At the start of this post, I highlighted a few examples of carbon awareness beginning to show up at the operating system, device, and server/data center level. If I was to revisit this post at the end of the year, I’m sure there’d be a few more examples I could add. It would be cool if web browsers were one of them.

#### **A `prefers-eco` header**

Okay, I just made that up, but you can see where I’m going, I hope. I say this as someone with no idea of what goes into building features into a browser. It sounds doable for browsers to allow users to set a preference that would then pass a header along with each request to indicate that the user would prefer a **************_low-carbon experience_**************. With this in place, sustainable web designers could include these experiences in their designs, and developers could more easily account for these preferences in their code.

Actually, though, there’s already the [save-data header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data) which could be used for just that. In CSS, there’s also [a spec for `prefers-reduced-data`](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-data). Both sound promising, but are still experimental with sketchy browser support at best. As the `prefers-reduced-data` spec points out, there’s also the risk that these could be used to fingerprint users, which is something that will need to be considered if they get further down the implementation path.

If you’re interested in either, then Polypane have [a solid post on how they can be used/tried out](https://polypane.app/blog/creating-websites-with-prefers-reduced-data/). Jeremy Wagner also [wrote about using `save-data`](https://css-tricks.com/help-users-save-data/) on CSS-Tricks way back in 2017.

#### **Make the browser carbon aware**

There are a heap of things that could happen here. What if, periodically your browser checked your local grid intensity & switched into a mode that consumed less power if the grid was _too_ polluting? Here are some ideas:

- Browser tabs could be suspended sooner.
- A header like `save-data` could be automatically set.
- The user could be prompted to close tabs which have been unused for a certain period of time.
- Dark-mode could be turned on automatically.
- Plugins/extensions could be disabled, with the user able to specify ones to leave on (similar to how it’s done for Incognito/Private mode).
- Autoplaying videos would be disabled (actually, this should be a feature anyway).
- Video quality could be reduced slightly or capped.

Those are just a few quick ideas. In 2019, Michelle Thorne led [a brainstorming session](https://discourse.mozilla.org/t/firefox-eco-mode-brainstorming-how-can-the-internet-tackle-the-climate-emergency/46582/2) at MozFest where they came up with _a load_ more. It’s quite the list.

## Closing

I’m stoked that I’ve finally been able to build out a carbon-aware website concept. This is a living proof of concept, and I’ve already got ideas for some updates to how it works. I’d love to see how others go about implementing carbon awareness on their own sites or apps, and what learnings they take from it.

If you do build our own carbon-aware website, share it with me on Mastodon (@<fershad@indieweb.social>) or by email. Likewise, if you want to chat about the ideas or concepts covered in this post then reach out as well.
