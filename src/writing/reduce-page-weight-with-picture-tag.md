---
title: Reduce the Weight of Your Web Pages with the Picture Tag
published: 2020/09/16
permalink:  /writing/reduce-page-weight-with-picture-tag/
summary: >-
  Images often combine to make up the largest group of resources on a web page
  (in terms of file size). Therefore, optimising images is one of the easiest
  steps any website owner can take when looking at improving the performance of
  their website.
---

Images often combine to make up the largest group of resources on a web page (in terms of file size). Therefore, optimising images is one of the easiest steps any website owner can take when looking at improving the performance of their website.

Compressing JPEG and PNG images is a great first step to take and can result in some easy web performance wins. However, newer image formats such as WebP and AV1 (.avif) can help massively reduce the size of image files without sacrificing visual quality.

Browser support for new formats, however, can take time. Most times developers will reach for polyfill to aid users on unsupported browsers. Other times they'll just make the decision not to bother with the new, better format entirely.

With images though, we're able to use the newest formats while also supporting users who may be on browsers that can't serve them. We can do this thanks to the HTML Picture Element.

To do this you simply need to present your images in a block like the below:

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
     <picture>
    	<source srcset="img/example.avif" type="image/avif">
    	<source srcset="img/example.webp" type="image/webp">
    	<img src="img/example.jpg" alt="Don't forget ALT text">
    </picture>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

The way this works is:

1. The browser will examine the source elements inside the picture tag sequentially.
2. If it is not able to support the first source file, it will go to the second (you can have as many sources as you want)
3. If it can't support the second source file either, then it will fall back to the `img` element.

By using a compressed JPEG image as fallback, and the picture element as shown above you should be able to achieve a significant reduction in the total size of your web page.
