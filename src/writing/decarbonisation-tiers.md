---
title: A repeatable way for showing how hosting providers are making progress decarbonising the energy they use
# published: YYYY-MM-DD
# permalink: /writing//index.html
summary: 
---
*Possibly the longest blog post title evvvveeeer!*

One of the main things I do for work is manage the [Green Web Dataset](https://www.thegreenwebfoundation.org/tools/green-web-dataset/), a public dataset of website hosting and infrastructure providers who have shared information showing that they're using green energy to power their compute. It powers things like the [Green Web Check](https://www.thegreenwebfoundation.org/green-web-check/), and the [Green Hosting Directory](https://app.greenweb.org/directory/).

Since its inception, the dataset has captured information at the company level. But that doesn't really represent how hosting companies operate in practice. Many hosting companies operate on infrastructure in multiple regions, and subsequently make it possible for their users to choose which region/s they want to use. A multi-region provider may run on hourly matched green tariffs in one place and the national electricity grid in another. Capturing disclosures at the company level doesn't allow this nuance to be reflected in a useful way.

We're currently working on technical changes in our dataset which allow this reality to be captured. But capturing the information is one thing. A question my colleague [Chris](https://www.linkedin.com/in/mrchrisadams/) and I have been thinking about recently is how can this kind of information be useful in a way that:

1. Allows the progress a hosting provider is making towards decarbonising the energy they use to be shown.
2. Allows sensible, repeatable comparisons to be made across providers, and also across regions within a single provider.
3. Makes it clear where a provider is just using their local energy grid, and where they are actively taking steps to decarbonise their energy use through additional, matched tariffs and power purchases.

In short, we want a way of talking about decarbonising the energy used by hosting infrastructure which ***shows progress***, ***is repeatable***, and ***recognises action***.

The rest of this post will show one of the ideas we've thought about and run through an example of how it might be applied, using my recent Eurostack excursion as a testbed.

## The idea

Off the bat, this idea mostly comes from Chris' wonderful mind. The first time he presented it to me, I think my brain glitched. Since then, we've bounced some refinements around to hopefully make it clearer. 

A big part of me writing this blog post is so that I can make sure I'm fully understanding these ideas as well. It's also very much a way for me to try and do what I do best - take complex ideas and explain them in a way that most people can hopefully follow along with. It's handy to work in a team where folks have complementary super powers 🤗.

Okay, so here's the idea. 

Hosting providers, and the individual regions they operate, can be viewed as falling into a three tier system based on the steps they are taking to decarbonise the energy they are using.

- **Tier 0:** A supplier is not making any disclosures about using carbon-free energy. They are effectively using what the electricity grid gives them.
- **Tier 1:** A supplier makes **annually matched** disclosures about using carbon-free energy. They may be 100% annually matched, but generally, there are still hours in the year where the infrastructure ends up running on electricity from fossil fuels, without matching clean generation. We *cannot* achieve 100% carbon-free energy use in this way.
- **Tier 2:** A supplier makes **hourly matched** disclosures about using carbon-free energy, usually using a combination of different clean energy technologies, to avoid relying on fossil generation. We _can_ reach 100% carbon-free energy use in this way.

Using these tiers, you can can compare across providers, or even across regions within a single provider, to quickly assess who is actively engaged in decarbonising their energy use and who is waiting for the grid to catch up. 

### Overall scoring

Another thing that a tiered system like this can offer, is the ability to generate scores for a provider, a region, or an organisation. Coupling the tiers with grid data and other open data sources (as we'll do later in this article), we can begin to develop a "scoring system" which can be used to represent a hosting provider, or can even be used to assess the tech stack used by any organisation. To do this, we will assign each tier a scoring factor:

- Tier 0: 0
- Tier 1: 1
- Tier 2: 1

I'll show how we can use these with grid data later in this post, but first ...

### Some notes about this approach

- Keep in mind that the aim of this tier system is to deliver a simpler, repeatable, comparable means of assessing the progress hosting providers are making to decarbonise the energy they use. 
- This is not a perfect abstraction. It aims to differentiate between the three main kinds of ways *we* have seen hosting providers go about decarbonising their energy use.
- Finding out information about a provider's energy disclosure can take a good amount of desk research, especially when information is not shared publicly. As a default, providers/regions who do not make public disclosures about their energy procurement should fall into **Tier 0** until such time as they can share information either publicly or privately.
- There will no doubt be scenarios thrown up where annually matched energy purchases (**Tier 1**) by a company actually do achieve 100% 24/7 carbon-free energy. These tiers introduce a general rule about how to view annually matched claims, rather than getting stuck in the weeds of edge cases.
- Finally, we are human and have biases. One of those biases is a belief that the path towards the meaningful decarbonisation of the energy we use relies on accounting for that energy use on an hourly matched basis. That is reflected in how the tiers are presented and framed.

{% callout "We'd love feedback" %}
It would be great to hear what folks think about this approach. What makes sense, what's unclear, what could be changed? Please finish reading this post (because it took an age to write 🙏🏽) and after you do, feel free to [drop me a line](/contact) with any feedback you might have.
{% endcallout %}

## Making this useful

To show these tiers in action, I want to approach this from the perspective of a company or individual that wants to assess their current digital suppliers. With this information, they can have a quick overview of how much carbon-free energy is being used in their stack and where they might start to look in order to increase that number. To do that, I will do a comparison of the two tech stacks my website runs on - the Cloudflare-based stack for `fershad.com` and the [recent EU-based stack I spun up](/writing/euro-stack) for `fershad.me`. 
## Running the numbers - `fershad.com`

The stack that `fershad.com` runs on is almost entirely on Cloudflare. I'm starting with this one partly for that reason, there hopefully won't be a lot of data thrown around and so it can be a gentle on-ramp to the ideas presented above.

### Services used - `fershad.com`

The below table shows the hosting related services that I use for `fershad.com`, including hosting for third-party services, and the regions that are used for each.

{% capture tableContent %}
| Service                     | Provider   | Region                                               |
| --------------------------- | ---------- | ---------------------------------------------------- |
| Hosting                     | Cloudflare | Global                                               |
| DNS                         | Cloudflare | Global                                               |
| Edge Functions              | Cloudflare | Global                                               |
| Analytics (Data processing) | Fathom     | Europe<br>- Falkenstein<br>- Helsinki<br>- Nuremberg |
| Analytics (Script CDN)      | Fathom     | Global                                               |
{% endcapture %}

{{ tableContent | markdownTable }}

So in total, I'm using **three providers** across **two regions** for that site. Looking at the table above, the math might not be mathing so let me explain.

- Due to the globally distributed nature of Cloudflare's services, it's not possible for me to pin down where exactly my stuff is running. For that reason, we set the region as "Global" and will use global averages where appropriate.
- For Fathom's analytic service, I have [Extreme EU Isolation](https://usefathom.com/docs/script/eu-isolation#extreme) turned on which means my data is processed on Fathom's EU servers in the three locations listed. Because I don't know which exact location I'm using, I'll group those together as one region and use averaged data for them where appropriate. 
- Fathom also uses a distributed network to host the script file, which I load onto my site. I'm considering this to be a separate provider. For that I will use a global average where appropriate. 

### Desk research - `fershad.com`

#### **Cloudflare**

In their latest [2025 Impact Report](https://cf-assets.www.cloudflare.com/slt3lc6tev37/7koyyovVxIqK8zdG1pqo6O/232476d0cc224d793025546295e68b20/Impact-Report-2025_01282026.pdf) (Jan 28, 2026), Cloudflare on page 50 that:

> Cloudflare consumed 177.89 gigawatt hours (GWh) total energy in CY2024. All consumed energy was obtained through grid electricity. Cloudflare matched its grid consumed electricity with renewable energy purchases as part of its commitment to 100% renewable energy.

Cloudflare also publishes an Emissions Inventory annually. Unfortunately the one for this year isn't ready yet, but the [last available one from 2024](https://assets.ctfassets.net/slt3lc6tev37/4hGof0DAFmUuGjjyLtG0sE/ecbbb0ef53e018ad1dd1b172c58b7154/Cloudflare_2023_Emissions_Inventory.pdf) points to these purchases being renewable energy attribution certificates. *Aside: that statement also mentions offset purchases, but then further down states that it's based on the RE100's technical guidance which doesn't allow for offsets to be claimed.* 🤔

With this information, we can list Cloudflare as **Tier 1 - Annually matched** provider.

#### **Fathom - Data processing**

Listen, I'll be honest with you. I had no idea where *Falkenstein* was until researching this. Turns out that it's in Germany, and there's a [Hetzner data center there](https://www.hetzner.com/unternehmen/rechenzentrum/). Hetzner's other EU locations happen to be Nuremberg and Helsinki. So although they don't state it explicitly on their website, I'm pretty confident that Fathom's EU Isolation is using these three Hetzner locations.

As a result, the information we would use for Fathom (as a service provider I use) would be that of Hetzner. Hetzner [publishes annually matched hydropower certificates](https://www.hetzner.com/unternehmen/nachhaltigkeit/) for their German and Finnish locations. 

With this information, we can list Fathom's data processing services as **Tier 1 - Annually matched** provider based on their use of Hetzner's locations.

#### **Fathom - Script CDN**

Fathom uses a global CDN to serve their analytics script. I've included this as a separate category for the purposes of demonstration more than anything else.

From my testing of a few locations, it seems like Fathom's CDN provider is most likely Bunny CDN. Bunny does not publish any discoverable sustainability information online, and for the purposes of this blog post I'm not going to chase them up for private disclosures.

As a result, Fathom's script CDN services would be classed as **Tier 0 - No disclosures** based on their use of Bunny CDN.

{% capture tableContent %}
| Service                     | Provider           | Region                                               | Tier |
| --------------------------- | ------------------ | ---------------------------------------------------- | ---- |
| Hosting                     | Cloudflare         | Global                                               | 1    |
| DNS                         | Cloudflare         | Global                                               | 1    |
| Edge Functions              | Cloudflare         | Global                                               | 1    |
| Analytics (Data processing) | Fathom (Hetzner)   | Europe<br>- Falkenstein<br>- Helsinki<br>- Nuremberg | 1    |
| Analytics (Script CDN)      | Fathom (Bunny CDN) | Global                                               | 0    |
{% endcapture %}

{{ tableContent | markdownTable }}

### Scoring - `fershad.com`

Straight away I hope you can see how this approach can present an easily scannable snapshot of a tech stack's sustainability profile. To make this even more useful, we can combine information we have about the energy grid and/or the energy being used by each provider to paint a more data-rich picture.

To start with, we can get regional grid data from open data sources like the information [Electricity Maps has made available through our CO2.js library](https://developers.thegreenwebfoundation.org/co2js/data/electricity-maps/). Since pretty much all carbon reporting is backwards looking, we can use the last calendar year's grid intensity for a given region. For 2025, we can [find that in the CO2.js repository](https://github.com/thegreenwebfoundation/co2.js/blob/27cbe8328aeaad0824fb07b3640dc45b72228c7b/data/output/electricity-maps/yearly_2025.json) on GitHub (although in these cases, I will need to write some code to calculate the averages - [which I've done very crudely here](https://codepen.io/editor/fishintaiwan/pen/019ffe21-8221-79ac-9b0c-a9be80b49db4)). The results are:

{% capture tableContent %}
| Service                     | Provider           | Region | Tier | Carbon-free energy |
| --------------------------- | ------------------ | ------ | ---- | ------------------ |
| Hosting                     | Cloudflare         | Global | 1    | 45%                |
| DNS                         | Cloudflare         | Global | 1    | 45%                |
| Edge Functions              | Cloudflare         | Global | 1    | 45%                |
| Analytics (Data processing) | Fathom (Hetzner)   | Europe | 1    | 80%                |
| Analytics (Script CDN)      | Fathom (Bunny CDN) | Global | 0    | 45%                |
{% endcapture %}

{{ tableContent | markdownTable }}

{% callout 'Tier 1: An important note about the carbon-free energy numbers' %}
Keen observers might note that even though Cloudflare and Hetzner both annually match 100% of their energy use with market-based renewable energy purchases they are only shown as having 45% and 80% carbon-free energy respectively. That is by design. While the annually matched purchases are great, we believe that organisations can and should be moving towards hourly matched energy disclosures. As such, **Tier 1** providers/regions can only claim as much carbon-free energy as the local grids they operate on.
{% endcallout %}

Using these figures, we can give the tech stack and overall score. To do this, we'll take the carbon-free energy value for each provider & region pairing, multiply them by their respective scoring factor, and then get the average of that amount.

{% capture tableContent %}
| Provider           | Region | Tier | Carbon-free energy | Scoring factor | Score  |
| ------------------ | ------ | ---- | ------------------ | -------------- | ------ |
| Cloudflare         | Global | 1    | 45%                | 1              | 45     |
| Fathom (Hetzner)   | Europe | 1    | 80%                | 1              | 80     |
| Fathom (Bunny CDN) | Global | 0    | 45%                | 0              | 0      |
| **Average**        |        |      |                    |                | **42** |
{% endcapture %}

{{ tableContent | markdownTable }}

### Overall score - `fershad.com`: 42%

Doing that gives us an overall score for the `fershad.com` tech stack of 42% through a combination of Tier 0 and Tier 1 providers.

As a further example, say I want to compare analytics providers? I could take the information about Fathom and generate a score for it and then run the same analysis of other analytics providers I was looking at.

## Running the numbers - `fershad.me`

Now let's take a look at the Eurostack domain I recently spun up. That domain lives at `fershad.me` with the backstory available for your enjoyment [in this blog post](/writing/euro-stack). 

### Services used - `fershad.me`

The below table shows the hosting related services that I use for `fershad.me`, including hosting for third-party services, and the regions that are used for each.

{% capture tableContent %}
| Service                     | Provider    | Region                                               |
| --------------------------- | ----------- | ---------------------------------------------------- |
| Hosting                     | Static Host | Finland                                              |
| DNS                         | OVHcloud    | France                                               |
| Analytics (Data processing) | Fathom      | Europe<br>- Falkenstein<br>- Helsinki<br>- Nuremberg |
| Analytics (Script CDN)      | Fathom      | Global                                               |
{% endcapture %}

{{ tableContent | markdownTable }}

For this stack, I'm using **four providers** across **four regions** for that site. Again, I'm considering Fathom's data processing and script CDN as two separate providers.

### Desk research - `fershad.me`

See above for the research on both Fathom services.

#### **Static Host**

Based on the [Static Host status page](https://status.statichost.eu), they use Hetzner's location in Finland and Nuremberg. However, when I test the domain from multiple locations they all return the same Finland-based Hetzner IP address. For that reason, I have set Finland as the region used for this provider.

With this information, we can list Static Host's services as **Tier 1 - Annually matched** provider based on their use of Hetzner's locations.

#### **OVHcloud**

In researching my Eurostack project, I used [https://european-alternatives.eu/](https://european-alternatives.eu/) to sort through providers. The European Alternatives page [lists OVHcloud's nameservers](https://european-alternatives.eu/product/ovh-cloud-domains) as being hosted in France.

OVHcloud publishes very detailed sustainability reporting. On [Page 171 of their latest report](https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf#page=171), they report 305 gigawatt-hours (GWh) of energy consumption in France (304 from EACs & PPA, 1 from fossil fuel). It appears though, that the 1 GWh of fossil fuel consumption gets rounded away when calculating the Renewable Energy Factor (REF) of 100%. On [Page 75 of the same report](https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf#page=75), we get a sense of the split between PPAs and EACs used in France - 40 GWh/year of PPAs in production (about 30% of total consumption). I couldn't find any information as to whether the EACs purchased by OVHcloud were annually or hourly matched, so I will default to annual.

With this information, we can list OVHcloud's services as **Tier 1 - Annually matched** provider based on their French locations.

{% capture tableContent %}
| Service                     | Provider    | Region                                               | Tier |
| --------------------------- | ----------- | ---------------------------------------------------- | ---- |
| Hosting                     | Static Host | Finland                                              | 1    |
| DNS                         | OVHcloud    | France                                               | 1    |
| Analytics (Data processing) | Fathom      | Europe<br>- Falkenstein<br>- Helsinki<br>- Nuremberg | 1    |
| Analytics (Script CDN)      | Fathom      | Global                                               | 0    |
{% endcapture %}

{{ tableContent | markdownTable }}

### Scoring - `fershad.me`

Again, we'll use data from Electricity Maps to work out the carbon-free energy percentage for each region, and then put all that together to get an overall score.

{% capture tableContent %}
| Service                     | Provider    | Region                                               | Tier | Carbon-free energy | Scoring factor | Score  |
| --------------------------- | ----------- | ---------------------------------------------------- | ---- | ------------------ | -------------- | ------ |
| Hosting                     | Static Host | Finland                                              | 1    | 95%                | 1              | 95     |
| DNS                         | OVHcloud    | France                                               | 1    | 96%                | 1              | 96     |
| Analytics (Data processing) | Fathom      | Europe<br>- Falkenstein<br>- Helsinki<br>- Nuremberg | 1    | 80%                | 1              | 80     |
| Analytics (Script CDN)      | Fathom      | Global                                               | 0    | 45%                | 0              | 0      |
| **Average**                 |             |                                                      |      |                    |                | **68** |
{% endcapture %}

{{ tableContent | markdownTable }}

### Overall score - `fershad.me`: 68%

Doing that gives us an overall score for the `fershad.me` tech stack of 68% through a combination of Tier 0 and Tier 1 providers.


## Result 

Through looking at my tech stacks in this way, I can see the Eurostack (`fershad.me`) is closer to being carbon-free than the more generic stack (`fershad.com`). I'm also able to quickly compare across service categories and providers should I wish to.

## What about Tier 2 providers?

Unfortunately, none of the providers I use have hourly matched energy use that I could find. So let me give you an example of one who does. 

34SP is the hosting provider we use over at the Green Web Foundation. They operate in the UK where the grid runs on an annual average of 70% carbon-free energy. However, through their [verification in the Green Web Dataset](https://app.greenweb.org/directory/#754) (remember that thing I mentioned I do for work about 2,500 words ago 😅) we know their hosting infrastructure is powered by Bryte energy. We can then use Matched Energy - an open source initiative to publish hourly information about how UK energy providers are matching customer demand with clean energy - to [see how Bryte energy performs](https://matched.energy/clean-power-index/bryt-energy?nuclear=true&variant=portfolio&tab=matching-scores). 

This research gives us a figure of 78%, above the national grid's baseline of 70%! We'd use this figure of 78% in any scoring calculations, rather than using the nation grid average of 70%.

{% callout 'Tier 2: An important note about the carbon-free energy numbers' %}
Unlike Tier 1 providers/regions, those in Tier 2 are able to make carbon-free energy claims that are greater than the local electricity grids they operate on - so long as those claims are supported by credible disclosures or open data.
{% endcallout %}

## How might we present this visually?

Let's say I wanted to compare three providers all who operate in the UK, each of whom is a different tier. One way I might do so is in a chart like this:

<div>
  <canvas id="three-providers"></canvas>
</div>

Or, let's say that I want to show the results from my analysis of the `fershad.me` tech stack. I could use a chart like this:

<div>
  <canvas id="fershad-com"></canvas>
</div>

Or, what if we want to present information about the different regions a provider offers so that leadership can make an informed choice on the location we should use:

<div>
  <canvas id="regions-chart"></canvas>
</div>

You might use this to select Region 5 because robust, hourly matched energy claims are more important to your organisation's sustainability goals than anything else. Or you might decide that for now, annually matched claims are okay but that you'll return to this data in a year to see if there's been any change (either more hourly matched regions, or a higher percentage of carbon-free energy in Region 5).

## Wrapping up

That's a long one. We're about 3,500 words deep, so thanks for getting this far. I'm hoping that the ideas above make sense, and that they present a way in which we can frame the conversation about decarbonising the energy hosting infrastructure runs on in a way that ***shows progress***, ***is repeatable***, and ***recognises action***.

If you have feedback, ideas, or questions about this please do get in touch and [start a conversation](/contact). 

If your organisation would like this kind of discovery and analysis carried out for your own tech stack, project, or digital suppliers then [reach out to us at the Green Web Foundation](https://greenweb.org/services). We're a small, but talented team and these are the kinds of things we nerd out over!

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>

const regionsChart = document.getElementById("regions-chart");
const threeProviders = document.getElementById("three-providers");
const fershadCom = document.getElementById("fershad-com");

const regions = [
  { x: "Region 1", fig: 70, tier: 0 },
  { x: "Region 2", fig: 75, tier: 1 },
  { x: "Region 3", fig: 90, tier: 1 },
  { x: "Region 4", fig: 60, tier: 1 },
  { x: "Region 5", fig: 55, tier: 2 },
];

new Chart(regionsChart, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Tier 0 Region",
        data: regions.filter(d => d.tier === 0),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(0, 0, 0, 0)"],
        borderColor: ["rgb(0,0,0,0.5)"],
        order: 2
      },
      {
        type: "bar",
        label: "Tier 1 Region",
        data: regions.filter(d => d.tier === 1),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(128, 252, 77, 0)"],
        borderColor: ["rgb(128, 252, 77)"],
        order: 2
      },
      {
        type: "bar",
        label: "Tier 2 Region",
        data: regions.filter(d => d.tier === 2),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(128, 252, 77, 1)"],
        borderColor: ["rgb(128, 252, 77)"],
        order: 3
      },
    ]
  },
  options: {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        stacked: true,
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        stacked: true,
        title: {
	        display: true,
	        text: "Carbon-free energy %"
        }
      }
    }
  }
});


const fershad = [
  { x: "Static Host (Finland)", fig: 95, tier: 1 },
  { x: "OVHcloud (France)", fig: 96, tier: 1 },
  { x: "Fathom - Data processing (EU)", fig: 80, tier: 1 },
  { x: "Fathom - CDN (Global)", fig: 45, tier: 0 },
  { x: "Overall score", fig: 68 , tier: null },
];

new Chart(fershadCom, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Tier 0 Providers",
        data: fershad.filter(d => d.tier === 0),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(0, 0, 0, 0)"],
        borderColor: ["rgb(0,0,0,0.5)"],
        order: 2
      },
      {
        type: "bar",
        label: "Tier 1 Providers",
        data: fershad.filter(d => d.tier === 1),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(128, 252, 77, 0)"],
        borderColor: ["rgb(128, 252, 77)"],
        order: 2
      },
      {
        type: "bar",
        label: "Tier 2 Providers",
        data: fershad.filter(d => d.tier === 2),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(128, 252, 77, 1)"],
        borderColor: ["rgb(128, 252, 77)"],
        order: 3
      },
      {
        type: "line",
        data: [68, 68, 68, 68],
        label: "Overall score",
        parsing: {
          yAxisKey: "loc"
        },
        borderColor: ["rgb(30,144,255)"],
        backgroundColor: ["rgb(30,144,255)"],
        tension: 0.1,
		pointStyle: false,
        order: 1
      }
    ]
  },
  options: {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        stacked: true,
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        stacked: true,
        title: {
	        display: true,
	        text: "Carbon-free energy %"
        }
      }
    }
  }
});


const providerData = [
  { x: "Provider B", fig: 70, tier: 1 },
  { x: "Provider A", fig: 70, tier: 0 },
  { x: "Provider C", fig: 78, tier: 2 },
  { x: "National grid", fig: 70 , tier: null },
];

new Chart(threeProviders, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Tier 0 Providers",
        data: providerData.filter(d => d.tier === 0),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(0, 0, 0, 0)"],
        borderColor: ["rgb(0,0,0,0.5)"],
        order: 2
      },
      {
        type: "bar",
        label: "Tier 1 Providers",
        data: providerData.filter(d => d.tier === 1),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(128, 252, 77, 0)"],
        borderColor: ["rgb(128, 252, 77)"],
        order: 2
      },
      {
        type: "bar",
        label: "Tier 2 Providers",
        data: providerData.filter(d => d.tier === 2),
        parsing: {
          yAxisKey: "fig"
        },
        borderWidth: 2,
        backgroundColor: ["rgba(128, 252, 77, 1)"],
        borderColor: ["rgb(128, 252, 77)"],
        order: 3
      },
      {
        type: "line",
        label: "National grid",
        data: [70, 70, 70],
        parsing: {
          yAxisKey: "loc"
        },
        borderColor: ["rgb(30,144,255)"],
        backgroundColor: ["rgb(30,144,255)"],
        tension: 0.1,
		pointStyle: false,
        order: 1
      }
    ]
  },
  options: {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        stacked: true,
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        stacked: true,
        title: {
	        display: true,
	        text: "Carbon-free energy %"
        }
      }
    }
  }
});
</script>
