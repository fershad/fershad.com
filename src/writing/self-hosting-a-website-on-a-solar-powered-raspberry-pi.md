---
title: Self-hosting a website on a solar powered Raspberry Pi
published: 2023/03/30
permalink:  /writing/self-hosting-a-website-on-a-solar-powered-raspberry-pi/
summary: >-
  A conversation from the ClimateAction.Tech community about self-hosting a
  website on a solar powered Raspberry Pi.
---

This week has been all about getting back into the swing of a regular work routine after spending 10 days in Germany. It was nice to have a bit of break, and spend time mixed between city and rural life in Germany. I came away from my time there with a load of other ideas to tinker with throughout the year, so expect a few more “how I build this” kinda posts in the future.

One thing I’d love to tinker with, but aren’t sure where I’ll find the time to is self-hosting my website. So that I remember what to do whenever that time comes around, I’m sharing a conversation thread from the [ClimateAction.Tech](http://ClimateAction.Tech) slack community community about that very topic. I feel like this thread is too good to be lost into the Slack ether, so am saving it here for future reference.

The conversation started when **[Michael Andersen](https://sustainablewww.org/)** ask in the #green-webdev channel:

> Happy Friday everyone 🙂  
>
> I was wondering if any of you are hosting your websites on a Raspberry Pi or similar?  
>
> I am thinking about transferring my website to Sweden or Norway because of the greener energy, but VPS hosting is quite expensive. At DO I can get a VPS in Germany for 6 USD per month, and in Sweden it costs 40 USD for the same specs.  
>
> So I am thinking about another option which is to use one of my Raspberry Pi's to host the website. But before making a decision it would be nice to know what experience others have with it.

[**Dryden Williams**](https://ecoping.earth/) was quick to reply with a pointer to the Solar Protocol.

> Definitely doable! You might find this interesting: [http://solarprotocol.net/](http://solarprotocol.net/); a network of hosting on Raspberry Pi or similar

**I** also chimed in with a link.

> Check out what @scottsweb has done on his site. [https://scott.ee/project/solar-hosting-raspberry-pi/](https://scott.ee/project/solar-hosting-raspberry-pi/)​

**Michael** replied thanking us for the links.

> Thanks @Dryden Williams and @fershad. Will definitely take a look at both. Maybe I can come up with my own little 100% solar driven project for Sustainable WWW.

**Dryden** was also interested in the work of @scottsweb.

> I must say I REALLY LOVE that post by @scottsweb and what a great site!

[**Scott Evans**](https://scott.ee) (@scottsweb) joined the conversation.

> Thanks for the kind words and pings. Let me know if you have any questions @Michael Andersen. My site has been ticking along on battery after a couple of brighter days. Cloudy and raining again now though 😟  
>
> Also, self hosting is great. I have lots of local network only services running now on a little home server, which is also a backup for when the solar pi goes offline.

Indeed, **Michael** did have questions & asked Scott:

> it’s a really cool project, and yeah I know it’s hard to keep things running on solar. In Sweden winters get quite dark 😅  
>
> I have one question. I used to run another website from a raspberry pi at home, but 1 out of 3 times someone tried to surf to it, it was unreachable through Cloudflare despite a script almost constantly updating the dynamic IP. Are you having problems with that also or how have you gotten around that? 😊

This is when things start to get really interesting, with **Scott** providing some great answers and insights into self-hosting a site on a solar powered device.

> So I actually have it working a little differently. I don’t have to use dynamic DNS at all and my IP address could change all day and it wouldn’t matter. Typically you would set it up like this: Internet traffic -> Your router (with a port open) -> Your server (and something to update dynamic DNS on your network)  
>
> With Cloudflare tunnels it works differently: Internet traffic -> Cloudflare <- Your server (a secure tunnel is made between your server and Cloudflare)  
>
> In this setup, you don’t need to open any ports on your router, or worry about updating DNS records. The tunnel using cloudflare replaces all that and provides additional security too. You can read a bit more about their service here: [https://www.cloudflare.com/en-gb/products/tunnel/](https://www.cloudflare.com/en-gb/products/tunnel/) - it’s free for small teams (perfect for home) and can do things like lock down your apps too (you must sign in with a email ending in mydomain.com or have a certain IP address). I should note that Cloudflare is not the only company to offer this service either.

**I** contributed a link to a recent [Syntax.fm](http://Syntax.fm) episode talking about the very topic of tunneling:

> There was a recent Syntax episode about tunneling which might surface other options.  
> [https://syntax.fm/show/590/https-tunnel-your-localhost-cloudflare-tunnels-ngrok-and-more](https://syntax.fm/show/590/https-tunnel-your-localhost-cloudflare-tunnels-ngrok-and-more)​

Once more, **Michael** hit us with the gratitudes.

> Thank you so much [@scottsweb](https://climate-tech.slack.com/team/UGHFLNT5H) and [@fershad](https://climate-tech.slack.com/team/U01PKTBUYLD) 🙂  
>
> I will look more into Cloudflare tunnels. I was not a huge fan of the traditional way updating the dynamic IP, but this way might be much better.

At this point, **[Todd Zmijewski](https://rollthecloud.com/)** chimed in with a question about battery storage capacity tied to solar panels.

> How many batteries can a single solar panel reliably support? With enough of these you could become a 100% sustainable file coin storage provider. How much storage capacity does each of these have? I also wonder if its possible to run wasm cloud on these reliably. Introduces a whole other dimension of being able to run dynamic apps and apis. [https://wasmcloud.com/](https://wasmcloud.com/)​

**Scott** came back with an answer from his own experience.

> With the solar panel I have, it would only support one battery… and the charging circuit is only designed for one battery too. The Pi Zero currently has 16GB of storage as an EMMC ([one of these](https://www.uugear.com/product/raspikey-plug-and-play-emmc-module-for-raspberry-pi/)). More storage could be added via USB, but it would send my energy demands way over budget.  
>
> As things stand I currently use about 110mA on average, plugging in just a USB ethernet dongle takes that up to nearly 300mA, so adding something like a USB hard drive will probably go way beyond that (into the 500mA range).  
>
> I am also observing something else quite interesting. During the summer last year the panel seemed to struggle to charge the battery, which I couldn’t understand. Now the sun is starting to appear again, it seems to all be working better than before. I have a feeling that heat is a huge factor on how this small solar panel operates. During summer, it gets plenty of sun but it becomes too hot to touch at times. On sunny days now, it gets plenty of sun but the outside temperature is still only 1-2 degrees. I am going to experiment with this some more when the heat comes back, but I have no idea what a solution might be.

**Michael** had a follow up question for Scott around panels and storage.

> Do you think a 100w panel could run run and charge a battery big enough to run a raspberry pi 4 with 8gb ram continuously? I know for sure it’s enough in summer time, but I wonder if the panel is big enough to create enough energy even when it’s cloudy or in the dark months of winter 😊

**Scott**’s reply included a link to the OG solar powered self-hosting website - [solar.lowtechmagazine.com](http://solar.lowtechmagazine.com) - rightly noting in the process that location also plays a big roll in how one might setup a solar powered server.

> That is a good question. At least where we are, I don’t think it would be easy to achieve. In the winter, the apartments opposite block our sun completely and the largest battery I have found to power my pi zero (that is compatible with the charging circuit I have) would last about 30 days. A pi 4 is going to be more [power hungry](https://www.pidramble.com/wiki/benchmarks/power-consumption) by a factor of about 4x, so perhaps the same batter would last a week.  
>
> I think you would probably want to upgrade the entire thing towards a 12v system like the one described in [Low Tech Magazine](https://solar.lowtechmagazine.com/about.html) - they manage to achieve really good results with a smaller panel and bigger battery but they are based in Spain too (I think?) so get much more sun.They cover some of the technical aspects here:  
>
> [https://solar.lowtechmagazine.com/2020/01/how-sustainable-is-a-solar-powered-website.html#solarpanel](https://solar.lowtechmagazine.com/2020/01/how-sustainable-is-a-solar-powered-website.html#solarpanel)​

The battery talk between Michael and Scott continues, with **Michael** asking about Scott’s current setup.

> How big is the battery you are using? I am thinking that a week would probably be okay, and in worst case I would be able to recharge another way

And **Scott** answering:

> It is this one: [https://shop.gwl.eu/index.php?cl=details\_disc&anid=4011](https://shop.gwl.eu/index.php?cl=details_disc&anid=4011) - so 20Ah

**Michael** then has a further question about how the whole setup is protected from the elements.

> Unfortunately they don't have that one any longer. How are you dealing with frost and heat? Do you have the whole project in a box outside or have you made arrangement to charge from the outside, but the project is located inside in constant heat?

**Scott** comes back with an alternate battery option, and talks about how he’s weatherised (or worked around weatherising) his current Pi and panel setup.

> This looks like a good potential alternative: [https://shop.gwl.eu/LiFePO4-cells-3-2-V/ELERIX-Lithium-Cell-LiFePO4-3-2V-50Ah-1-1.html](https://shop.gwl.eu/LiFePO4-cells-3-2-V/ELERIX-Lithium-Cell-LiFePO4-3-2V-50Ah-1-1.html) - larger capacity is appealing too. For the Pi Zero it would probably last over 2.5 weeks without any sun.  
>
> The Pi is inside on the windowsill and the panel is outside as much as it can be. I soldered quite a long cable between the Pi and the panel so I could keep one inside and one outside. To protect the Pi from heat, it is housed in [this foam case](https://i0.wp.com/scott.ee/images/solar-host-pi.jpg?w=1600&quality=80&strip=info), I keep the lid open and it casts a shadow over the circuitry. I don’t find heat a problem (except for the panel getting too hot outside).  
>
> I don’t have a great setup in this apartment, if we ever move I think I will try and find somewhere to mount the panel outside all year and then weather seal all the cables.

**Todd** rejoined the conversation with

> We are able to run our entire enterprise for free using AWS serverless Lambdas and Azure function apps targeting regions with low grid intensities like Norway, Sweden, etc. Something that is not possible with VPS. Using serverless we are able to handle millions of requests for free across a multi-cloud with auto-scaling serverless climate aware functions.

[**Nico**](https://heylow.world/) shared a link to a very informative YouTube video:

> Probably a nice add-on to this conversation:  
> [https://www.youtube.com/watch?v=t8tjDC6RIR8](https://www.youtube.com/watch?v=t8tjDC6RIR8)  
>
> I find the discussion about the website's uptime quite interesting. The site is live 98% of the time, which is totally fine for them. It's better than investing in additional infrastructure and resources to achieve a 100% uptime.  
>
> Solar Protocol is mentioned (around 30min), as they feel that it misses the point since it involves creating a global infrastructure just to achieve a 2% increase in uptime to get to 100%

That’s where the conversation ended at the time of me writing this. If there are any further developments, I will update this post with the additional content.
