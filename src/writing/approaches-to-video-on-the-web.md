---
title: Approaches to video on the web
published: 2021/12/23
permalink:  /writing/approaches-to-video-on-the-web/
summary: >-
  Video is becoming an increasingly critical part of the online experience. So
  how can you include video on a web page without hurting Core Web Vitals,
  performance or digital sustainability?
---

I’ve recently been working on a website build for a client that wanted to self-host videos in their Content Management System (CMS). To make things a bit more challenging from a performance perspective they also wanted to be able to use hero videos on parts of their site. This sent me down a bit of a rabbit hole looking at some of the best ways to handle video on the web, from both a performance and sustainability perspective.

## The best video is no video

This is easier said than done. Every client has their own vision for their website, and video is playing an ever increasing role in that. Education around the potential impacts of video on website performance and sustainability is always a good place to start.

Loading video can consume a lot of bandwidth, which can get in the way of other resources. This is especially important to keep in mind when loading autoplay video elements. Videos can also take some time to load, especially over slower connections. This has the potential to hurt your site’s Largest Contentful Paint (LCP) scores, especially if you’re using hero (or jumbotron) videos at the top of a page.

## The site _needs_ video. Now what?

So, you’ve talked things through and reached the conclusion that videos are still an important part of the overall website design. There are a few things you can do now to minimise the performance impacts when video is used. These will also reduce data consumption when loading the page.

### Compress it

First up, have someone run the video files through a video transcoding tool like [FFMPEG](https://ffmpeg.org/) or [Handbrake](https://handbrake.fr/). If you’re using the video file directly on your site (i.e. not using a service like Cloudinary or YouTube), then you’ll probably want to export it in MP4 (H.264 codec) format for the best cross-browser support.

### Use a dedicated video streaming service

If possible, look at using a dedicated video streaming service to host video for your site. [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dyg8fkjzrzhfeiqce9nl), [Mux](https://mux.com/) and [Cloudflare](https://developers.cloudflare.com/stream/) all provide video streaming options. These services send down appropriately sized video to a device and adjust bitrate to account for network conditions as well. In doing so, you go a long way towards ensuring that the video content served to a website visitor is as optimised as it can possibly be.

### If you’re using YouTube

It might be the case that videos are being posted to YouTube, and there’s a need to embed them on the website. YouTube’s regular embed code pulls in a whole bunch of additional data that isn’t needed for the video. Out of the box it does everything on page load too, even if the video is further down the page. Here are some ways to optimise YouTube content for your site:

- **Using YouTube’s embed code** - If you’re using the embed code from YouTube’s website, then add the `loading="lazy"` attribute to the `iframe` , especially if the content is not visible when the page first loads.
- **Use a facade** - Alternately, you can use an image facade which loads in place of the video. Only when the user clicks on the facade will the YouTube content start downloading. I’ve written about this with some sample code [in a previous post](https://fershad.com/writing/optimising-embedded-content#youtube).
- **Use a custom element** - For better performance, you can use a custom element like Paul Irish’s [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed).

### And then a hero comes along 🎶

Handling hero video elements gets a bit trickier. Since they’re almost always at the top of the page we can’t defer loading content. If you’re using a video hosting service, then be sure to have a `preconnect` link tag in the head of your page to get the connection started sooner.

If you’re self-hosting video, then there are a few key things you can do:

- Have a `poster` attribute on your `<video>` tag. The poster will be shown while the rest of the video content loads.
- Be sure to set an `aspect-ratio` for the video element to avoid layout shift once it loads.

Simon Hearne has a great post with these and other more detailed tips for [delivering performant hero videos](https://simonhearne.com/2021/fast-responsive-videos/).

### A couple more tips

To finish off, here are a couple of extra tips that can come in handy especially if you are self-hosting video on your website.

- Read this post by Doug Sillars on [serving video on mobile devices](https://dougsillars.com/2020/03/03/video-playback-on-mobile-devices/). You won’t regret it.
- If you **_don’t_** need an autoplay video, then use a `poster` attribute on the `<video>` tag. Also, you can add the `preload="none"` attribute to prevent too much video content being downloaded. There’s a [useful post on web.dev](https://web.dev/fast-playback-with-preload/#video-preload-attribute) about this.
- You can also use a facade in place of the video element on the page. This can be a chance for web designers to get really creative! Once the user interacts with the facade, then the video can start loading.
- For short, decorative videos that you need to autoplay only when they’re shown in the viewport [check out this video](https://www.youtube.com/watch?v=mV4tnQkqhmI) from Chris Coyer & Dave Rupert.
