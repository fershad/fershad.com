---
title: Web icons in 2021
published: 2021/01/07
permalink:  /writing/web-icons-in-2021/
summary: >-
  This post is taken from Optimised, the fortnightly web performance newsletter
  I run. In it we look at the different options that you can consider, and why
  you really should be using SVG in 2021.
---

In modern web apps icons are heavily leaned on by designers to convey state, functions, or actions. Even if you've got a simple website you'll most likely want to include some links to social media platforms, or maybe contact information. Icons come in handy here too, making content & links stand out visually from the rest of the page. The strategies I cover in this issue are best suited to websites that need just a few icons sprinkled around the site rather than larger web apps (which tend to lean more heavily on icons).

Like many things in web development, you've got a few options if you need to add icons to your website:

1. Use raster images (like PNG)
2. Use a CSS sprite (when you create a single image file containing all the icons you need, then load them by manipulating the image position in CSS)
3. Use an icon font (like Font Awesome)
4. Use SVGs

## **Raster Images & CSS Sprites**

Using raster images, either as a single file or through a CSS sprite, has one major drawback. Due to the nature of raster images, they don't scale very well. This might not be a problem if the icons on your site will be a fixed size across all displays. However, you'll reach a point where the image starts to pixelate the moment you need to adjust the size in either direction.

Another drawback of using raster images is that they result in more requests on the network, which can slow down site performance (especially if you use them at the top of your page). CSS sprites solve this somewhat because only a single file is downloaded & then reused repeatedly. Image do allow you to utilise caching to speed things up for repeat visitors.

To use raster images for icons on your site you load them like you would any other image, using the `<img>` HTML tag. If you'd like to use a CSS sprite instead there's [a good beginners guide](https://css-tricks.com/css-sprites/) on CSS Tricks.

## **Icon Fonts**

If you've been in web development for any length of time you've probably used an icon font at some stage. They offer more flexibility when compared to raster images, especially since they can be controlled by the same CSS properties that govern regular fonts.

The CSS files that power most icon fonts are hosted on CDNs. You link to these fairly early on in your HTML document (especially if you're using icons above the fold). Once upon a time this did mean that more popular icon font libraries benefited from caching, but [that is no more](https://www.stefanjudis.com/notes/say-goodbye-to-resource-caching-across-sites-and-domains/) a thing. Being hosted externally means the requests for these font files go cross-origin (to another domain that's not our own), and open us up to a host of issues that third-party resources can cause ([see Issue 2](https://www.fershad.com/optimised/issue/2/third-party-resources-a-cautionary-tale/)).

What's more, some browsers block custom fonts or just don't handle them well. This is hard to pick up in testing since you can't possibly test on every iteration of every browser. So, if the browser blocks the resource from loading, or there's a network failure somewhere along the line then your icons will be replaced by those empty little boxes you've no doubt seen from time to time.

## **#SVGcanhelp**

SVG offers a lot of flexibility that raster images & icon fonts simply can't match. Firstly, and as the first word of the name suggests, they're scalable. That means that they'll look as crisp on smaller mobile screens as they do on a large 4K monitor. They're also easier to manipulate, animate, and are far more accessible to screen readers & assistive technologies (especially when compared to icon fonts). You (or your graphics designer) can also easily creat customised (or edit existing) SVG icons using tools like Adobe Illustrator or Figma.

Another benefit of SVG is that you can inline them directly into the HTML of your page (if you have access to that). This results in fewer network requests, which can help slightly speed up page loading performance. Of course that does add some extra weight to you HTML file. Using compression tools like [SVGO](https://github.com/svg/svgo) (command-line tool) or [SVGOMG](https://jakearchibald.github.io/svgomg/) (visual interface) allows you to minify your SVGs just like you would do to any other image.

There are also a lot of sources online that you use to find and download/copy the SVG icon code for free. I've listed a few good ones below that I often reach for:

- [CSS.gg](https://css.gg/app)​
- [Teeny Icons](https://teenyicons.com/)​
- [Tabler Icons](https://tablericons.com/)​
- [FA Icons](https://faicons.dev/)​
- [Basicons](https://basicons.xyz/)​

You can even add SVGs to a sprite, and easily call them from within your code. Florens Verschelde has a [really detailed rundown](https://fvsch.com/svg-icons) of how you can create & use SVGs as icons on your website which I strongly recommend you check out.
