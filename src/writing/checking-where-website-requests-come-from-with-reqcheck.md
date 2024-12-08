---
title: Checking where website requests come from with ReqCheck
published: 2022/12/11
permalink:  /writing/checking-where-website-requests-come-from-with-reqcheck/
summary: >-
  ReqCheck is a tool I’ve built to help folks find out where all the different
  requests made by a web page are served from. I’m hoping it can be a tool for
  both web sustainability and web performance folks to use when auditing
  websites.
---

[ReqCheck](https://reqcheck.fershad.com) is a tool I’ve built to help folks find out where all the different requests made by a web page are served from. The idea for it came while I was writing up a [website sustainability audit of the COP27 homepage](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/).

One of the things I got into as part of that audit was finding out where the COP27 homepage was being hosted. In that audit, I stopped at the homepage. However, trying to determine where the site was hosted got me wondering whether it would be possible to automatically check where **all** the requests on a given page were coming from. ReqCheck aims to do just that.

## Introducing ReqCheck?

[ReqCheck](https://reqcheck.fershad.com/) is a tool that takes the results of a [WebPageTest](https://webpagetest.org/) run, and surfaces information about where each request is served from. It does this by using data from a couple of APIs provided by [The Green Web Foundation](https://www.thegreenwebfoundation.org/). The results show the countries from which web page resources are served, as well as information about the carbon intensity of that location. Requests made from green web hosts are also highlighted.

### Why use WebPageTest results?

WebPageTest allows for tests to be run from a number of different locations around the world. Using WebPageTest results as the data source for ReqCheck opens up the possibility for folks to check how requests for a page are served depending on where a user might be visiting from. By doing this, the impact of different hosting providers and CDNs should become clearer. It should also help to make visible the carbon intensity differences in global energy grids, and how this can affect a page’s sustainability profile.

## Using ReqCheck

To use ReqCheck, you’ll first need to run a test on WebPageTest. You will also need to ensure that the test results are public (this is on by default, but can be turned off if you’re logged in with a WebPageTest account).

### Running a test

With your result URL in hand, you can then:

1. Head over to [https://reqcheck.fershad.com](https://reqcheck.fershad.com).
2. Enter a public WebPageTest result into the form, and click Submit.
3. The results are then scanned, and a set of unique IP addresses used for requests is compiled.
4. This is then passed into The Green Web Foundation's [**IP to Carbon Intensity API**](https://developers.thegreenwebfoundation.org/api/ip-to-co2/overview/) to check the location and grid intensity of each IP address.
5. The tool also uses The Green Web Foundation's [**Greencheck API**](https://developers.thegreenwebfoundation.org/api/greencheck/v3/check-single-domain/) to test if a request is served from a green host.

_It should be noted that ReqCheck uses the Median Run, First View results from a WebPageTest run. A future version might include Repeat View results to show the impact of caching, but don’t hold me to it!_

### Reading the results

Once ReqCheck has finished analysing the site, you’ll be taken to the results page (here’s a [demo page](https://reqcheck.fershad.com/results/221027_AiDcFE_7H6) that you can refer to). Here, you’ll be presented with:

- Some brief details of the WebPageTest run that was analysed
- A summary of the ReqCheck test analysis
- A breakdown of IP addresses by country

For the rest of the time, we’re going to focus on the IP address breakdown, because that’s where the detail lies.

### IP addresses by country

The countries listed on the results page are sorted from the one with the most unique IP addresses to the least. Sometimes, the IP to Carbon Intensity API isn’t able to work out where an IP address is located. If this happens, those results are shown at the bottom of the page.

Under each country’s name and flag, you’ll get a short summary of:

- How many requests came from there
- How many host IP addresses served those requests
- The carbon intensity of that country’s electricity grid
- The percentage of annual electricity generation from fossil fuels

This can start to give a sense of how carbon intensive resources hosted in that country might be.

Below this summary are details of each individual IP address from the country in question. Each block represents a unique IP address, and presents information about:

- The host that is served from that IP address
- Whether it uses a CDN (if so, which one)
- How many requests are served from that address
- And whether or not the host domain is a known green web host

The green hosting information comes from [Greencheck](https://developers.thegreenwebfoundation.org/api/greencheck/v3/check-single-domain/), another API from The Green Web Foundation. If a green host is found, the IP address block is turned green and a leaf icon is shown in the top right. This additional information about each IP address allows developers to be more informed about how a web page’s resources are hosted.

## Using these results

The main purpose of ReqCheck is to be informative. It aims to give extra insight into how a web page comes together. With this information, website owners can start to think about what they can do to reduce website carbon emissions on their domain and beyond.

By presenting information about the grid intensity, and fossil-fuel generation, developers can start thinking about possibly moving self-hosted resources to greener regions. Additional information about the CDN/hosting provider gives additional context to help with decision making. Perhaps requests are being served from a region that has a grid with high carbon intensity, but are hosted on a green web host. In this case, changing how these requests are served could be given a lower priority than ones which are not served from a green host.

Sometimes, you’re not in control of how the assets served on a web page are hosted. This is often the case with third-party requests. In those cases, the information from ReqCheck can help you start a conversation with your service provider about becoming a green web host. The Green Web Foundation have [some email templates](https://www.thegreenwebfoundation.org/sample-emails/) to help you get started.
