---
title: Trying out an EU-based stack for this website
# published: 2026-07-30
summary: As a bit of a side quest for work, I've been digging into the idea of a tech stack that's divorced from US big tech companies, with content and data being hosted on European-based infrastructure. 
---

As a bit of a side quest for work, I've been digging into the idea of a tech stack that's divorced from US big tech companies, with content and data being hosted on European infrastructure. 

That's not something I've really thought about before. To be honest, there's already a lot for developers to think about when putting together a project, and now digital sovereignty has been thrown into the mix. Personally, familiarity also plays a part in this. Having built so much on Cloudflare in the past, I lean towards their platform and services whenever there's an idea I want to execute. 

This side quest presented a nice opportunity for me to open my eyes to the outside world a little.

## Another year, another self-nerd snipe

I have a tendency to let the intrusive thoughts win when it comes to playing around with whacky digital sustainability ideas that enter my mind. That's how I got around to building [_Are my third parties green?_](https://fershad.com/writing/building-are-my-third-parties-green/) or [making this website carbon-aware](https://fershad.com/writing/making-this-website-carbon-aware/). 

While researching options for EU-based digital services, the idea of converting my own website over to a EU tech stack came into my mind. I was kinda digging the idea of diversifying my tech stack, using some new services, and getting stuck on some new problems that would surely arise. The thought sat in my head for a few days, like the heavy humidy we have here in Taipei during the summer. Eventually, I caved.

Before I go on, I should mention that I'll be name dropping a lot of companies in this post. All opinions presented are my own.

## TL;DR

If you don't want to read the rest of this post, the changes I've played with are captured in the table below. The `fershad.com` domain is my original personal website, while the `fershad.me` domain runs on an EU-stack.

|  | `fershad.com` | `fershad.me` |
|----------|----------|----------|
| Website Hosting | Cloudflare | statichost |
| DNS | Cloudflare | OVHcloud |
| Version Control  | GitHub | Codeberg |
| Edge Functions  | Cloudflare | None |
| Analytics | Fathom (EU isolation) | Fathom (EU isolation) |

For now, I'm running the EU-stack (`fershad.me`) domain as a mirror of my personal site. `fershad.com` will remain the canonical domain for all my content. I'll see how this goes, and maybe someday in the future I'll migrate the `.com` domain over to an EU-stack on its own.

{% callout 'Your kinda stack?' %}
If these idea of a tech stack removed from US tech companies resonates with you, then [get in touch](/contact). It's something I'd like to explore a bit more beyond the small use case of this personal website.
{% endcallout %}

## The Euro-stack I settled on

When looking for possible European alternatives for the handful of services I use for this website, I found the appropriately named [https://european-alternatives.eu](https://european-alternatives.eu) catalogue extremely handy. The website presents European platforms and services across a range of categories, as well as presenting them grouped based on the non-EU alternatives they can be used to replace. For my needs, I was looking for:

- A static web host to replace Cloudflare Pages
- A DNS provider to replace Cloudflare
- A code repository to replace GitHub
- An edge functions service to replace Cloudflare Workers

### Sustainability considerations

Those are the main services I use to deliver my website to you, dear reader. Given [what I do for work](https://greenweb.org), I'd also want to use sustainably hosted providers as much as possible. In doing this side quest, I'm interested to see if I might have to make a trade off between sustainability and running on EU-based infrastructure. 

### Some things stay the same

Some things won't change as part of this experiment. I'll continue to build this website using [Eleventy](//11ty.dev), the open source static site generator I've been using for years. I've also opted to stick with my current analytics provider, which I'll touch on later.

### Web hosting - A Cloudflare Pages alternative

My website is a static site, with HTML pages (and other content) built once and then served as static files to visitors. I wanted to find a platform that would serve the role Netlify and Cloudflare Pages have done for me over all these years - allow me to point at a code repository, automatically build my site whenever I committed to the `main` branch, and then obviously host it as well. 

I remember [Hidde](//hidde.blog) posting about a European service that did something similar once before on either Bluesky or Mastadon, so I went hunting for that post. And eventually I found it, [way back from September 2025](https://bsky.app/profile/hidde.blog/post/3lyseufjhj22o).

![](../../public/img/blog/hidde-bluesky-statichost.png 'Hidde de Vries posting on Bluesky: Moved hidde.blog off Netlify, onto statichost.eu, a service that is not bloated, privacy-friendly, sustainable and EU-hosted. And has much less pushing of (AI) features that I find unnecessary.')

With that nugget, I took at look at [statichost](https://www.statichost.eu/), and it did indeed fit the bill. To boot, it appears to be running on Hetzner server based in Finland so they [meet my sustainable hosting criteria](https://app.greenweb.org/directory/#131) as well.

I had thought that finding a service to replace Cloudflare Pages for hosting might be a big hurdle, but turns out it was a much smoother process than I'd anticipated.

#### No CDN for the time being

I've choosen not to use a CDN as part of my European tech stack, at least for the time being. I'm currently on the statichost free plan, which has a reasonable bandwidth limit considering the nature of my site and the fact that it's not my primary domain. There is an upgraded plan which comes with CDN deployment (using BunnyCDN I believe) that I could switch to.

When I was looking on BunnyCDN's website, I couldn't find any sustainability information about their infrastructure. Should there be a need in the future, I'd give them another look alongside other [EU based CDN providers](https://european-alternatives.eu/category/cdn-content-delivery-network).

### DNS - Another Cloudflare alternative

With a place to host my site, I needed a domain for it to live on as well. My primary website runs through Cloudflare's DNS service, so that ruled out any ideas of having a subdomain for this side quest (although `eu.fershad.com` is a thing). Anyway, it's consider web development best practice to purchase a domain the moment you've got a half-baked idea you want to spend any time on. Right? ... Riiiight?

As an Aussie living in Taiwan, I'm not able to purchase a `.eu` domain. A `.eu` domain would make the most sense for an escapade like this, but alas [Australia's participation in Eurovsion](https://en.wikipedia.org/wiki/Australia_in_the_Eurovision_Song_Contest#Participation_overview) isn't even enough to break down this barrier. After a bit of procastination, I settled on a `.me` domain instead. That decision is more because I like the novelty of the domain, rather than having anything to do with Montenegro itself (which isn't an EU member at the time of writing).

I chose to purchase the domain through OVHcloud, a French public cloud provider who's work I am familiar with through my role handling provider verification at the Green Web Foundation. OVHcloud was one of the first providers I came across that was reporting water usage metrics, alongside energy and carbon information for their infrastructure locations. Though they have a trans-continental footprint, their nameservers appear to be located in France which made them a good candidate in my books.

### Version control - Something that's not GitHub

I guess I could have self-hosted a Git server and done this all myself, but I'm not an infrastructure guy. The [European options for version control services](https://european-alternatives.eu/category/version-control-services) are more limited, but there is stuff out there. 

I settled on [Codeberg](https://codeberg.org/), because it looked like the simplest to get up and running with and is free to use. To be honest, all I need right now is a place to mirror my code rather than a full platform to manage it. There is an option to support the Codeberg project financially too, which is something I may do in the future if money frees up and my usage increases. 

Codeberg is hosted on Individual Network Berlin servers, which isn't itself a provider that I've seen sustainability evidence for. Since the code is being hosted statically, and I'm not expecting to be using it as my go to version control platform anytime soon, I was okay with trading sustainability for some cost savings and speed to deployment here.

### Edge functions - Lol more Cloudflares!

This blog has been on a [carbon/grid-aware journey](https://fershad.com/writing/making-this-website-grid-aware/) for a few years now. For that to work, I use a Cloudflare Worker which sits in front of all web traffic to `fershad.com` and runs some code to adjust the web page when a user's energy grid is running on more fossil fuels than normal. 

The most similar EU service I could find for this functionality was [Bunny's Edge Scripting](https://bunny.net/edge-scripting/). As far as I could tell, I'd have to be running BunnyCDN in order to use this service. Since I'm not planning to throw a CDN in front of the EU version of this site, the content served at `fershad.me` does not have grid-aware changes applied.

### Analytics - Sticking with Fathom

I've used [Fathom Analytics](https://usefathom.com) on this website for many years now. I use analytics to figure out what content people are coming to read, when old content might have been given a new lease of life by being shared somewhere, or when my website suddenly becomes popular in mainland China for reasons unknown. 

Fathom are a Canadian registered company, and I pay an annual fee for their services. There are other [European analytics services](https://european-alternatives.eu/category/web-analytics-services) out there, which I'm sure are great. But, for the purposes of a side quest like this, I'm going to stick with Fathom as my analytics provider across both domains.

#### EU Isolation

Fathom have this feature called "[EU Isolation](https://usefathom.com/docs/script/eu-isolation#content)" which means that data for visitors to my site from EU countries (plus some non-members) gets routed to EU-based servers. Folks visiting from outside the EU would have data processed in the US.

One thing I've changed across both `fershad.com` and `fershad.me` is that my site now uses what Fathom call "_Extreme EU Isolation_", where all global traffic is routed through the EU. I wasn't aware of this feature until researching for this side quest, and I'm pretty stoked that it exists. It's something I'll definitely keep turned on for my website regardless of how this Euro-stack experiment goes.

### Other changes - An Open Graph update

Another side effect of this little gambit was being able to sort out how the Open Graph images for this site are generated. Open Graph images are the graphics you see appearing on most social media sites and chat apps when a link is shared. For a while now I've been using a headless browser running in a Cloudflare Worker to generate and cache these images when requested. This isn't by any means "core" to the website, but since I've moved other services off Cloudflare I thought it would also be prudent to look at what I could do about this setup as well.

I could have spun up something similar using an EU-based serverless functions platform like what [Scaleway offers](https://scaleway.com/en/serverless-functions/). However, I didn't want to end up paying for a service just for generating images for social media. In past versions of this site, I had done something similar using Eleventy's lifecycle hooks to produce images when the site was built. I went looking for modern takes on that solution once more.

In the end, I've settled on generating Open Graph images using `canvas` and then processing that buffer into a useable file that lives alongside the webpage it is for. I'm not for a second going to claim that I did this myself. Rather, I relied heavily on the code [John Brooks shares in this blog post](https://www.pupismyname.com/articles/unique-header-images/), and the design ideas [Nils Millahn shares over here](https://nmcode.hashnode.dev/javascript-canvas-api-drawing-random-patterns).

Like the changes I made to how Fathom loads, this change is deployed to both `fershad.com` and `fershad.me` for everyone to enjoy!

## Outcome

I must say, I was pretty impressed at how easy it was to setup an EU-stack for my website. Given, I don't have a complex use case - I'm not running a site that dynamically generates content or does any server-side rendering. But even for those, I'm pretty certain that options exist, though there may be some additional costs and complexity for that compute.

For now, I'll run my two sites in parallel and see how things play out. At least I know that I could switch to an EU-hosted stack in the future should that need arise.

{% callout 'Your kinda stack?' %}
If these idea of a tech stack removed from US tech companies resonates with you, then [get in touch](/contact). It's something I'd like to explore a bit more beyond the small use case of this personal website.
{% endcallout %}
