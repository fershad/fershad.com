---
title: Disabling elements with CSS pointer-events and media queries
published: 2020/02/04
permalink:  /writing/css-pointer-events-disable-elements/
summary: >-
  A recent project required a collapsible section of content to remain expanded
  on desktop and collapsible on mobiles. Here's how I made it work with a
  handful of CSS.
---

A recent project I've been working on presented me with an interesting little challenge. I was working with a collapsible section of content that was triggered by a styled label and hidden checkbox. On mobiles, the content had to be collapsible, while on larger displays the content was to remain expanded and unable to collapse

My initial thought was to reach for javascript. I planned to traverse the DOM to identify particular styles attached to the input checkbox and label at various breakpoints. That started to get messy, and so I began searching for an alternate solution. That's when I stumbled on CSS `pointer-events`.

By combining CSS `pointer-events: none` with media queries I was able to achieve what I needed in many, many fewer lines of code. You can [read more about pointer-events at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events).

<!-- markdownlint-disable -->
{% codeToHtml "css" %}
@media only screen and (min-width: 768px;) {
    input[type="checkbox"],
        .input-label {
        pointer-events: none;
    }
}
{% endcodeToHtml %}
<!-- markdownlint-enable -->

{% callout "Gotcha" %}
It's worth noting that the input item will still be tab accessible.
{% endcallout %}
