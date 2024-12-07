---
title: Could data networks operate like the electricity grid?
published: 2024/04/23
---

Last year, Hannah Smith & Ismael Velasco explored the idea of grid aware computing - an alternate approach to carbon aware computing which aims to address some of the potential downsides of current time and location-shifting approaches.

## The electricity grid

In their write up, which you can read on Github, they give a pretty [handy explainer of how electricity grids operate](https://github.com/climateaction-tech/grid-aware-software/blob/main/how-the-grid-works.md). It's not super technical, and I'm sure electricity grid wonks can point out some generalisations or assumptions that are made in it, however for a lay person it's a fantastic primer.

One part in particular has stuck with me:

> The expected demand for any given day is predicted using data. This allows the grid managers to ensure there is enough electricity available. There typically aren’t big demand differences from one day to the next. There is some daily fluctuation as people get up, go to bed, etc. But it’s usually predictable enough.

So in essence, grid providers forecast what the electricity usage curve will look like through the day. I'm sure they base this on a wide range of factors including the season, weather, day of the week, and so on. In general, they're setting they'll set the grid up so that it's provisioned to handle the expected load for a given time of day, and no doubt leave a bit of overhead just in case.

Sometimes, though, demand on the grid might spike. To avoid a blackout, grid operators will often look to bring only rapidly deployable electricity supply. This often comes in the form of fossil fuel (gas) powered "peaker plants". If everything works out, the lights stay on and eventually demand drops back to within the expected load range. The peaker plants can then be turned off again.

## Could we do this with data networks?

My mind always goes back to this whenever I hear folks on podcasts or whatnot talking about peaker plants, energy demand, and other similar topics.

Would it be possible for network operators to use a similar methodology to improve the sustainability of networks, and reduce the [estimated 240-340 TWh energy](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks#tracking) it uses?

In my mind, it'd surely be possible to train a ML model on trends in network traffic. That model could then monitor the network to anticipate spikes or troughs in load. If it sees things are about to get funky it'd trigger an alert or even take action to switch some routers from idle to active, or put them back into idle.

Does this already happen and I'm just not aware? I don't have an answer for you folks, just wild ideas. Sorry. Someone with deeper domain knowledge than me, please [get in touch](https://fershad.com/contact)!

### Content worth exploring

In 2022, Romain Jacob and Laurent Vanbever published a paper title _The Internet of tomorrow must sleep more and grow old_. Chef's kiss for that title. In it, they explore the idea of turning off under utilised network devices or improving their ability to "sleep" and reactive when they're needed to move data.

[Read their paper](https://hotcarbon.org/assets/2022/pdf/hotcarbon22-jacob.pdf), watch Romain speaking at [HotCarbon 2022](https://youtu.be/EUprOJTvQ84), or watch a slightly more recent talk by Romain at [RIPE 87](https://ripe87.ripe.net/archives/video/1143/).
