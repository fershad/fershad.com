---
title: Generate CSV Files from Data with 11ty
published: 2020/09/16
permalink:  /writing/generate-csv-files-with-11ty/
summary: >-
  Eleventy is one heck of a powerful, incredibly flexible static site generator.
  This short guide will show you how you can generate CSV data files using
  Eleventy.
---
11ty ([Eleventy](http://11ty.dev/)) is one heck of a powerful, incredibly flexible static site generator. One of the great things about using it is that after you run the initial NPM install step, Eleventy pretty much gets out of the way and lets you get about building your website using tools, languages, and processes that work for you. More, and more I find it being the first solution that springs to mind when a new website needs to be spun up.

In a recent project I found myself having to do something a bit more than building a website. I needed to take a large amount of data and output it in a format that a client could easily filter and manipulate. Without hesitation my mind turned to Eleventy for the project.

_Huh? But isn't Eleventy just for making websites?_

Well, yes and no. While it's main use is for building out websites Eleventy can let you do so much more. Most people will first pick up Eleventy for building a personal website or blog. However, the more you use it, the more you being to understand that Eleventy is capable of so much more.

This is in-part thanks to its powerful data cascade that lets your feed data to your page templates. Eleventy can consume data from local JSON or Javascript files, as well as from external APIs. What Eleventy also allows you define your template's output path and format. This is incredibly powerful, allowing us to write templates in HTML, Liquid, Nunjucks etc., and use these templates to generate other file formats, like CSV in this case.

{% callout "TL;DR" %}
You can download the [final code for this project](https://github.com/fishintaiwan/11ty-csv-demo) on Github.
{% endcallout %}

## Let's Code

Let's go through a short little tutorial that will show you how you can generate CSV data files using Eleventy.

Create new folder for your project and install Eleventy locally within that folder using NPM.

{% codeToHtml "bash", "terminal"%}
npm init -y
npm install --save-dev @11ty/eleventy
{% endcodeToHtml %}

Let's now create a place for our data. Within your project folder create a `_data` folder. In there, let's create our data file. In this project I'll use some [dummy books data](https://gist.github.com/nanotaboada/6396437), so I'll create a file called `books.json`.

<!-- markdownlint-disable -->
{% codeToHtml "json", "_data/books.json"%}
{
    "books": [
        {
            "isbn": "9781593275846",
            "title": "Eloquent JavaScript, Second Edition",
            "subtitle": "A Modern Introduction to Programming",
            "author": "Marijn Haverbeke",
            "published": "2014-12-14T00:00:00.000Z",
            "publisher": "No Starch Press",
            "pages": 472,
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website": "http://eloquentjavascript.net/"
        },
    ...
    ]
}
{% endcodeToHtml %}
<!-- markdownlint-enable -->

With our data in place we can now create our template. I'll be using Liquid for this template, but you can use Nunjucks, or even HTML if you feel comfortable. In the root director of our project we'll create `books.liquid` which will be our template. Let's start with the most important part of the template - the permalink. Let's add the below frontmatter to our template.

<!-- markdownlint-disable MD003 MD022 -->
{% codeToHtml "yaml", "books.liquid"%}
---
permalink: 'books.csv'
---
{% endcodeToHtml %}
<!-- markdownlint-enable MD003 MD022-->

{% callout "💡 Important" %}
With our data in place we can now create our template. I'll be using Liquid for this template, but you can use Nunjucks, or even HTML if you feel comfortable. In the root director of our project we'll create `books.liquid` which will be our template. Let's start with the most important part of the template - the permalink. Let's add the below frontmatter to our template.
{% endcallout %}

Finally, let's get some data into the template. We'll output the ISBN, title, author, and website of the books in our CSV files. To achieve this, add the code below to your template (after the frontmatter).

<!-- markdownlint-disable -->
{% codeToHtml "liquid", "books.liquid" %}
    ...
    ISBN,Title,Author,Website
    {%- for book in books -%}
        {{ "" }}
        {{ book.isbn }},"{{ book.title }}","{{ book.author }}",{{ book.website }}
    {%- endfor -%}
{% endcodeToHtml %}
<!-- markdownlint-enable -->

There are a few important things to note about the code above:

1. Since a newline will create a new row in our CSV file we've used [Liquid's whitespace control tag syntax](https://shopify.github.io/liquid/basics/whitespace/) to prevent this from happening twice with each loop (this would result in us having empty lines between each row of data).
2. We've added a line of blank content `{{ "" }}` to each loop so that we split the content onto a new row.
3. Some items have been wrapped in quotations (`""`) which helps to escape any commas (`,`) that might be in our data.

{% callout "💡 Important" %}
We also don't put any spaces between the data we're generating. This is important for ensuring we can escape commas in our content.
{% endcallout %}

To generate the CSV file simply run the `npx eleventy` command. You'll find the `books.csv` file has now been created in the `_site` folder of your project.

You can download the [final code for this project](https://github.com/fishintaiwan/11ty-csv-demo) on Github.
