---
title: Optimising embedded content
published: 2021/01/21
---

I want to cover a few ways you can optimise pages that have Twitter/YouTube content embeds. The idea for this stems from a tweet by Matt Hobbs in which he points out just how much bloat an embedded tweet can add to a webpage.

> LCP: 600ms slower  
> 2.7MB more JS!  
> 25 more requests  
> LH score dropped 50%  
> _\- **Matt Hobbs**, Twitter ([Link](https://twitter.com/TheRealNooshu/status/1350578919389470721))_

Embedding content hosted on a third-party is a great way to keep visitors engaged, without them having to leave the site. However, as with most third-party resources we load, there are costs both in terms of extra network requests, file size, as well as performance penalties.

We're going to look at a few different methods you can apply to Twitter & YouTube embeds. These can help significantly reduce page size and remove/reduce JavaScript that the user has to download and execute, while still delivering content to the user and keeping them on your site.

## Twitter

### Drop the script tag

If you want to keep things very simple, just remove the `<script>` tag that's tacked onto the end of the standard Twitter embed script. It looks like this `<script async src="<https://platform.twitter.com/widgets.js>" charset="utf-8"></script>` and you'll find it at the very end of the code Twitter generates for you when you want to embed a tweet.

{% codeToHtml html %}
<!-- markdownlint-disable -->
    <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr">Bernie...go home already <a href="<https://t.co/Ok1WpgjgJS>">pic.twitter.com/Ok1WpgjgJS</a></p>&mdash; The Daily Show (@TheDailyShow) <a href="<https://twitter.com/TheDailyShow/status/1352074243911999489?ref_src=twsrc%5Etfw>">January 21, 2021</a></blockquote> <script async src="<https://platform.twitter.com/widgets.js>" charset="utf-8"></script>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

{% codeToHtml html %}
<!-- markdownlint-disable -->
    <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr">Bernie...go home already <a href="<https://t.co/Ok1WpgjgJS>">pic.twitter.com/Ok1WpgjgJS</a></p>&mdash; The Daily Show (@TheDailyShow) <a href="<https://twitter.com/TheDailyShow/status/1352074243911999489?ref_src=twsrc%5Etfw>">January 21, 2021</a></blockquote>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

The scripts above are with & without the `<script>` tag respectively. I ran a quick test on my local machine & found that comparing the two code snippets above, the one without the `<script>` tag came in a whopping 2.8MB smaller.

It's worth noting that this method isn't great for tweets with images (the image won't display). I'd very, very strongly recommend using it for tweets that are pure text though.

### Replace with an image

Say you do want to embed a tweet that contains an image. In this case, you can use a screenshot of the tweet in place of the code above. You can use a service like [Tweet Cyborg](https://tweetcyborg.com/) or a Chrome extension to do the work for you.

With the initial screenshot in hand, I'd recommend running it through image compression and creating WebP and/or AVIF versions of it as well. That way you can be sure you're serving the lightest possible file to users.

As a final step, when publishing the image on your site be sure to add ALT text to the image element to describe it's content for people using screen readers. It's a nice touch to also link to the tweet as well.

## YouTube

### Lazy-load the iframe

We've seen that it's possible to lazy-load images, but did you know that the same `loading=lazy` attribute can also be added to `<iframe>` tags?

{% codeToHtml html %}
<!-- markdownlint-disable -->
    <iframe width="560" height="315" src="<https://www.youtube.com/embed/YM3KszYmn58>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <iframe loading="lazy" width="560" height="315" src="<https://www.youtube.com/embed/YM3KszYmn58>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

I [wrote about this approach](https://www.fershad.com/blog/posts/lazy-loading-embedded-iframes/) in October last year if you want to get some more details. It's best suited for when you're embedding a YouTube video further down the page - saving about 1.8MB on the initial page load.

### Use an image placeholder

This [sick little trick](https://css-tricks.com/lazy-load-embedded-youtube-videos/) comes courtesy of Arthur Corenzan. It works by replacing the regular (bulky) YouTube embed code with a placeholder image. The YouTube video content only gets loaded if the user clicks on the play button that's programmagically (yep, that's a thing) place on the placeholder. The code looks like this:

{% codeToHtml html %}
<!-- markdownlint-disable -->
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/YM3KszYmn58"
      srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/YM3KszYmn58?autoplay=1><img src=https://img.youtube.com/vi/YM3KszYmn58/hqdefault.jpg alt='Improving The Page Loading Experience To Reduce Layout Shift by Jen Simmons'><span>▶</span></a>"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="Improving The Page Loading Experience To Reduce Layout Shift by Jen Simmons"
    ></iframe>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

Using this trick I was able to get the YouTube embed size down to 18kB on initial page load. Adding `loading=lazy` onto this iframe would bring that initial hit down to 0kB if the asset was further down the page.

{% callout %}
Be sure to replace the the YouTube video code in the code above - it appears in 3 places. You should also replace the title & alt fields with relevant text.
{% endcallout %}
