---
title: The environmental case for website performance
published: 2021/04/01
permalink:  /writing/the-environmental-case-for-website-performance/
summary: >-
  What's the link between a faster website and climate change? In this post I'll
  explain how you can help the environment by focusing on website performance.
---

What's the link between a faster website and climate change? You might be surprised.

It's easy to not consider the environmental impact of the digital world. It's one of those cases of *out of sight, out of mind*. The greenhouse gas emissions produced when a webpage is loaded are very much hidden from the end-user. But the harmful environmental impact of our digital activities is growing, and it's growing fast.

It's estimated that global information and communication technology (ICT) accounts for [around 4% of global CO2 emissions](https://theshiftproject.org/wp-content/uploads/2019/03/Lean-ICT-Report_The-Shift-Project_2019.pdf). That makes it more polluting than the civil aviation sector. Just over half of those emissions come from the usage of ICT products and services (that's through data centres, networks, and terminals/devices). For a bit of perspective, if the internet were a country it would be the 6th largest polluter.

It's forecasted that if left unchecked emissions from ICT could go as high as 8% of total global emissions by 2025. That would make usage responsible for 4% of total global emissions, putting it [behind only China, the United States & India](https://internethealthreport.org/2018/the-internet-uses-more-electricity-than/).

## What's this got to do with websites?

Of total global ICT emissions, about one-third comes from data centres (19%) and networks (16%). So each webpage view, each byte sent over the wire (or through the air for mobile), each bloated third-party library has an environmental impact.

How? Storing, transmitting, and loading all those bytes requires electricity. The day will come where all the planet's electricity is generated from renewable energy. Until then though, we'll be mostly relying on fossil fuel-powered electricity to host and load our websites.

## So what can we do?

As developers or website owners, we can help to significantly reduce the carbon emissions of online assets. Reducing the size of our websites, serving optimised content, and being strategic about loading resources are just some of the steps we can take. Developer Danny van Kooten estimated that he [reduced emissions by 59,000kg of CO2 per month](https://dannyvankooten.com/website-carbon-emissions/) when he shaved 20kB off the Mailchimp for WordPress he maintains.

To get a sense of your site's current emissions you can run your pages through [Website Carbon Calculator.](https://websitecarbon.com/) If you're ready to start reducing it's impact, then check out the list of action items below.

### Reduce page size

- Audit any third-party assets you're using, and remove any that don't deliver value.
- Ensure you have GZIP or Brotli compression enabled.
- If you use a JavaScript framework to build your site, use [Bundlephobia](https://bundlephobia.com/) to find lighter versions of any dependencies you use.
- Consider lightweight JavaScript frameworks such as Svelte or Preact.
- Minify all your CSS, JavaScript and even HTML.
- Subset custom fonts to remove characters that you won't use.

### Serve optimised content

- Use WebP or AVIF image formats.
- Avoid using GIFs. Just don't. Use a video format instead.
- Serve WOFF2 for custom fonts.
- Appropriately size images for different viewport sizes.
- Replace icon fonts with SVGs.

### Strategically load assets

- Lazy-load assets so that they're not downloaded until they're needed.
- Avoid auto-playing videos.
- Go against using large image carousels. If you do, lazy-load images that aren't seen on first load.
- Use a lightweight facade for embedded videos.
- Consider implementing a Service Worker to cache frequently used assets.

### Some extras

- Host with a [green web host](https://www.thegreenwebfoundation.org/).
- Use a CDN to reduce the distance data has to travel.
- Consider pre-building (or caching) any pages that don't have dynamic content.
- Set effective cache headers for static assets.

## Resources

- [**World Wide Waste**](https://gerrymcgovern.com/books/world-wide-waste) - This book by Gerry McGovern really opened my eyes to the impact of the digital world. It prompted me to start examining what I could do, as a web performance consultant, to reduce the impact of the web.
- [**Website Carbon Calculator**](https://www.websitecarbon.com/) - A very handy tool from Wholegrain Digital which gives you an estimate of a webpage's carbon impact.
- [**The Green Web Foundation**](https://www.thegreenwebfoundation.org/) - Check how your current website host is powered, and find a green host that you could move to.
- [**Lean ICT Report**](https://theshiftproject.org/wp-content/uploads/2019/03/Lean-ICT-Report_The-Shift-Project_2019.pdf) - A thorough report from The Shift Project which looks at the impact of ICT devices throughout their lifetime.
- [**Internet Health Report 2018**](https://internethealthreport.org/2018/the-internet-uses-more-electricity-than/) - A report from Mozilla which puts some perspective on the electricity demands of the internet.
- [**CO2 emissions on the web**](https://dannyvankooten.com/website-carbon-emissions/) - An interesting post from developer Danny van Kooten where he examines the emission savings he's been able to achieve by reducing the size of WordPress plugins he maintains.
