---
title: “Use less. Use green. Buy green.”
published: 2022/01/06
permalink:  /writing/use-less-use-green-buy-green/
summary: >-
  By using less power, using green power, and buying from green suppliers
  businesses and individuals alike can reduce their carbon footprint. How would
  we go about applying this same thinking to website performance and
  sustainability?
---

This post is inspired by a quote from a podcast I listened to just before Christmas. The podcast is My Climate Journey hosted by Jason Jacobs. In the episode [(Ep. 189) Jason speaks with Kentaro Kawamori](https://www.myclimatejourney.co/episodes/kentaro-kawamori), Co-founder and CEO of Persefoni. Persefoni is a Climate Management & Accounting Platform. You can listen to the podcast to learn more about what they do.

Around two-thirds of the way through the episode (about 32 minutes in) Kentaro drops this amazingly simplistic three step path for decarbonising a company.

> I'll let you in on a little secret, you don't need to pay McKinsey a million dollars for your climate strategy. I can tell you in three simple ways how to reduce your footprint, the first is use less power. The second is use greener power, and the third is buy greener services and products.

For some reason this has just stuck with me since I first heard it. It sounds so simple, and can be applied to many situations beyond corporate decarbonisation. In this post I want to take this idea and look at how it can be applied to website sustainability, and also website performance.

## Website Sustainability

If you’re familiar with website sustainability then you’re probably already doing a lot of this, but let’s go through it for everyone that’s new to the topic.

It's estimated that global information and communication technology (ICT) accounts for [around 4% of global CO2 emissions](https://theshiftproject.org/wp-content/uploads/2019/03/Lean-ICT-Report_The-Shift-Project_2019.pdf). For a bit of perspective, in a year the web as whole uses more electricity than the UK. The internet is annually responsible for emissions equivalent to Germany (the world's 7th largest polluter). That's more polluting than the civil aviation sector.

### Use less power

In the case of web sustainability, the main way we can use less power is by reducing the amount of data we’re pushing down the wire to our users. I’ve written previously about some of the technical and design considerations that can be made when [trying to make a low carbon website](https://fershad.com/writing/reducing-website-carbon-emissions/).

Another way we can use less power is by looking at the code our sites execute on the end-user’s device. Especially on mobile devices, large JavaScript runtimes can drain the battery which means more recharging and faster degradation.

### Use greener power

Switch your sites, APIs, and backends to certified green hosting providers. The Green Web Foundation maintain a [directory of verified green web hosts](https://www.thegreenwebfoundation.org/directory/). If you’re using a CDN, then look for sustainability commitments on your provider’s website.

For those who need to run operations in the cloud, Google, AWS and Azure are all making very strong sustainability pushes as part of their offerings. Look to see if you can run functions in regions powered by 100% renewable energy, or at times of peak low carbon power supply.

### Buy greener services and products

The services and products our websites use come in the form of third-party tools and scripts. Since these scripts come from external vendors, we have little control over the quality or size of their code. What we can control, however, is which providers we use.

When evaluating vendors to use for parts of your site’s functionality, check to see the size of the script they’ll be sending down to your users. Run the URL they provide you through The Green Web Foundation’s tool to [see if they use a green host](https://www.thegreenwebfoundation.org/).

If you’re currently using third-party resources on your site, then do the above checks as well. Contact the provider and ask them what they are doing to bring down their file size, or if they have plans to move to green hosting. If you decide to change providers for these reasons, let your current provider know as such (be nice about it though, fam).

## Website Performance

Applying Kentaro’s advice to website performance takes a bit more mental gymnastics. I’ve been thinking about this a bit as 2021’s rolled into 2022, and have come up with something that at least makes sense to me. I’d be interested to hear what others think.

### Use less power

This is very much along the same lines of the website sustainability point above. Sending less data over the wire makes websites faster, and more accessible to users across a range of devices. As [Alex Russel notes](https://infrequently.org/2021/03/the-performance-inequality-gap/):

> _We can now afford **~100KiB of HTML/CSS/fonts and ~300-350KiB of JS (gzipped)**._

That’s just under 500KiB to deliver a site that performs reasonably well on the average mobile device.

It can also [help with things like Core Web Vitals](https://ecoping.earth/blog/core-web-vitals-and-sustainability). Optimising images should improve your Largest Contentful Paint. Sending down only the JavaScript you need will keep First Input Delay to a minimum.

### Use greener power Use the platform

This one’s a bit of a stretch, but here me out. In the context of website performance, I’ve translated _“use greener power”_ to mean _“use the platform”._

For those not familiar with that phrase, it refers to the practice of using the capabilities provided to us by the browser (through native HTML, CSS and JS) before reaching for external libraries.

Using the platform will help get you closer to that 500KiB webpage budget mentioned by Alex. It will help you deliver an experience that should work for most users on modern browsers, while relying on a handful of polyfills for those on older versions. And since you’re using features that come built into the browsers your website visitors are using, the computational overhead on their end device should be minimal too.

### Buy greener services and products

This again ties back to third-party services used on our sites. They can have a significant impact on website performance, and degrade the overall user experience in the process.

Does your chat widget need to load in its entirety when a user first lands on a page? Or, can a facade be loaded in its place, with the rest of the third-party content being requested only once the user interacts with the feature?

I’d strongly recommend running regular audits on the third-party resources in use on your site. Are they still needed? If they are, then what impact are they having on your site’s performance? Could they be lazy-loaded, or replaced with a smaller/native alternative?
