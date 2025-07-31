---
title: All carbon emissions calculations
published: 2023-11-18
lang: en
type: post
---

Recently, I've been looking at a few different carbon emissions calculation models for work. Despite each being different in what they are measuring, they all eventually boil down to something like this:

<!-- markdownlint-disable -->

{% codeToHtml "text", "" %}
Carbon Emissions = Energy Used x Energy Intensity
{% endcodeToHtml %}

<!-- markdownlint-enable -->

Where they differ is:

- How the work out the `Energy Used`.
- What inputs they take and how that data is collected.
- Whether the `Energy Intensity` is [average or marginal](https://www.electricitymaps.com/blog/marginal-emissions-what-they-are-and-when-to-use-them).
