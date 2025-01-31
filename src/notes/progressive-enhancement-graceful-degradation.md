---
title: Progressive enhancement and graceful degradation in the context of grid-aware websites
published: 2025-01-31
---

Since we started working on the [Grid-aware Websites project](https://www.thegreenwebfoundation.org/news/introducing-our-grid-aware-websites-project/) at the Green Web Foundation, and especially since I [implemented grid-awareness on this website](/writing/making-this-website-grid-aware/), this has been on my mind.

_When is it suitable to progressively enhance a page versus gracefully degrade it when applying grid awareness to a website?_

A lot of the feedback I've received has been suggesting that progressive enhancement should be adopted by default. But I think there are times when graceful degradation, as an approach, makes sense.

## Progressive enhancement

The idea of progressively enhancing a grid-aware website goes something like this:

- The default website experience is a "low-impact" one. That is one which prioritises core website functionality over other features.
- Visitors to the site from countries where the energy grid is running on mostly fossil fuel energy would see this version of the site.
- Visitors to the site from countries where the energy grid is running on mostly low carbon energy would see a version with additional functionality that we can afford to have when the grid-aware context allows for it.

One big benefit of this approach is that it makes it easier to "scale up" the visitor experience. For example:

- Visitors from a country where the grid is running on less than 50% low carbon energy would see the default site.
- Visitors from a country where the grid is running on 50 - 90% low carbon energy might see _some_ additional features.
- And, visitors from a country where the grid is running on over 90% low carbon energy will get _even more_ features.

Progressive enhancement, though, takes a lot of careful planning to implement and get right. It's more suitable to greenfield projects where it can be crafted into the overall design and planning for the project. Or, it's suitable to projects where you can control and manipulate the source code and design system without too much overhead.

I'll admit that when redesigning this site, and applying grid-awareness, I should have spent the time to explore the progressive enhancement option. I still want to make a change towards that approach, and since my site is "hand crafted" it's a change I definitely can make while the plane is flying.

## Graceful degradation

The idea of graceful degradation is the opposite to progressive enhancement. The default website experience is feature rich, and visitors from countries with a higher portion of dirty energy generation receive a scaled back version of the site.

You _could_ make functionality gracefully degrade in a manner where it scales down - similar to what I've described above. It just feels harder though. Maybe that's just me, I am tired, and because I'm writing this at 10pm. But it just _feels_ harder and a bit less intuitive.

Since it's the opposite of progressive enhancement, you might have guessed by now that the graceful degradation approach is suitable when applying grid awareness to existing sites where altering an existing design or system may be a tough sell. It's also suitable for scenarios where you don't have easy access to modify the underlying code of the website. For example, I'm looking at how to apply Grid-aware Websites to our own Green Web Foundation website. It's a WordPress site, and I'm not a WordPress or PHP developer. So editing the site's code is beyond me, but I sure as heck could use a Cloudflare Worker to remove some superfluous plugins or content on pages for visitors who are in areas where the grid is running on dirtier fuel sources.
