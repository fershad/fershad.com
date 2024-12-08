---
title: Website performance and the planet
published: 2022/01/12
permalink:  /writing/website-performance-and-the-planet/
summary: >-
  Solid website performance can have a lot of a positive effects from increasing
  revenue, to reducing stress of users. But did you know that making your site
  faster can also be good for the planet?
---

Solid website performance can have a lot of a positive effects. For businesses, it can have direct [impacts on revenue and engagement](https://wpostats.com/). For end users, it can make time on the web [less stressful](https://simonhearne.com/2021/web-stress/). But how about for planet? Yep, that's right making the website's we build and manage more performant can also be good for planet Earth.

## The web's got an emissions problem

The environmental impact of the digital world is often one of those _'out of sight, out of mind'_ kind of things. Whether it's something tangible like a smartphone or virtual like a website, the environmental and carbon impacts of our digital lives are often invisible to us as end users.

It's estimated that global information and communication technology (ICT) accounts for [around 4% of global CO2 emissions](https://theshiftproject.org/wp-content/uploads/2019/03/Lean-ICT-Report_The-Shift-Project_2019.pdf). Just over half of those emissions come from the usage of ICT products and services (that's through data centres, networks, and terminals/devices).

For a bit of perspective, in a year the web as whole uses more electricity than the UK. The internet is annually responsible for emissions equivalent to Germany (the world's 7th largest polluter). That's more polluting than the civil aviation sector.

All this is before we even get into the usage of water required power, cool, and produce the hardware that powers much of the web.

### What contributes to the web's carbon footprint?

There are four components that form the emissions profile for the web.

- **Data centers** - The energy required to power the servers and facilities that host sites, APIs, and databases.
- **Networks** - The power required to push data around the planet.
- **Consumer devices** - The energy required to power consumer devices (including Wi-Fi modems).
- **Production** - The embodied emissions from the manufacturing of the hardware involved in the three areas above.

When it comes to web performance, our impact can be most felt in items 1, 2 and 3 in the list above. There's a more detailed explanation of how website emissions are currently calculated in the [_Calculating Digital Emissions_](https://sustainablewebdesign.org/calculating-digital-emissions/) blog post on Sustainable Web Design.

## Where web performance can help

So, where should you start looking if you want to make your little (or not so little) corner of the web greener? What can you, as a performance-minded developer, do to reduce the carbon emissions of the sites you work on?

The great news is that a lot of the steps we take to improve website performance also help reduce a site's carbon impact. Better Core Web Vitals plus a low carbon website? Win, win!

### **Start by measuring**

If you want to improve an existing website, start off by getting a sense of its current impact. Using tools like [Website Carbon Calculator](https://www.websitecarbon.com/), [Beacon](https://digitalbeacon.co/), or [Ecoping](https://ecoping.earth/) you can get an estimate of carbon emissions for a given web page. By using these figures alongside your site's analytics you can start to estimate your site's total carbon emissions.

Note

You should consider whatever figures you get from these tools as the **_minimum estimated_** carbon emissions for a web page. They are all based on data transferred for the initial page load, and so do not take into account lazy-loaded images, JavaScript, or other data that might be fetched through user interaction. They also make some assumptions about repeat visits and caching.

### Optimise all the things

On the frontend, making sure the assets we send along with our sites are as optimised as possible can go a long way to reducing the carbon produced per pageview. Ensuring GZIP or Brotli compression is enabled for your site helps here too! Every kilobyte matters.

#### Images

Effective image optimisation can instantly take megabytes off the total size of your page. All the usual suspects have an impact here:

- Use modern image formats like AVIF or WebP. Where that's not possible, compress JPEG and PNG images before uploading them.
- Think about using MP4 video rather than a GIF for animated content.
- Lazy-load any images that are not visible when the page initially loads & provide responsive versions for smaller viewports.

#### Fonts

If you're using web fonts, find out if you can subset them to remove characters you probably won't use. While you're at it, check to make sure that fonts are being served in an optimised format like WOFF2.

Take things a step further by totally removing custom fonts from you site. Using system fonts is the most sustainable approach you can take. Iain Bean's written [a great post](https://iainbean.com/posts/2021/system-fonts-dont-have-to-be-ugly/) highlighting some of the more attractive system font options you can consider.

#### CSS

Beyond minifying CSS, check to see if you're sending down more than you need. Can you _tree-shake_ unused classes from the CSS library you use? Are you using an icon font that could be replaced with SVGs?

#### JavaScript

Tree-shaking helps here too. If you have the chance to review your code periodically then look for any libraries or polyfills that could be replaced with native implementations.

Also make a point to regularly check any third-party code that your site is pulling in. Is it minified? Is it served over a CDN? Most importantly, is it still used or can it be removed?

### Caching, caching, caching

The most carbon-friendly data request is the one that doesn't need to be made. Caching static resources on the browser can dramatically speed up website navigations and return visits. They also reduce the network energy consumption required to serve a site.

Set the most aggressive caching rules you can for things like images, CSS and JavaScript files. Harry Roberts' [Cache-Control for Civilians](https://csswizardry.com/2019/03/cache-control-for-civilians/) is a great resource to help understand just what's possible.

### **CDNs & edge caching**

Caching static content closer to end users via a content delivery network (CDN) definitely helps with performance. In the process you also reduce the amount of electricity required for data transmission, which is better for the planet. This is especially the case if your site is serving a global audience.

CDNs transfer huge amounts of data around the world through a network of distributed data centers. The energy used by these data centers is still a large contributor to digital carbon emissions, so take a moment to look into a provider's sustainability policy and plans. Some large CDN providers like [**Cloudflare**](https://blog.cloudflare.com/cloudflare-committed-to-building-a-greener-internet/) and [**Akamai**](https://www.akamai.com/company/corporate-responsibility/sustainability) have sustainability commitments outlined on their websites. If you're already using a CDN provider, or are looking for a new one, check with their sales team about their sustainability commitment and the steps they're taking to reduce the environmental impact of their operations.

If your site is 'dynamic', like a traditional WordPress website, then see if it's possible to cache some/all of the pages. Some hosting providers offer this service, or you may also look at using a CDN here. This can help reduce the load on your databases, and as a result reduces energy used by your servers to generate each pageview.

### Green hosting

Hosting accounts for about 15% of a website's carbon footprint. So, hosting your site on a green provider can go a long way to reducing your site's footprint. The more people who move to green web hosts, the stronger the message will be to the rest of the industry that green options should become the norm.

The Green Web Foundation maintain a [**directory of verified green web hosts**](https://www.thegreenwebfoundation.org/directory/). You can reference this list to find a provider in your region, or one that's located close to your users.

## Website design also plays a part

The design decisions made early on in the life of a website can also have a big impact on its longer-term sustainability. If you're able to contribute to design discussions, then here are a couple of impactful things to consider.

### **Jumbotrons, heroes and carousels**

Large videos at the top of web pages force an incredible amount of data to be transferred over the network. Often these videos are purely aesthetic. Ask yourself if it's really needed, or if you can instead play the video only if the user interacts with it.

The same applies for large hero images or carousels. Carousels, in particular, can result in multiple images being downloaded, some of which may never be seen by the user. Plus, there's evidence that they're [**not as effective**](https://thegood.com/insights/ecommerce-image-carousels/) as your marketing team might think. If you've got no option but to use a carousel/hero image then ensure its optimised, and that any images not required for the initial page load are lazy loaded.

### **Believe it or not, colours have an impact too**

The choice of colours used on your site can have a small impact on the energy consumed by a user's device when using your site. Sometimes it's hard to change this because of branding and the like. Where possible, consider a darker colour palette or offering a dark mode option. Interestingly, blues are about [**25% more energy intensive than reds or greens**](https://www.youtube.com/watch?v=N_6sPd0Jd3g).

## **Systemic change is needed**

A 100ms faster largest contentful paint for one pageview might be insignificant. Heck, the person visiting the site probably won't even notice. But at scale, that 100ms [can be worth millions](https://www2.deloitte.com/ie/en/pages/consulting/articles/milliseconds-make-millions.html) for a website, and for a business.

Reducing the carbon impact of the web is much the same. Reducing the carbon emissions of my personal website, with its 800 odd pageviews each month, isn't going to make much of a difference. However, if we as a web community can bring awareness to the impacts that our sites, apps, and platforms are having then we'll be in a better place to drive broader change.

A sustainable web is also a faster web. By standardising sustainable web development practices we can, as an industry, do our part to provide a cleaner more sustainable future for the planet.

PS. If you're interested in this topic, there's [an open discussion](https://github.com/WPO-Foundation/webpagetest/issues/1613) about adding website sustainability into WebPageTest over on Github.

## Further reading

### Online

- [Calculating Digital Emissions](https://sustainablewebdesign.org/calculating-digital-emissions/) - Sustainable Web Design
- [Measuring the web](https://www.the-public-good.com/web-development/measuring-the-web) - Daniel Hartley (The Public Good)
- [CO2 emissions on the web](https://dannyvankooten.com/website-carbon-emissions/) - Danny van Kooten
- [Developers can save the planet](https://marmelab.com/blog/2020/09/21/web-developer-climate-change.html) - François Zaninotto (Marmelab)

### **Books**

- [Sustainable Web Design](https://abookapart.com/products/sustainable-web-design) - Tom Greenwood, A Book Apart
- [World Wide Waste](https://gerrymcgovern.com/books/world-wide-waste) - Gerry McGovern
