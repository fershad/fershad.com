---
title: Chasing efficiency rather than green energy
published: 2023/04/27
permalink:  /writing/chasing-efficiency-rather-than-green-energy/
summary: >-
  A recent post by Adrian Cockcroft raised some sensible counter arguments for
  why chasing green energy usage for cloud compute might not always be the most
  climate friendly solution.
---

Last week, I read [_Don’t follow the sun: Scheduling compute workloads to chase green energy can be counter-productive_](https://adrianco.medium.com/dont-follow-the-sun-scheduling-compute-workloads-to-chase-green-energy-can-be-counter-productive-b0cde6681763) by Adrian Cockcroft on Medium. In it, Adrian makes some pretty sensible sounding arguments for why shifting workloads to use the greenest energy might not be the climate friendly solution we imagine it to be.

## Shifting workloads

A simplified idea of shifting workloads to utilise green energy goes something like this:

- I have a compute task that I normally run on a server in Iowa.
- However, Iowa doesn’t have the greenest energy grid. So when I want to run this task, I check other compute regions available to me & shift the task to run in the region which is using the most clean energy (i.e. has the lowest grid intensity).

You might see this referred to as “chasing the sun” or “moving compute through space”. It’s a neat idea, and one that I feel does have merit. There are concepts like the [Solar Protocol](http://solarprotocol.net/) which spec out a way to implement such a solution in practice.

But, when using hyperscale cloud providers, is chasing the sun actually a climate friendly practice? From [his bio](https://wikitia.com/wiki/Adrian_Cockcroft), Adrian definitely seems more well versed in how hyperscale data centers work than I am so I happily defer to him here.

## Key takeaways

You can read Adrian’s article on Medium at the link above. A few key takeaways I took from it were:

- Even if you’re not using the resources in one datacenter, doesn’t mean that someone else is not.

> Just because the carbon emissions aren’t charged to your account, it doesn’t make them go away.

- Shifting workload to a lesser utilised region that runs on clean energy could see that data center provider having to provision more resources in that region. This means emissions from manufacturing are generated, and there’s an increase in the energy used by that data center (not to mention water - story for another time though).

> Meanwhile your workload is generating demand in a different cloud region, and all regions do demand based capacity planning, so the cloud provider buys more computers, which increases carbon emissions both for manufacturing and shipping (scope 3) and the energy they use (scope 2).

- And, currently US & EU regions have more low-carbon options, while Asia currently has a high grid intensity (though this should drop over the coming years).

### TL;DR

The crux of Adrian’s post is captured in this one paragraph.

> I suggest that the best policy is to optimize your workloads so that they can run on fewer more highly utilized instances, minimize your total footprint in Asia where possible, and to use the spot market price as a guide for when to run workloads.

## Does this mean clean regions don’t matter?

No. I don’t speak for Adrian here, but I’d guess he’s not arguing that point either. By all means, if you \***\*can\*\*** provision compute tasks to run in regions with lower grid intensity then do so. But perhaps think twice if you’re wanting to provision a task in one region, then shift it around based on the grid intensity at the time you want to run it.

## Efficient code regardless of region

As Adrian points out, the best policy is to optimise workloads. This makes sense as a default. Shifting around inefficient tasks from one region to another just to use green energy feels kinda like a kid cleaning up their room by putting all their stuff on their bed and then covering it with a blanket. I might just be speaking from experience on that one.

Moving that inefficient task to a green region could mean that the data center operator there now needs to buy more servers to meet usage. There’s a carbon cost associated with that. Heck, running inefficient code in general probably comes with a financial overhead. So, even if you don’t care about the environment, give some thought to your bottom line.

## What might this look like for a website?

For the web, we need to look at both the data center (hosting) as well as a client (device) sides of the picture.

### Hosting

In some cases we can choose where we host our sites. Picking a green region to start with, or even better using a [verified green hosting provider](https://www.thegreenwebfoundation.org/directory/), are sensible places to start. But, if that’s not possible, how can we go about making our sites more efficient on the server?

1. Cache as much as possible. This includes database queries, static pages, and other static assets. If the content doesn’t need to be dynamically generated or realtime, then look to cache it.
2. Think about whether your site can be a static site - built once & stored on a host as static HTML pages. Content sites are perfect candidates for this.
   1. Features like incremental site builds, can further improve efficiency for static sites. Rather than rebuilding the entire website when a page is changed, incremental builds only rebuild those pages that had changes made to them. This reduces the resources & time needed to deploy website changes.
3. For pages/sites that are served dynamically, reduce the number of processes that need to run for it to be built.
4. If you’re using a JavaScript framework that allows for server-side rendering, then look to see if you can make that process [carbon aware](https://fershad.com/carbon-aware-site/). It’s something I’ve got on my “ideas to toy with” list for later in the year.

### Device

While we might have some control over our hosting, we almost certainly cannot control where people access our website from. Not just that, but we can’t control the devices on which our sites are accessed either. This makes efficiency even more important, not just to reduce carbon but also to make our sites useable on low-spec devices.

1. Consider making your [frontend carbon aware](https://fershad.com/writing/making-this-website-carbon-aware/).
2. Do less if the device is low-spec. Using the `navigator.deviceMemory` API is one way to check the kind of device your code is being run on. Here’s [a great guide](https://umaar.com/dev-tips/242-considerate-javascript/) covering that and more.
3. Try sending down only the JavaScript that the client needs. Frameworks like Astro and Remix try to make this possible. There’s a growing movement towards shipping 0kb JS by default, and incrementally sending over just the stuff that’s needed to make more complex page functionality happen.

In general, try to follow [sustainable web design](https://sustainablewebdesign.org/) practices as much as possible.
