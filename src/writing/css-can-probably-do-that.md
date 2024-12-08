---
title: CSS can probably do that
published: 2021/03/09
---

In the not too distant past, web developers would almost instinctively reach for jQuery when starting out a new project. The features and capabilities it opened up were immense and were simply not present in native JavaScript at that time.

Fast forward to today, and a lot of the things we once used jQuery for are now easily done with modern JavaScript. This is a huge performance win, being one less library for the browser to download, parse and execute. Check out [You Might Not Need jQuery](http://youmightnotneedjquery.com/) to see what's now possible.

## Using JavaScript still comes at a cost

But JavaScript still puts a heavy burden on the browser, especially to compile and execute it. By using CSS whenever possible we can remove that burden from the browser, keeping the main thread free to handle other tasks.

- Smooth scrolling
- Lazy-loading content
- Keeping elements stuck in the viewport while scrolling
- Smoothly scrolling in & snapping elements into place

All the tasks listed above were once only capable of using JavaScript, and or jQuery. They're now all things that [modern browsers can handle natively](https://calendar.perfplanet.com/2020/html-and-css-techniques-to-reduce-your-javascript/) with CSS. In the case of lazy-loading content, there is actually a native HTML attribute for that.

Over on CSS Tricks, Håvard Brynjulfsen has a very slick demonstration of creating a [shrinking sticky site header entirely controlled with CSS](https://css-tricks.com/how-to-create-a-shrinking-header-on-scroll-without-javascript/). This was definitely a case where once JavaScript would have been required to keep track of the user's scroll position and apply classes to change the header.

## Even cooler stuff coming up

Scroll-linked animations is an upcoming CSS addition that will open up a world of even more amazing page effects, all without having to run any JavaScript. It will replace a lot of the things we might normally use IntersectionObserver for, such as scroll-triggered animations. There's still a way to go before we get support for it in browsers, but Bramus Van Damme has been [playing around with it on his blog](https://www.bram.us/2021/02/23/the-future-of-css-scroll-linked-animations-part-1/#more-demos--full-screen-panels-with-snap-points).

## Resources

- [**HTML and CSS techniques to reduce your JavaScript**](https://calendar.perfplanet.com/2020/html-and-css-techniques-to-reduce-your-javascript/) - Anthony Ricaud covers a few of the very common tasks we used to need JavaScript for, but which are now very much possible with CSS. It's a good read, with explanations of the JavaScript solutions and CSS alternatives.
- [**How to Create a Shrinking Header on Scroll Without JavaScript**](https://css-tricks.com/how-to-create-a-shrinking-header-on-scroll-without-javascript/) - A very slick use case for CSS position: sticky which starts out nice and large, and shrinks (while remaining fixed to the top of the screen) as the user scrolls.
- [**The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)**](https://www.bram.us/2021/02/23/the-future-of-css-scroll-linked-animations-part-1/#more-demos--full-screen-panels-with-snap-points) - Bramus Van Damme's very detailed experimentations with CSS scroll-linked animations.
