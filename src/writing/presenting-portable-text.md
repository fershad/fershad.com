---
title: Presenting Portable Text
published: 2019/09/10
permalink:  /writing/presenting-portable-text/
summary: >-
  In this code note I cover a couple of ways to build upon Portable Text for
  presentation.
---

Over the last few weeks, I've learnt a lot while spinning up this blog using [Sanity.io](http://sanity.io/). It's still a growing baby, so I'm sure there'll be a lot more things to learn in the future as well.

While getting started, I used the [Knut Melvær's Eleventy](https://github.com/kmelve/eleventy-sanity-blog-boilerplate) boilerplate. It's a good starting point, covering everything needed to start up Sanity Studio, getting data using Sanity's API, and presenting it. That said, it is just a basic starter, so there's plenty you can build on top of it. One of the biggest challenges I faced while building upon the boilerplate was understanding and presenting Portable Text.

Portable Text allows for the serialisation of rich text into almost any markup language. It is what allows Sanity Studio to provide a rich text editor experience.

Out of the box, it works okay. If you'd like to make changes to the way elements are styled - say you want to add a class to links, and another class to images - then you can use marks or make changes to the type.

## **Marks**

**When to use:** When making modifications to _text_ elements (e.g., spans, links, strong text, etc.)  
**Example:** To give all links a particular class, you can pass something like the below into the serialiser.

<!-- markdownlint-disable -->
{% codeToHtml "javascript" %}
marks: {
  link: props => (
    h('a', {className: "your-class", href: props.mark.href}, props.children)
  )
}
{% endcodeToHtml %}
<!-- markdownlint-enable -->

What this does is find all marks that are of type "link", and return HTML accordingly.

## **Types:**

**When to use:** When you want to modify block types.  
**Example:** To show all images with a particular class, and without using the figure element.

<!-- markdownlint-disable -->
{% codeToHtml "javascript" %}
types: {
  image: props => (
    h('img', {className: "lazy img-responsive", src: urlFor(props.node.asset._ref).url()})
  )
}
{% endcodeToHtml %}
<!-- markdownlint-enable -->

_Note: This also requires you to include [Sanity's Image URL builder](https://www.npmjs.com/package/@sanity/image-url) in your JavaScript file._

I'm sure there's a lot more customization that can be done using custom block types, but that's not something I've explored at this stage.
