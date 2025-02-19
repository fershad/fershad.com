---
title: What might a grid-aware CMS be like?
published: 2025-02-19
summary: I've been doing plenty of thinking about grid-aware "things" recently. In this post, I'll share some initial ideas of how grid-awareness could be applied to an online CMS.
---

I've been doing plenty of thinking about grid-aware "things" recently. It's all off the back of the [Grid-aware Websites project](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/) that I'm working on at the Green Web Foundation.

So far, that project has been mostly focused on [applying grid awareness to existing websites](https://developers.thegreenwebfoundation.org/grid-aware-websites/tutorials/grid-aware-tutorial-cloudflare-workers/) using CDN edge functions. But building for the web can be done in a few different ways, and not every site might use a CDN - or at least use a CDN that offers the kind of edge functionality required to apply grid-aware code there. That's got me thinking about different places where our grid-aware code library might be applied, and what those applications might look like. In this post, I'll touch on a few ideas bouncing around my mind about what a grid-aware content management system (CMS) might be like.

## Quickly, what's a CMS

Rather than define a CMS, I'll point to the 2024 Web Almanac which has a couple of paragraphs explaining the term - see **[What is a CMS?](https://almanac.httparchive.org/en/2024/cms#what-is-a-cms)**

> A **Content Management System (CMS)** is a tool that allows individuals and organizations to create, manage, and publish digital content, particularly on the web.
>
> <cite><a href="https://almanac.httparchive.org/en/2024/cms#what-is-a-cms">2024 Web Almanac</a></cite>

Some CMS platforms you might be familiar with are:

- WordPress
- Drupal
- Joomla
- Wix
- Squarespace
- Umbraco
- Contentful
- Sanity
- ... this list could go on for a while

This post does not focus on any one single CMS platform, nor have I thought deeply about how the ideas mentioned would apply to a specific CMS.

## Why apply grid-awareness to a CMS?

The initial focus of our Grid-aware Websites project has been focused on reducing the energy used by a web page on a website visitor's device, when that user is in a location that's powered by mostly fossil fuel sources.

But for many CMS platforms, they not only deliver the web page experience for a site, but they also control the underlying content hosting and delivery as well. A CMS will often provide users with a graphical interface through which they can manage their website's content. Some CMS platforms enable plugins to run whenever a web page is built. And, how web pages are built might differ from CMS to CMS as well - with some creating new pages each time they're updated, while others will save the data for a page in a database and then build the page whenever a user requests it.

All that is to say, there's a lot that happens with CMS platforms that *is not* happening on the device of a website visitor. Rather, it's happening on a server somewhere else. So when thinking about applying grid-awareness to a CMS, it would probably pay to think beyond the user's device and consider server-side applications as well.

## Ideas for applying grid-awareness to a CMS

Below are some of the ideas I've had for what might be possible when applying grid-awareness to a CMS.

### Provider an indicator on an editor's dashboard

When publishing content to a website using a CMS, most website owners (or their teams) will login to some kind of online dashboard to create/edit that content. This makes those dashboards the perfect place to surface grid-aware related information to those editors. This could be:

- Use the editors location to indicate to them that currently their local grid is dirtier than usual, and they might want to consider logging in at another time to make content updates.
- Using the CMS server location to indicate similar information to the editor based on where the server is based.

In both cases, nothing is forced upon the user. Rather they are given an indication that right now the actions they are taking are being powered by dirtier energy. If their task is not critical, they can choose to delay it until a later time when hopefully the grid is running on cleaner sources.

The indication can be given to the user either before/when they first login, or it might be more timely to place it on an content editing or publishing screen.

### Delay running certain processor intensive tasks

Publishing on a web based CMS often requires background tasks to take place as part of the publishing process. There's database read-write tasks, as well as media uploads, and sometimes media optimisations. Could some of these tasks be deferred or delayed until the grid is running on cleaner energy?

In this case, you would run the grid-aware code entirely server-side. The user should still be given some notice that certain actions will be run at a later time when the grid is powered by cleaner energy sources. For completeness, it would make sense to give the user the option to override these settings (either permanently or temporarily), especially if they have time critical content that needs to get online.

### Expose APIs that plugin authors can easily hook into

Even if a CMS chooses not to include any grid-aware logic by default into their core code, they could still include the library and provide hooks for plugin authors to use. This would mean that authors of plugins for a given CMS would not need to implement grid-awareness into their plugins separately, but rather could use a common set of consistent entry points that would allow their plugin to add grid-aware features easily.

Having a common set of hooks that all CMS plugin authors can use would also allow for ideas to be shared across plugins, and possibly even surface common patterns that CMS owners could later include as defaults in their core code base.

### Explore if any common frontend components can be tweaked

Some CMS platforms also ship with frontend design libraries that contain regularly used code and components for people to apply to their sites. Others ship with themes that offer something similar.

The common components or themes are perfect for applying grid-aware design ideas to, since they are widely used. This means that a small change will have an impact across hundreds or thousands of websites. By exploring how certain common components and themes can be adjusted to reduce their impact on a user's device when the grid is dirtier, CMS owners can give developers working on their platform a toolkit to deploy grid-awareness quickly and in a predictable way.

Who knows, the process of looking into reducing the impact of common components and themes might even surface ways that these low impact designs can be the default - offering the same user experience, without the drain on their device. That would be the ultimate win.

## To do less, or do more?

The above ideas are all based around the premise of "doing less" when the energy grid is powered by more fossil fuel sources. I've applied this thinking because a lot of CMS functionality has already been built, so it's easier to reduce functionality than the other way around. If you were building a CMS from scratch today, and wanted to apply grid-awareness to it, then you could look to make the reduced functionality state the default and add functionality as the grid becomes cleaner. See this note about [progressive enhancement and graceful degradation](https://fershad.com/notes/progressive-enhancement-graceful-degradation/) for more context.
