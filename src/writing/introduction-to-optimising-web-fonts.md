---
title: An introduction to optimising web fonts
published: 2021/05/14
---

During April & May, 2021, I ran a series about web font optimisation over on [Optimised](https://optimised.email/) - a bi-weekly email newsletter I publish that focuses on website performance. This post is a consolidation of some of the key points from those newsletters. For a more detailed guide, you can [read the series](https://optimised.email/issues/issue-13-optimising-web-fonts-part-1) over on the Optimised website.

## Web fonts & Core Web Vitals

Poor font loading can also negatively impact your Core Web Vital scores, especially for Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).

LCP measures the time taken for the largest above-the-fold element to be rendered on screen. If you've got slow loading fonts, then there's a risk the LCP timing gets pushed out.

CLS indicates the movement of visible elements as the user loads and interacts with the page. Initially a page may use fallback fonts to show content. These can be replaced by web fonts once they've loaded. However, this can lead to content on the page being moved around as the weighting and spacing of the custom font take effect.

## Consider system fonts

It's worth asking the people responsible for designing your website whether you can do without web fonts for some or all of the textual content. Leveraging the fonts that come pre-loaded on different operating systems can give a real performance boost to any site.

Here are some questions to ask when designing a new site:

- Could system fonts be used for all the web page text?
- Could system fonts be used for all paragraph text & a custom font be used only for headings?
- If you need to use a custom font, could you just stick to one font family and use different weighting for headings and paragraph text?

Iain Bean [**wrote a nice article**](https://iainbean.com/posts/2021/system-fonts-dont-have-to-be-ugly/) early last month that has some handy demonstrations of attractive system fonts. [**Systemfontstack**](https://systemfontstack.com/) gives standard code snippets for serif, sans-serif and mono typefaces. [**Font style matcher**](https://meowni.ca/font-style-matcher/) is a handy tool that can generate the code you need to have system fonts closely match popular web fonts. You can also apply the code to fallback fonts, which can help reduce CLS.

## Consider Variable Fonts

Variable fonts allow for multiple font variations to be served in a single file. By changing a few CSS properties we're now able to generate any combination of weight and style. All this without the need for multiple requests. They also allow for animations & transitions. You can find and play around with variable fonts at [Variable Fonts](https://v-fonts.com/) or [Axis-Praxis](https://www.axis-praxis.org/). To learn more [I recommend this great post](https://css-tricks.com/one-file-many-options-using-variable-fonts-web/) on CSS Tricks.

## Use a modern format

Common font formats you're likely to see around the web are:

- TrueType font (TTF)
- Embedded Open Type (EOT)
- Web Open Font Format (WOFF/WOFF2)

The most modern, and best optimised, of the list above is WOFF2. Support is good **[across modern browsers](https://caniuse.com/woff2).** In 2021 there's really no reason not to be using it on your website. If you need support for older browsers you can still serve WOFF2 and provide WOFF & TTF as fallbacks.

If you need to create WOFF2 variants of your font files, use one of the tools below:

- [**Font Squirrel's Generator**](https://www.fontsquirrel.com/tools/webfont-generator)​
- [**Transfonter's Online @font-face Generator**](https://transfonter.org/)​
- [**Fontie**](https://fontie.pixelsvsbytes.com/webfont-generator)​

## Remove unused characters (subsetting)

Fonts can often contain contain glyphs for languages and character sets that we simply don't need. Removing these additional glyphs can help shave hundreds of kilobytes off our font files.

There are a few ways of subsetting fonts:

- Command-line tools like [**Glyphhanger**](https://github.com/filamentgroup/glyphhanger)​
- Online tools like Font Squirrel, Fontie & Transfonter
- Graphical tools like [**FontForge**](https://fontforge.org/en-US/)​

Be aware that some web fonts have licenses that prevent modification.

## Self-host font files

Hosting resources like fonts on your own domain can help speed up the request time for assets since there's no need to initiate new TCP/SSL connections each time.

## Use preload effectively

Preload is extremely handy in prompting the browser to download certain assets earlier than it otherwise might. However, _if everything is a priority, then nothing is_.

The `preload` tag you'd place in the head of your HTML page should end up looking something like this:

{% codeToHtml html %}
<!-- markdownlint-disable -->
    <link rel="preload" href="webfont.woff2" as="font" type="font/woff2" crossorigin>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

## Use font-display effectively

`font-display` is a CSS property you can add to the `@font-face` blocks of your code to tell the browser how to handle that displaying content before a web font is fully downloaded.

There are two values you should consider:

- `font-display: swap` - Tells the browser to show text immediately using the first available fallback font, and then swap in the web font when it's downloaded. Better for LCP, but can impact CLS.
- `font-display: optional` - Instructs the browser to hide text for 100ms and then load the web font only if it's available. If it's not ready, then the browser will use a fallback font instead for that page view. Great for LCP & CLS, but not great for highly branded designs.
