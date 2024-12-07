---
title: Adding a Directory and API to ‘Are my third parties green?’
published: 2022/04/14
---

Since it launched a few months ago, ‘[Are my third parties green?](http://aremythirdpartiesgreen.com/)’ has grown beyond the original idea of a small tool to scan a single web page.

In recent times I’ve added a [Directory section to the site](https://aremythirdpartiesgreen.com/directory), allowing people to find sustainable third-party providers across a range of categories. While building out the Directory, I realised it would be helpful to have some way for people to search third-party providers as well. This subsequently led me to develop an API to surface different bits of information.

## Creating the Directory

The original aim of ‘Are my third parties green?’ was to provide a way for people to find out if the third-party services being used on their websites are being served from green web hosts. After launching it, though, I realised that it would probably be even more helpful if there was a way for people to select greener third-party services straight off the bat.

### A lot of data to display

I use the [Third Party Web dataset](https://github.com/patrickhulce/third-party-web/) to categorise third-party requests. This dataset already contained all the information I would need for the Directory page. To work out the green status of a third-party service, I would query the [**Green Web Foundation's**](https://www.thegreenwebfoundation.org/) (GFW) API. My original plan was to group third-party services by category, and show these groupings on the page in a single view.

So, I set about writing a script to massage the data from Third Party Web and GFW into the structure I’d needed. By scripting this step, I could rerun the process whenever new data was available.

My initial approach quickly came up against a couple of problems. First up, the JSON file that was being generated to categorise third-party services ended up at over 750kb. That’s a very large file to download and parse when loading the page.

The other issue that arose was the sheer size of the page itself. Showing all categorise in a single view resulted in a very, very, very long page. This also resulted in the HTML document being very large, which meant the browser really had to work hard to render the page. I tried adding filters for each category to work around this, but they didn’t help.

I had to rethink how data would be presented.

### Loading only what’s needed

Having the filters in place gave me an idea of how to reduce the size of both the page, and the data behind it. Rather than loading all the data at once, I created individual data files for each category. Using the filter as a trigger, the site downloads the required data for a given category only when the user selects that category.

This meant that the initial render of the page would be very small, and the user wouldn’t have to download any data they weren’t interested in.

## The need arises for an API

Despite the Directory having filters, there was still a lot of content being presented for some categories. I wanted to give people an easier way to quickly find details about a particular third-party service they were interested in. I needed something like a search functionality.

In order to provide this for the Directory, I needed a means of filtering through over 2000 third-party entities based on a user’s input. Ideally, this processing would be performed off of the user’s device.

As I thought through some of the ways I could tackle this, I began to realise that building my own API and dogfooding that would be a good approach. Not only would an API be useful for this use case, but it could come in handy for other projects later down the line.

### Building the API with Cloudflare Workers

I’ve never built an API before. I have some basic idea of how they work, being that you have some endpoint that returns data based on the kind of request it receives. So, to start with I needed a router and I assumed the rest would be just building out some functions to parse and return results.

Using Cloudflare for my DNS allowed me to use Cloudflare Workers to serve my API endpoints. Rather than building a Worker for each individual endpoint, the Cloudflare team have created a [starter Worker’s router repository](https://github.com/cloudflare/worker-template-router). Using this I could keep all my code in one place while still being able to handle requests to different endpoints.

### Endpoints for now, and later on

With the Worker’s router setup, it made it easier for me to build out multiple endpoints that I could use. Starting out I needed an endpoint that allowed me to search for third-party services whose name matched the entered search string. But now I started to wonder if there were some other endpoints that I could build, which might come in handy for other things later on. In the end, I decided to create three endpoints:

- One for searching by third-party service name
- One to search by company
- And, one to search by the URL of a third-party request

For the Directory page, I would only need the first one. But I can already picture uses for the other two in future projects. To provide data for the three routes above, I also created two new JSON data files. Both files stripped out any data that was surplus to requirements.

### A free, public API is born

Because the API was fetching data from static files, and thanks to Cloudflare’s generous free tier, I decided to make the API free for public use. I hope this allows others to use the information as part of other cool projects they might be working on.

You can find [docs for the API](https://aremythirdpartiesgreen.com/api-docs) on the ‘Are my third parties green?’ website. If you do end up using the API as part of a project, I’d love to know!

## Search for the Directory

Once the API was built, I could start dogfooding it to build search functionality for the Directory. With over 2000 services available to search, I wanted to ensure that people could find what they were looking for without stumbling across “no data found” kind of situations.

With that in mind, I used the [Simple Svelte Autocomplete](https://github.com/pstanoev/simple-svelte-autocomplete) component to check the API for a user’s query and return any matching service names. This allows you to type ‘Google’, for example, and see all the known Google services you can select.

## An end in sight?

I originally thought ‘Are my third parties green?’ would be something I’d put out there into the world, and maybe touch once or twice a year with small data updates. So far, that’s been far from the case. But with the Directory and API now in place there’s only one last thing I want to add to the site - the ability to set cookies when a page is scanned. Once that’s done, I think that ‘Are my third parties green?’ will be set, and I can shift my focus to another side projects.
