---
title: Take it easy with transitions
published: 2022/05/13
permalink:  /writing/take-it-easy-with-transitions/
summary: >-
  I’ve been doing a few audits of late, and one thing that keeps coming up is
  the use of transition effects on page load (or above the fold content). This
  post looks at some of the performance pitfalls that can arise from this
  practice, as well as what you should keep in mind.
---

Transitions and animations can make for wonderful website experiences. [Cassie Evans’s personal website](https://www.cassie.codes/) is a playful, whimsy corner of the internet that is delightfully crafted. But as with a lot of things, transitions and animations can be overused on websites. And, at times, that can come detriment of web performance.

This post will look at how transitioning content above the fold can impact a page’s performance metrics.

## Triggered

Okay, so a quick admission. I’m not a huge fan of pages that fade in entire sections of content as you scroll. So, even though we’ll be concentrating on content ‘above the fold’, I’ve got some biases when it comes to what we’ll talk about for the rest of this article.

## Full page fade

This is something I’ve seen on a few sites recently, and it’s a very, very easy way to absolute trash your site’s Core Web Vital scores.

Fading in a page when a user lands on it might look “cool”, but it relies heavily on JavaScript to kick off the fade in transition. This is because you probably want to wait until the page’s content has been loaded before fading it in. You’ll therefore need a script that’s listening for some load event, and then executing some code (normally adding/removing a class from the `body`).

I was recently looking at a site that was pulling in all their assets from multiple external domains. They were using jQuery UI as part of their theme to fade in the page once all the content had been loaded. Connections to the external origins was setting their page load back by about 500 milliseconds. Meanwhile waiting for jQuery and its dependencies to load (also from external origins) was tacking on another 1.5 seconds. The jQuery code was then waiting for the rest of the page’s content to download before revealing the page.

It’s little wonder that LCP timings on mobile were upwards of 5 seconds in this case.

## Partial fades

This is another one that I see regularly. Rather than transitioning in the full page, effects are added to individual elements above the fold. While this is better than waiting for the entire page to load, poor implementation can still lead to LCP or CLS blowouts.

### Minimise your reliance on JS

If you do want to partially fade in a particular above-the-fold element on your site, then try to avoid a situation like the one above. If possible, try to target the element specifically using as little JavaScript as possible. You can use the `onload` attribute to trigger a small bit of code that addes a CSS class to fade in the element once it’s ready. This is far more efficient than having to download an entire JavaScript library.

### Know your LCP

It could be the case that the element you’re fading in is also the LCP candidate for the page. In this case, you’ll want to be sure to check how the transition effect impacts your LCP timings.

### Watch out for layout shifts

This could happen in the event that you’re using a JavaScript library to control how content on your page is positioned. One site I recently audited experienced this. Their page would load, with content in one position, then once their theme’s JavaScript kicked in that content would reposition itself and have some transition effects applied. This presents a rather janky experience for the user, and is something you’ll want to try and avoid.

## Sprinkles are good

As with a lot of things, when used in moderation transitions can add a remarkable amount of character to a website. Being selective in how you apply transitions above the fold can go a long way to ensuring they’re not negatively impacting on your site’s performance too.
