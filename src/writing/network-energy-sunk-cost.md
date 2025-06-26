---
title: Is network energy use a sunk cost when trying to improve web sustainability?
# published: YYYY-MM-DD
summary: Thoughts about how we as a web sustainability community think about network energy use, and where we should focus our efforts instead.
---

Yes it is, in my opinion. That's it. That's the blog post.

Seriously though, this question has been loitering around mind for some time. As it's loitered, I've begun to form thoughts. Those thoughts have taken shape through the various projects I'm involved with in my work with the [Green Web Foundation](https://www.thegreenwebfoundation.org/), as well as just through the general nerd snippery that I bring upon myself. And, since this is the internet, I'm going to tell you those thoughts.

## Sunk cost?

A sunk costs is business speak for expenses that have already been incurred and cannot be recovered. Colloquially, you can say it's _the cost of doing business_. In the case of web sustainability, the "business" we're doing is hosting some content online & delivering it to one or more users.

## The internet as a business

Let's roll with the business analogy. As part of conducting the business of hosting and delivering content to users, there are three "business units" at play - hosting, networks, user devices. In web sustainability, we refer to these as "system segments". [Tom Greenwood's post](https://www.wholegraindigital.com/blog/website-energy-consumption/) from a few years back is still the explainer that I point folks to when introducing this.

Unfortunately for our business, each of these business units is a cost center. They incur expenses, but don't directly generate a profit. And the currency our business deals in energy, relying on it to get their jobs done. To put that another way, each of the three business units of the web draw down energy without generating any of their own.

## Okay, so why is network energy a sunk cost?

I'll stop with the business analogy here.

To be honest, the energy use of each system segment - hosting, networks, and user devices - will be sunk costs. Each will use energy, which is just an unavoidable part of host and delivering content on the internet.

That said, for hosting and user devices we have some levers we can pull to _reduce_ that energy use. But for the network segment our hands are tied.

Romain Jacob from ETH Zurich is a great person to follow in space. His research ([which I've written about previously](https://fershad.com/writing/website-carbon-beyond-data-transfer/#data-transfer-network-energy-usage)) is approachable and explains the network in a way that most people should be able to follow. The TL;DR of what I've learnt through Romain's work is _network devices are **always on**, and their energy consumption is generally independent of their traffic load. There’s a spike in energy consumption when the device is first turned on, and then its power usage stays relatively constant even as utilisation increases._

![Power draw of networks is decoupled from data transfer.](../../public/img/blog/f475f393bc56f10723cf961ce40334a70e57ed26-1034x617.png "A graph showing network utilisation as a steady line moving up at a 45 degree angle, compared to network power draw which rises sharply at the start (at 0 on the x-axis) before immediately leveling off to stay constant at almost full power consumption.")

## Network data transfer is like flying

Ready for another analogy?

Most of the conversations I see around digital sustainability revolve around reducing data transfer. But if the network that data is transmitted over is always on, and always at near peak energy utilisation, are we actually doing anything in that segment by reducing data transfer?

It's similar to the discussion around flying. As an individual, me not choosing to take a flight doesn't change much. That flight is still going ahead. It's the same with data transfer and network energy use. Me sending a few less kilobytes over the network isn't going to signal to the network operator that capacity can be reduced.

Like flying, though, we can collectively signal to airline operators that certain routes are less valuable if a sufficiently large number of people stop flying them. But that's a long game, with a lot of collective action required. We can get there, especially in places with suitable alternatives to flying, but we can't completely remove flying from our life. I'd say the same applies for the network. It's not a lost cause, but rather a long game that we can play alongside realising shorter term wins.

The whole flying thing is a rabbit hole that I might go down later. Tom Greenwood and Asim Hussain went down there on an earlier episode of their podcast ([timestamped link](<[https://holpod.com/p/003-consciousness-and-sustainability](https://holpod.com/p/003-consciousness-and-sustainabilitytimestamp=6169.5)>)) House of Life.

> The problem with flying is such an integral, important part of society. The reason flying is happening isn't because of Emirates. The reason flying is happening is because it's fundamentally one of the very useful parts of being parts of society these days, which is why there's a lot of demand for it.
> <cite>Asim Hussain, House of Life podcast</cite>

## So ... give up?

Nope. But, as web developers wanting to build a more sustainable web, we should focus our energies elsewhere. We should look to optimise and reduce the _energy cost_ of our operations on the hosting and user devices segments. As web developers, they are the two segments we have the most control over.

You might notice the words "energy cost" emphasised in the sentence above. That's what we should focus on. Optimising for carbon emissions can be gamed by adjusting the grid intensity (a value that represents how many grams of CO2 is produce per kilowatt-hour of electricity generation on a given grid). Energy usage is harder to game, and it should be our guiding star when we think about web sustainability optimisations.

There's something to be said about what actions are more effective than others in terms of reducing energy use, but that's for another blog post.

## Folks are working on the network energy problem

While us frontend developers work to optimise the parts of the stack that we control, there are people and groups out there actively working to understand and reduce the energy being used by the networks we rely on to deliver content online.

- Romain Jacob's work is really worth following. His [publications](https://www.romainjacob.net/publications) are available online, and he has also made 3 hours of lecture material covering the [fundamentals](https://adv-net.ethz.ch/transcripts/sustainability_context/) and [application](https://adv-net.ethz.ch/transcripts/sustainability_application/) of sustainable networking.
- The Greening of Streaming group are also heavily involved in looking into network energy use. Their [publications](https://www.greeningofstreaming.org/publications) are also available online.
- My colleague Chris has written about the possibility of [extending IPv6 to support carbon-aware networking](https://www.thegreenwebfoundation.org/publications/extending-ipv6-to-support-carbon-aware-networking/).
