---
title: >-
  Curious about driving the transition to a fossil-free internet? Here’s how
  CO2.js can help.
published: 2023/03/09
permalink:  >-
  /writing/curious-about-driving-the-transition-to-a-fossil-free-internet-heres-how-co2-js-can-help/
summary: >-
  CO2.js is one of the tools we’ve created to help developers drive the
  transition to a fossil-free internet. This article will explain the concepts
  behind CO2.js, it’s uses, and when other tools might be better options to
  consider.
---

_This post was originally published on The Green Web Foundation's blog. You can [read the original post here](https://www.thegreenwebfoundation.org/news/curious-about-driving-the-transition-to-a-fossil-free-internet-heres-how-co2-js-can-help/)._

Our mission at The Green Web Foundation is for a fossil-free internet by the year 2030. We know that getting there will take a collective effort on the part of technologists around the globe. That’s why we’re always looking for ways to leverage open source and open data. Our aim is to equip those in tech jobs with compelling, state of the art, practical and well documented tools and “patterns” for change. Tools and patterns that can be used _right now_ in workflows and products.

CO2.js is just one of the tools we’ve created to help with this. This article explains the concepts behind CO2.js, it’s uses, and when other tools might be better options to consider.

## What is CO2.js?

CO2.js is an open-source JavaScript library that enables developers to:

- estimate the carbon emissions produced by transferring bytes of data on the internet;
- get different forms of grid intensity data, such as annual average and marginal data by country;
- make automated queries against Green Web Foundation’s Green Domain’s dataset.

At its core, CO2.js takes an input of measured activity, for example bytes sent over the internet, and returns an estimate of the carbon emissions produced doing so. It can be run in Node.js server environments, in the browser, as well as on some serverless and edge compute runtimes.

In addition to this, CO2.js champions the open data ethos which is a core part of our work at The Green Software Foundation. Since [v0.11](https://www.thegreenwebfoundation.org/news/release-guide-co2-js-v0-11/) developers using the library have access to annual grid intensity data from [Ember](https://ember-climate.org/) (open data non-profit) and the [UNFCCC](https://unfccc.int/) (United Nations Framework Convention on Climate Change). CO2.js also provides a wrapper through which developers could make automated queries against The Green Web Foundation’s [Green Web dataset](https://datasets.thegreenwebfoundation.org/).

### Carbon estimates

CO2.js brings together peer reviewed carbon estimation models, and packages them up into a versatile, open-source JavaScript library. Doing this allows developers, who may not have the domain knowledge required to calculate carbon estimates themselves, to build reliable and robust carbon measurements into their software, sites, or apps.

At present, CO2.js ships with two models for measuring digital carbon emissions - the Sustainable Web Design (SWD) model, and the OneByte model. The SWD model is the more recent of the two, and is the default model used when generating estimates using CO2.js. By making sensible defaults easily available, developers can quickly start measuring emissions right away, and see some results of changes you make.

The diagram below can help you visualise the trade-offs made when choosing versatile generalised models like SWD (on the left side of the illustration), as opposed to using more granular data and calculations (on the right) which we’ll talk about later in this post.

![ ](../../public/img/blog/d7200a17ee2cec76f6fbd640ef5bba533cd13d52-2211x1465.jpeg)

**Further reading: [Methodologies for calculating website carbon](https://developers.thegreenwebfoundation.org/co2js/explainer/methodologies-for-calculating-website-carbon/)**​

### Free grid intensity data

As of the CO2.js version 0.11 release in September, 2022 CO2.js, the library includes free average grid intensity data from [**Ember**](https://ember-climate.org/data/data-explorer/), as well as marginal intensity data from the [**UNFCCC**](https://unfccc.int/) (United Nations Framework Convention on Climate Change). We believe that making this data open, and accessible to all developers can empower them to build carbon awareness and more specific carbon estimates into the tools they build.

Carbon intensity is a way of measuring how clean electricity is. Or, more precisely, how much CO2 is emitted with each unit of energy produced. The electricity that powers a grid comes from a variety of sources such as renewables, fossil fuel based or nuclear. We call this the fuel mix. And it's this fuel mix that influences the carbon intensity of a country’s electricity grid. Annual average emissions intensity reflects the fuel mix of the entire electricity grid over a year. You’ll see average intensity used in the majority of carbon reporting standards and tooling.

**Further reading: Average and marginal intensity explained**​

### Green web hosting check

CO2.js also comes with handy functions that allow developers to run automate checks of a website domain against the Green Web dataset.

The Green Web dataset is a list all the domains running on renewably powered infrastructure in our system, along with which organisation is hosting them, and the date of the last check. The dataset is actively maintained by The Green Web Foundation, and has been used in projects such as the [HTTP Archive’s 2022 Web Almanac](https://almanac.httparchive.org/en/2022/sustainability#how-many-of-the-sites-listed-in-the-http-archive-run-on-green-hosting).

## Why would you use CO2.js?

The carbon emissions of the internet are something abstract and out of sight for most.

Changing that starts with being able to measure the carbon emissions associated with digital activities in a quick and reliable way. This is where CO2.js comes in.

The next part - surfacing, visualising and presenting these figures in innovative ways - is where, the curious developers, product teams and creators come in. We urgently need ways that make it easy for everyone to comprehend and act on the data.

Here’s a few awesome approaches already using CO2.js to do just this.

### Carbon budgets

Having a **_carbon budget_** - a limit for carbon emissions that a website, app or specific page should not exceed - is a great way to ensure digital services are as low-carbon as possible.

Since most **website analytics service** run on the user’s browser, they have access to information about how much data is transferred with each page load, and can turn this into meaningful carbon estimates for website owners. Website analytics services [Cabin Analytics](https://withcabin.com/) and [Statsy](https://statsy.com/) both use CO2.js to present carbon emissions estimates for web pages based on user traffic.

[Sitespeed.io](http://Sitespeed.io), a **website performance monitoring tool**, has been using CO2.js in its sustainability plugin since the very early days of the project. We spoke with creator Peter Hedenskog about it in more detail for a case study - **[Sitespeed.io – Using and contributing to CO2.js](https://www.thegreenwebfoundation.org/news/sitespeed-io-using-and-contributing-to-co2-js/)**.

Since version 104, the Firefox **browser** includes [device power usage data in their developer tools profiler results](https://www.mozilla.org/en-US/firefox/104.0/releasenotes/). This is very useful in gaining insights into how much power a site or app is utilising both when it is in standby and also actively being used. With this granular level of data available, we authored the code required to take the power data that was already available, and generate carbon estimates from that suing CO2.js. With their help, we were able to get a [pull request](https://github.com/firefox-devtools/profiler/pull/4372) merged in early December 2022.

The change we’ve made in the Firefox Profiler currently uses global annual average emissions figures to calculate a carbon estimate. However, it would certainly be possible to take this a step further and use a grid intensity value for the country/region in which the profile was captured. We’re hoping to continue collaborating with the Firefox team to make this change in 2023.

### Carbon estimations and dashboards

CO2.js also lends itself nicely for use in carbon estimation tools and dashboards.

[Ecograder](https://ecograder.com/) is a web page testing tool built by MightBytes which uses CO2.js to calculate the carbon emissions, and check for green hosting, of a web page that is tested. They couple this information with data from other sources to present an overall score for the page.

Ecograder is an example of a public facing tool, but a similar idea could be used to create carbon calculator tools for internal company use. This can be a way for organisations, or teams, to evaluate and understand the carbon impact of their digital use. Office managers and sustainability teams could work with developers to use CO2.js to track the carbon intensity of data usage within an office environment. Plugging network data usage into CO2.js can allow for monitoring and reporting on the digital usage footprint of an organisation or business.

[Version 0.12 of CO2.js](https://www.thegreenwebfoundation.org/news/release-guide-co2-js-v0-12/) introduced the ability to customise grid intensity and other constants that are used in the Sustainable Web Design model calculations. This paves the way for more detailed, case specific carbon emissions estimates. It means that a company located in Argentina can use that country’s grid intensity values when calculating digital carbon emissions, rather than relying on a global average figure.

### Automated testing and workflows

Developers and consultants may look to use CO2.js to create automated tasks that check multiple domains for green web hosting. Carbon budgets described above could also be coupled with CI/CD tools like Github Actions to check the carbon intensity of deploys, and block deployments that exceed the carbon budget that is set.

[Step CI](https://stepci.com/) is an open-source framework for testing APIs. It uses CO2.js to give developers data on the carbon emissions of API calls, as well as enabling them to set a **_carbon budget_** which their API should stay within.

### Creating carbon aware user experiences

The idea of a carbon aware website or app is one where content/user experience changes depending on how the grid intensity of the electricity grid. When the grid is powered by more renewable energy, more complex interfaces and content might be shown. When the grid is powered by more fossil-fuels, a simpler, less processor intensive experience is presented.

The grid intensity data present in CO2.js makes it possible for developers to start building carbon aware experiences. As a starter, the annual country level emissions could be used to trigger carbon aware UI or functionality based on a user’s location. This can be taken a step further by using a real-time grid intensity API service to get the current grid intensity of a user’s location. This can then be compared to the average annual emissions available in CO2.js to determine if a user should see a low-carbon or regular experience. It’s something that [I’ve experimented with](https://fershad.com/writing/making-this-website-carbon-aware/) on my personal website.

App developers can also use CO2.js in user-facing applications to give visibility to the carbon impact of user activity in the application. Users uploading files, or downloading content, could be notified of the impacts of those tasks. Large, carbon-intensive, data transfers could also be blocked or limited. Users could also have the option to set a carbon budget for their browsing or use of an app, website, or online service.

## When not to use CO2.js

The above examples of how CO2.js is being used to calculate carbon estimates are pretty cool (at least we think so!).

That said, CO2.js isn’t a catch all solution for digital carbon estimation.

The calculations in the Sustainable Web Design and OneByte models are estimation models, which have their own definition for [system boundaries](https://www.wholegraindigital.com/blog/website-energy-consumption/), as well as their own assumptions about energy usage, and grid intensity. While they are based on the best available research at the time, it must be remembered that they are still **estimation** models.

![ ](../../public/img/blog/b52fd54fa4c751699523d542c99bca497ca4e5bf-960x540.png "The breakdown of system segments used for calculations in the Sustainable Web Design model.")

Ensuring you’re using the right tool for what you’re trying to measure can be tricky, so we’ve listed a few scenarios in which other tools are more appropriate than CO2.js.

### Measuring cloud or serverless carbon emission

With more and more compute shifting to **_the cloud_**, it is becoming increasingly important for operations teams to be aware of the carbon emissions for their cloud-based workloads. [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/) is an open-source tool that provides visibility and tooling to measure, monitor and reduce your cloud carbon emissions. It works with major cloud providers (AWS, Google Cloud, and Microsoft Azure), and provides energy and carbon estimates that include embodied emissions from device manufacturing.

When comparing it to CO2.js, Cloud Carbon Footprint is a better tool for measuring the emissions of cloud-base workloads as it uses actual CPU utilisation for calculations whenever that data is available to it. This is far more accurate than the generalised figures used for data center emissions found in both the Sustainable Web Design and OneByte models.

### Generating extremely precise carbon emissions figures

If you need to generate precise carbon emissions figures specific to your individual use case (for example, running multiple serverless functions that run in different regions), then you’re going to need to set up your own monitoring, measurement, and calculation system. Some open-source tools and methodologies that can help with this include:

- [Scaphandre](https://github.com/hubblo-org/scaphandre) - a metrology agent dedicated to electrical power consumption metrics.
- [Greenframe CLI](https://github.com/marmelab/greenframe-cli) - a command line tool to estimate the carbon footprint of a user scenario on a web application.
- [The DIMPACT methodology](https://dimpact.org/methodology) - a detailed methodology to estimate the carbon impacts of serving digital media and entertainment products.

### Using more detailed grid intensity data

Both the average and marginal grid intensity data in CO2.js are annual figures. These are a great start, and can be used as an indicator for how clean or dirty a country’s energy grid is. However, if you are looking to build an app, site, or service that responds to real-time grid intensity in some part of the world, then you’ll need to use a dedicated service to get that data.

[Electricity Maps](https://www.electricitymaps.com/) and [WattTime](https://www.watttime.org/) are two providers who can give you close-to-real-time regional-level grid intensity data.

Additionally, the [Green Software Foundation’s Carbon Aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk) provides a WebAPI and a CLI tool that can be used to fetch current grid intensity data. The Carbon Aware SDK can also be used to fetch current and forecast grid intensity data Electricity Maps and WattTime through a single set of API endpoints. With this you can build out carbon aware apps that respond to how green the grid is at any given time.

## Using and contributing to CO2.js

Developers who want to start using CO2.js can check out our quickstart guide - **[Start calculating digital carbon emissions in 5 minutes with CO2.js](https://www.thegreenwebfoundation.org/news/start-calculating-digital-carbon-emissions-in-5-minutes-with-co2-js/)**.

Our [**CO2.js developer documentation website**](https://developers.thegreenwebfoundation.org/co2js/installation/) goes into more detail on the different models, methods, and data available in the library.

CO2.js is an open-source project, and we welcome community contributions. Code is [kept on GitHub](https://github.com/thegreenwebfoundation/co2.js), where you’ll be able to track future releases, as well as contribute to the future direction of the library through issues and pull requests.

If you’ve made something using CO2.js, we’d love to know! Show us your handy work on Twitter ([@greenwebfound](https://twitter.com/greenwebfound)), [LinkedIn](https://www.linkedin.com/company/the-green-web-foundation/), or by using [our website](https://www.thegreenwebfoundation.org/support-form/).

​
