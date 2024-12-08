---
title: A carbon aware internet
published: 2022/08/04
---

Recently I’ve been doing a bit of writing for The Green Web Foundation. Most of that has involved building [better, more beginner-friendly documentation](https://www.notion.so/A-carbon-aware-Internet-d6c350d466804249aedf98571e76a67f) for some of the foundation’s open-source code libraries.

One of those libraries, the Grid Intensity CLI, aims to provide developers with global grid intensity data from a range of providers. In doing so, it can enable developers to surface, monitor, and understand the carbon intensity of the code they write. This, in turn, allows them to make decisions on when/where to run their code so that it uses as much green energy as possible.

## The Grid Intensity CLI

The [Grid Intensity CLI](https://github.com/thegreenwebfoundation/grid-intensity-go) is a library written in Go. At it’s very basic, the CLI can be used to return the carbon intensity data of electricity grids around the world. It does this by leveraging APIs of several providers including [Ember](https://ember-climate.org/), [Electricity Maps](https://electricitymaps.com/), and [WattTime](https://www.watttime.org/).

At a more practical level, the CLI comes with a data exporter. This can be used to spin up a server that exposes data to graphing, scraping, and monitoring tools. Setting this up on the servers or clusters that are being used for a site or app can allow operations teams to gain insights into the carbon intensity of the code they run. This makes it possible for them to then influence the carbon intensity of that code by moving it through time and space.

### **Moving through time**

Sometime code *needs* to be run in a particular region. In these instances, developers can use grid information to identify periods of low carbon intensity. These are times when more green or renewable electricity is in the fuel mix. Scheduled jobs or heavy computational tasks can then be run during periods of low grid intensity, making them less carbon intensive.

### **Moving through space**

Increasingly, code is deployed to multiple regions around the world. In this scenario, developers can use the Grid Intensity CLI to easily consolidate carbon intensity data for different regions into a single dashboard or dataset.

With this information at hand, they can look for ways to run code in locations with a greener fuel mix. This can be extended to smarter, carbon-aware routing so that more requests are directed to code running in regions with a lower carbon intensity.

## Using the Grid Intensity CLI

### Installing

You can install the Grid Intensity CLI locally to try it out. If you’re familiar with using the terminal, then running the curl command below is all you need to get going.

<!-- markdownlint-disable -->
{% codeToHtml "bash" %}
curl -fsSL <https://raw.githubusercontent.com/thegreenwebfoundation/grid-intensity-go/install-script/install.sh> | sudo sh
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### Getting data

Once you’ve installed the CLI, you can run `grid-intensity --region=TW` to get the last calendar year’s grid intensity data for Taiwan.

By default, the Grid Intensity CLI uses data from [Ember Climate](https://ember-climate.org/). You can change the value passed to the `--region` flag to return data for different parts of the world. With Ember, you’ll need to use an [Alpha-2 or Alpha-3 ISO country code](https://www.iso.org/obp/ui/#search).

### Changing provider

Ember provides historical data. However, if we want to get more recent data for a particular region then we can use one of the other provider integrations.

Let’s say we have a server in the UK, and want to know the latest grid intensity we can use take the [UK Carbon Intensity API](https://carbonintensity.org.uk/) for a spin. Running `grid-intensity --provider=carbonintensity.org.uk --region=UK` in the terminal will bring back the latest intensity data (which is updated every half hour).

The docs have more details on the [other providers available](https://developers.thegreenwebfoundation.org/grid-intensity-cli/explainer/providers/) with the CLI.

### Exporting data

Running these commands in the terminal is all well and good, but in the real world you probably want to expose this data to some monitoring or decision-making systems. The Grid Intensity CLI has an `exporter` command for doing just this.

Running the `grid-intensity exporter --provider=carbonintensity.org.uk --region=UK` command will start a [Prometheus](https://prometheus.io/) server on localhost port 8000. Once the server has started, you can go to `localhost:8000/metrics` where you’ll be presented with a page full of data and stats. Doing a search for `grid_intensity_carbon_average` will bring up the grid intensity information for the UK. Since the UK Carbon Intensity API is updated every 30 minutes, you can leave the server running & refresh it later to see updated results.

To set this up in production, you can use Docker to [deploy the exporter](https://github.com/thegreenwebfoundation/grid-intensity-go#docker-image) to a [Kubernetes](https://github.com/thegreenwebfoundation/grid-intensity-go#kubernetes) or [Nomad](https://github.com/thegreenwebfoundation/grid-intensity-go#nomad) cluster. Prometheus can also be used as a data source for [Grafana visualisations](https://prometheus.io/docs/visualization/grafana/). None of these are things I’m overly familiar with, so I can’t go into more detail.

## Learning more

Documentation for the Grid Intensity CLI can be found on [Developer Docs @ The Green Web Foundations](https://developers.thegreenwebfoundation.org/grid-intensity-cli). You can also check out the [repository on GitHub](https://github.com/thegreenwebfoundation/grid-intensity-go).

It’s relatively early days, and what I’ve covered above is really just a taste of what’s possible with the Grid Intensity CLI. As more provider integrations are added, and the tool matures, it’ll be interesting to see what real world use cases it serves.
