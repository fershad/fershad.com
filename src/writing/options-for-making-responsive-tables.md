---
title: Two options for making responsive tables for your website
published: 2020/03/27
permalink:  /writing/options-for-making-responsive-tables/
summary: >-
  I recently found myself having to create a website that presented a lot of
  data in tabular format. This post goes through two approached that I tried
  out. Firstly, using table markup and horizontal scrolling, and then looking at
  how it can happen with CSS Grid.
---

I recently found myself having to create a website that presented a lot of data in tabular format. If we were only having to think about tablet and desktop displays then that's easy. However, things get a bit trickier when trying to present tabular data on mobile viewports. Of course, we don't want to overload visitors by cramming all the data into the viewport. At the same time we want to present it in a fashion that is clean, elegant, and makes data discoverable.

After sketching out a few ideas, I started looking around the internet for ideas. Pretty quickly I came across [this post form Davide Rizzo on CSS Tricks](https://css-tricks.com/accessible-simple-responsive-tables/). It flicked a switch. I started thinking about making a table with div elements, rather than table markup.

This post goes through two approached that I tried out. Firstly, using table markup and horizontal scrolling, and then looking at how it can happen with CSS Grid.

## Using Table Markup

This is the method I ended up settling on, just because it was the easiest to put in place. The key to this solution is two-fold:

1. Wrap your table in a holder div that is `position: relative;` and with the `overflow: auto;`.
2. Make the table itself set to **`width: 100%; overflow: hidden; table-layout: auto;`**

You can see this in action in the Codepen below. If you resize the results window you can see how the table becomes scrollable at a specific breakpoint, while shown in full on wider displays.

{% codepenIframe "RwPqLGP", "Responsive scrolling table", "fishintaiwan" %}

## Using CSS Grid

This approach is one that I really like, and something I'd like to use for a project in the future. It lets you break out from the shackles of the table markup and present data how you want to at specific breakpoints. In the Codepen below cards uses cards on smaller viewports, and a table at wider breakpoints.

The key to this approach is changing the `grid-template-areas` property. There are a few other things you should keep in mind:

1. You're going to need a div for each row of data.
2. Within that "row" div you'll need to have header div elements and content div elements. All these elements will need to be assigned a `grid-area` property.
3. By assigning all elements inside a row a `grid-area` property you can then customise the layout for smaller viewports by changing the `grid-template-areas` property of the wrapper div.
4. For wider breakpoints, you'll need to hide all but the first row's headings. I've done that by using the :not(:first-child) pseudo-class selectors.

Have a look at the Codepen embed below, and resize the viewport to see the change in action.

{% codepenIframe "rNVQgmr", "Responsive table using CSS Grid", "fishintaiwan" %}
