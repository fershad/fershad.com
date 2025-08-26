---
title: A web component for grid-aware websites
published: 2025-08-26
summary: This post introduces the Grid-aware Status Bar web component which we built to complement a recent redesign of our Branch magazine website.
canonical: https://www.thegreenwebfoundation.org/news/a-web-component-for-grid-aware-websites/
---

<script type="module" src="https://esm.sh/@greenweb/gaw-info-bar"></script>

{% callout "Original" %}
This post was originally published on the [Green Web Foundation blog](https://www.thegreenwebfoundation.org/news/a-web-component-for-grid-aware-websites/). It has been edited slightly to make sense on this blog.
{% endcallout %}

One of the objectives we set for the [Grid-aware Websites project](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/) when we started planning it last year was to deploy the project on the [*Branch* magazine website](https://branch.climateaction.tech/) sometime in 2025. In doing this, we could show the code working on a website that receives a non-insignificant amount of regular traffic. It would also be a full-circle moment for the project, since the original *Branch* design in 2020 was one of the things that [got me exploring the ideas of carbon-aware frontends](https://fershad.com/writing/making-this-website-carbon-aware/) in the first place.

{% callout %}
Grid-aware Websites enables the creation of dynamic online experiences that respond to the energy grid they are being used on –  delivering core content when the grid is fueled by dirtier energy, and enhancing the experience as the grid becomes cleaner.
{% endcallout %}

As we got further into the project, *Branch* took on an increasingly important role in showcasing our ideas for how grid-awareness could be applied to websites. We commissioned a new issue ([Issue 9](https://branch.climateaction.tech/issues/issue-9/)) for the magazine around the theme of *attunement* – reimagining digital infrastructures attuned to life systems, planetary constraints, and our collective needs. This ties in with the whole idea of Grid-aware Websites, designing online experiences that are designed to work with and within the constraints of the energy grid. To top things off, we decided that it'd also be nice to give *Branch* a modern redesign in the process.

All these things kind of depended on each other, so we decided to bite the bullet and tackle them at the same time. As it would happen, that coincided with members of our team traveling for work, taking extended leave, and our entire team coming together in Munich for a week of away days and [Green IO conferencing](https://greenio.tech/conferences). There was a lot to do, and a lot of disruption to work around, but to use the vernacular I grew up with – *"She'll be 'right, mate"*. (*Narrator: She did, indeed, end up alright*)

## The idea for a Grid-aware Status Bar emerges

[Tom Jarrett](https://tomjarrett.earth/) designed the [first issue of *Branch*](https://branch.climateaction.tech/issues/issue-1/designing-branch-sustainable-interaction-design-principles/) back in 2020, and we reached out to him to see if he'd like to help with the 2025 grid-aware redesign. To our delight Tom said "yes"!

The original *Branch* design had a small selector near the top of the page which allowed visitors to change between the different grid aware views available – live, low, moderate, high. Grid intensity information was also shown on the far right side of the page (i.e. "Low grid intensity", "Moderate grid intensity", or "High grid intensity").


![ ](https://www.thegreenwebfoundation.org/wp-content/uploads/Pasted-image-20250805125902-1024x945.png 'A screenshot of the original Branch design showing the "Grid intensity view" selector in the top right right and grid intensity information on the far right side of the page.')

From the earliest iterations of the 2025 redesign, Tom explored ways to adjust this section of user interface (UI). His aim was to provide visitors with simultaneously much more context about their grid-aware experience, and more control to adjust that experience if they want to. We began calling this part of the design the "grid-aware switcher", which later became the "grid-aware status bar".

![An website screenshot with a narrow bar at the top of the page divided into a few sections - location, grid intensity level, grid intensity data, and an energy saver mode switch.](https://www.thegreenwebfoundation.org/wp-content/uploads/Pasted-image-20250805124055-1024x293.png 'An early draft of a "grid-aware switcher" on the redesigned Branch website.')

## Exploring through iteration

As we continued iterating on the redesign, the Grid-aware Status Bar started to become central to how grid-awareness would be applied to *Branch* from both a technical and user education standpoint. Many conversations were had about the look, feel, and functionality of the status bar. But many more took place focusing on the wording for different elements within the status bar, what those words conveyed, and how much information should be presented to visitors.

Some of these decisions were made for us by the information available from the [Electricity Maps Carbon Aware Websites API](https://portal.electricitymaps.com/developer-hub/api/reference#latest-carbon-intensity-level) which is the data source behind grid-awareness on *Branch*. For example, the API returns only "high", "moderate", or "low" values for a given energy grid which limits the level of detail we could present to a user without making additional API requests.

Other important decisions made in the design process focused on user experience considerations. These went through several rounds of iteration and discussion before we landed on a final design. These included things like:

* How location information was presented to the user (and at what granularity – local grid, region, country?). We went with the local grid for *Branch*.
* Whether to show a "last updated" timestamp in the status bar. We eventually opted against this to a) reduce clutter, and b) reduce confusion to the user as to what the timestamp is representing.
* How to word the toggle which activates the automatic application of grid-aware design to the website versus allowing the user to choose the view for themselves. After much iteration we settled on "Grid-aware mode" to describe this toggle.

## Building a status bar for reuse

When I first saw Tom's early drafts for a status bar, my mind went straight to *"this is brilliant, and something that we should build so that it's reusable by others as well"*. Pretty much I was thinking about it as a [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) from day one. That thinking also played an important role in some of the decisions we made around the design and functionality of the status bar.

The "status bar as a web component" idea also introduced some scope creep into the Grid-aware Websites project and *Branch* redesign. It's not something we had originally planned for, but it just made so much sense to do that it was worth the extra effort. An unintended upside of this scope creep was that it allowed us to separate out some of the redesign workload – Hannah could work on WordPress code, and I could build out the web component. Being able to split up the work like this was probably critical to us getting the redesign out in time for the Branch Issue 9 launch.

![A screenshot showing the top of the Branch website. Above the main navigation are three boxes spread across the screen - two on the left show information about the location and grid intensity level, while on the right has a toggle with "grid-aware mode" set to "auto".](https://www.thegreenwebfoundation.org/wp-content/uploads/Pasted-image-20250811193954.png 'Screenshot of the grid-aware status bar web component implemented on the redesigned Branch website.')

## Features and functionality

While building the web component to be used on *Branch* was the main priority through the development process, we also wanted to make sure we created something that would be useful to any website looking to use the Grid-aware Websites library.

### Drop it anywhere on a page

While on *Branch* we've put the status bar at the very top of the site, we can't be certain that everyone using it would want to do the same. Using [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries), a newish feature on the web platform, we've been able to build the web component so that it resizes based on its parent element on the web page. This means that if someone wants to put the web component into a narrow sidebar menu, they absolutely can!

In fact, I use the web component in the footer of this site. To demonstrate this flexibility, I've also put the web component into the middle of this blog post which is a narrower container.

Oh hey, and these web components are interactive too 😉. Click around. *Note: I've set fixed location and grid intensity for the demo in this post. The one in the footer should show your actual location and grid intensity.*

---

#### Demo

<gaw-info-bar data-gaw-location="JP" data-gaw-level="low" data-learn-more-link="https://example.com/grid-aware" data-popover-text="Custom information about grid-aware design" data-views="default, low, moderate, high" data-default-view="default"> </gaw-info-bar>

---

A big thank you to [Hannah](https://www.thegreenwebfoundation.org/our-team/bio-hannah-smith/) for getting the initial Container Queries implementation into the component!

### Preserve state across pages

The Grid-aware Status Bar allows website visitors to opt-in/out of automatically applying grid-awareness to their browsing experience. If grid-awareness *is not* being automatically applied (as is the case when you visit *Branch* for the first time), the user then also has the ability to select the website "mode" they wish to see.

It's important that these user choices are retained as a user navigates the website. To do this, the status bar web component saves state via cookies in the browser.

#### Why cookies?

The Grid-aware Websites library has been designed to function server-side (or in edge functions). As a result, we need some way for the state selected by the user (e.g. grid-aware mode auto on/off) to be communicated with the server in a reliable way. By setting cookies in the browser to capture visitor actions, our server-side grid-aware code library can read those cookies as they are included in each website request that is made. This allows the server-side code to know which version of the website to return if the user has manually selected one, or if it should proceed with performing live grid-aware checks instead.

### Customisable grid-aware modes

On *Branch* we have [four different "grid-aware modes"](https://branch.climateaction.tech/issues/issue-9/designing-a-grid-aware-branch/) for the user to experience. Other websites might have three, or even just two. So we've made it possible for developers to specify and name the different "grid-aware modes" on their website. Visitors can select from these modes when not automatically applying grid-aware changes. Developers can also set a default mode which is seen by users who have not manually selected a specific mode to be displayed.

![A screenshot showing the four display modes for the Branch website. &quot;Low grid intensity&quot; in the top left, with a green background and colour images. &quot;Moderate grid intensity&quot; in the top right with an orange background and grey images. &quot;High grid intensity&quot; in the bottom left  with a red background and images replaced with placeholder text content. &quot;Default mode or no data available&quot; in the bottom right with a grey background and colour images.](https://www.thegreenwebfoundation.org/wp-content/uploads/Frame-2-1024x664.jpg 'Screenshots showing the four display modes for the Branch website.')

### Extra information in a popover

We view the status bar web component as being the main way a visitor would interact with grid-aware functionality on a website. For that reason, we felt it was important to have some way for developers implementing it to tell people about what they're seeing and where they can go to for more information. Developers can do this by setting a couple of data attributes on the web component when adding it to their page.

The information popover is triggered when a visitor clicks the 'i' icon located on the far right side of the "grid-aware toggle". Again, we've taken this opportunity to use some newer browser features which allow for popovers to be added to a page with minimal additional code. Thanks to [Nick L](https://nicklewis.dev/) for pointing us in the direction of the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). In supported browsers, the popover will appear below or above the web component as space allows. On other browsers, it will appear in the center of the screen with a darkened background. Eventually as all browsers include this new API, the user experience will become consistent.

## Using the Grid-aware Status Bar on your website

The Grid-aware Status Bar is an open source project. You can explore the [code repository on GitHub](https://github.com/thegreenwebfoundation/gaw-web-component) which includes installation steps and configuration instructions. That's also the place you can post any bugs or issues you might be having with the Status Bar, and of course we also welcome community code contributions as well!

If you're using the Grid-aware Status Bar on your website, then we'd love to know about it. You can tag us on [LinkedIn](https://www.linkedin.com/company/9184998), or get in touch with us via our [support form](https://www.thegreenwebfoundation.org/support-form/).

The Status Bar is designed to work with the [Grid-aware Websites project](https://github.com/thegreenwebfoundation/grid-aware-websites). If you are using the Grid-aware Websites project on Cloudflare Workers, we have a plugin that can help you get started quickly and includes configuration options to automatically include the Grid-aware Status Bar on your site. We've got a blog post coming out soon about how we did this, but in the meantime you can learn more in the [Grid-aware Websites Cloudflare Workers plugin repository](https://github.com/thegreenwebfoundation/gaw-plugin-cloudflare-workers) and in this [tutorial on our Developer Docs website](https://developers.thegreenwebfoundation.org/grid-aware-websites/tutorials/grid-aware-tutorial-cloudflare-workers/).
