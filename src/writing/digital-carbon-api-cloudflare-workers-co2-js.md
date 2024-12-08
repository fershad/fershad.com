---
title: Building a digital carbon API with Cloudflare Workers and CO2.js
published: 2022/08/19
---

CO2.js is a library that allows developers to estimate the emissions related to use of their apps, websites, and software. At its core, CO2.js takes an input of data, in bytes, and returns an estimate of the carbon emissions produced to move that data over the internet.

You may look to use CO2.js directly inside of an app, website or digital service to calculate carbon emissions from user activities. Alternately, you could use it to generate, or feed data into, company reports. You could even hook it up to data from your home network to calculate your own digital carbon footprint.

Today, however, we’ll take CO2.js to the edge and use it inside of a Cloudflare Worker. We’ll use the Cloudflare Worker to build a simple API that will allow us to return a CO2 emissions result for a given number of bytes. This could come in handy if you are working on multiple apps that require digital carbon emission estimates. Rather than having to install and maintain multiple instances of CO2.js, you could point your apps to the API endpoint and fetch data from a single source.

## Getting started

If you’d like to skip to the end then you can find the [source code for this tutorial](https://github.com/fershad/co2js-cloudflare-worker-api) on GitHub.

### Installing Wrangler

To start working with Cloudflare Workers we should have [Wrangler](https://developers.cloudflare.com/workers/wrangler/get-started/) installed locally on our development machine. Wrangler is a command-line tool that helps with setting up, test, and configuring Cloudflare Workers projects. Follow the steps in the [Cloudflare docs](https://developers.cloudflare.com/workers/wrangler/get-started/) to install Wrangler and login to your Cloudflare account.

### Spin up a project

With Wrangler installed, we can get started on our project. We’re going to use Cloudflare’s [worker-template-router](https://github.com/cloudflare/worker-template-router) to give us a jump start. This starter project comes setup with [itty-router](https://github.com/kwhitley/itty-router), allowing us to route the incoming requests to our Cloudflare Worker. To get started, create a new project by running the commands below.

{% codeToHtml bash, "terminal" %}
git clone <https://github.com/cloudflare/worker-template-router> co2js-api
cd co2js-api
npm install
{% endcodeToHtml %}

With this done, you can open the project folder in your code editor. We’ve still got one more project setup step to complete before we can start writing code. Find the `wrangler.toml` file in the root of the project, and open it. Replace the entire contents of the file with the bare bones snippet below.

{% codeToHtml toml, "wrangler.toml"%}
name = "co2js-api"
workers_dev = true
main= "./index.js"
{% endcodeToHtml %}

This is a really simple configuration, and in practice you’d set this up more thoroughly so as to deploy the Worker to the right account and routes.

## Setting up the router

With our project now configured, we can start writing some code! Well, deleting some code to begin with.

Head over to the `index.js` file that’s in the root of the project. Here you’ll find some sample router code already written for us. Take some time to have a read of it if you’d like to better understand it.

When you’re ready to proceed, delete the entire content of this file, and replace it with the code below:

{% codeToHtml js, "index.js"%}
import { Router } from 'itty-router'

// Create a new router
const router = Router()

router.get("/", () => {
return new Response("Hello, world! This is the root page of your Worker template.")
})

router.all("\*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
e.respondWith(router.handle(e.request))
})
{% endcodeToHtml %}

You can now run `wrangler dev` in your terminal, and select the Cloudflare account you want this Worker to be deployed to. Wrangler will then proceed to spin up a local version of the Worker on `localhost:8787` which we can use for testing. If you navigate to `localhost:8787` in your browser then you should see the message “_Hello, world! This is the root page of your Worker template.”_ displayed.

## Create a custom route

Since we want to be able to send this API a number of bytes and have it return us a carbon emissions estimate, we’ll need to create our own route. We’ll be using path parameters for this.

Let’s add a new route to the `index.js` file, just before the `router.all` statement. We’ll leave it empty for now.

{% codeToHtml js, "index.js"%}
router.get("/bytes/:value", ({ params }) => {})
{% endcodeToHtml %}

We now have a `/bytes/` endpoint which expects to receive a value passed to it. When hitting this endpoint in real life, we’ll replace the path parameter (`:value`) with a number of bytes we’d like to get a result for.

## Installing CO2.js

To install CO2.js from NPM, run the `npm install @tgwf/co2` command. This will add CO2.js to the project dependencies.

### Using CO2.js in the router

To use CO2.js with our router, we’ll need to import it into the `index.js` file. Add the below import statement to the top of the file.

{% codeToHtml js, "index.js"%}
import { co2 } from '@tgwf/co2'
{% endcodeToHtml %}

Now we can use CO2.js in the new route we created.

{% codeToHtml js, "index.js"%}
router.get("/bytes/:value", ({params}) => {
const { value } = params

const emissions = new co2();
const result = emissions.perByte(value);

return new Response(JSON.stringify({result}), {
headers: {
"Content-Type": "application/json"
}
});
})
{% endcodeToHtml %}

Let’s step through what this block of code does:

- Firstly, we can get the value parameter from the request `params` object.
- Next, we initiate a new instance of CO2.js. At the time of writing, this uses the [default OneByte model](https://developers.thegreenwebfoundation.org/co2js/explainer/methodologies-for-calculating-website-carbon/) for carbon emissions estimates.
- Once initiated, we can use the `perByte` function to return the emissions (in grams) for the value we pass into it.
- Finally, we wrap this up in a JSON object, stringify it, and send it back to the user.

Now, we’re able to test our route by running the `wrangler dev` command. Once you’re Worker is running locally, you can go to `localhost:8787/bytes/1000000)` to test it out. You should see a value of `0.29081299999999993` returned.

## Next steps

We’ve just created a very simple API for calculating digital carbon emissions using CO2.js and Cloudflare Workers. If you’d like to keep building on this, here are a few ideas you can try:

- Add some checks to ensure the value parameter is a number.
- Try creating more routes for different file sizes (kilobytes, megabytes etc.). Remember, though, that CO2.js performs calculations based on bytes. So you’ll need to do some conversions first.
- Take a look at the [CO2.js docs](https://developers.thegreenwebfoundation.org/co2js/models/), and try using the Sustainable Web Design model instead.

You can find the [source code for this tutorial](https://github.com/fershad/co2js-cloudflare-worker-api) on GitHub.
