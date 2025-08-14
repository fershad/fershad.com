---
title: Sceptical about website carbon emission figures
published: 2025-08-14
---
<link rel="preload" src="https://embed.bsky.app/static/embed.js">
<div style="display: flex; flex-direction: column; align-items: center;">
<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:mnut7bswvnl54dhflb4qofss/app.bsky.feed.post/3lwbrq2haes2j" data-bluesky-cid="bafyreiduvcrzvsgaokzqjfmot46yxpvitlcbqfdlaimbg44wrgkm2ff4ry" data-bluesky-embed-color-mode="system"><p lang="en">ahem, has anyone calculated how much carbon their Storybook uses when visited … I&#x27;m guessing it could be pretty chunky.</p>&mdash; Stuart Robson (<a href="https://bsky.app/profile/did:plc:mnut7bswvnl54dhflb4qofss?ref_src=embed">@sturobson.com</a>) <a href="https://bsky.app/profile/did:plc:mnut7bswvnl54dhflb4qofss/post/3lwbrq2haes2j?ref_src=embed">Aug 13, 2025 at 20:01</a></blockquote>
<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:ccw4zckt3u7hytoxemgoe654/app.bsky.feed.post/3lwbuzs73hc2l" data-bluesky-cid="bafyreiflahgm6mldqfdsgi5l5l7gdgwq5jcyish222uzehcl242srm6u3u" data-bluesky-embed-color-mode="system"><p lang="en">I’m deeply suspicious of anything that tries to estimate how many kgs of carbon a website ‘emits’

There are so many factors and we don’t have strong data</p>&mdash; Andy Davies (<a href="https://bsky.app/profile/did:plc:ccw4zckt3u7hytoxemgoe654?ref_src=embed">@andydavies.me</a>) <a href="https://bsky.app/profile/did:plc:ccw4zckt3u7hytoxemgoe654/post/3lwbuzs73hc2l?ref_src=embed">Aug 13, 2025 at 21:00</a></blockquote>
</div>
<script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

Stuart Robson asked the question above [on Bluesky](https://bsky.app/profile/sturobson.com/post/3lwbrq2haes2j), to which Andy Roberts was one of [a few respondents](https://bsky.app/profile/andydavies.me/post/3lwbuzs73hc2l). I've been tagged in that thread, and rather than writing a multi-part reply on Bluesky I'll capture my comments as a note here because it feels like something that will be handy to refer back to in the future.

## Reply

Being sceptical about website carbon emission is fair enough. As Andy's pointed out there are a lot of moving parts and limited data points. But there's an environmental impact from our web activity which is what these website emissions calculations aim to surface. So let's talk about what those emissions figures represent, and what alternatives we have.

### Estimating

Most of the website emission figures you'll see online are estimates. We're not talking about values that have been reached through measurement (more on that in a bit). The most widely used website carbon estimation model is the Sustainable Web Design Model. This model is attributional, and at a very high level it works like this:

- (A) Take a value for the total energy used by the internet
- (B) Take a value for the total data transferred over the internet
- Divide A by B to arrive at an amount of energy used to transfer a unit of data.
- Multiply that by the amount of web page data transferred to get the **estimated energy used**.
- Multiple that by a carbon emissions intensity value to get the **estimated carbon emissions**.

The latest version of the Sustainable Web Design Model gets a bit more detailed than this ([see the methodology](https://sustainablewebdesign.org/estimating-digital-emissions/)), but at a high level that's what it's doing. Emissions results can be broken down by system segment (backend, network, frontend) and operational/embodied phases.

This means two things:

1. Data transfer is used as a proxy for website emissions. This isn't great (see my thoughts [here](https://fershad.com/writing/is-data-the-best-proxy-for-website-carbon-emissions/), and [here](https://fershad.com/writing/website-carbon-beyond-data-transfer/)) but it is the best thing (most accessible data point) we have available to us absent of more complex tooling.
2. Due to the attributional (top down) nature of the model, the resulting emissions values is likely to be an over-estimate.

All that said, it's a tool in our toolkit and a good first step to get folks into the ballpark. Understanding how it works can help better interpret the results. The ethos behind models like this is *progress over perfection*.

### Measuring

That gets us to asking what "measurement" can we do instead to get better data?

It is absolutely possible to measure the energy used by a web page. It just takes more tooling, or a dedicated setup, which makes it not so easily approachable for most folks. There just aren't the browser/web APIs available at the moment to make this something that can be shown up in DevTools.

Firefox Profiler is the only browser profiling tool that I'm aware of which [surfaces power and energy measurements in profiles](https://fershad.com/writing/co2e-estimates-in-firefox-profiler/). Just like with web performance though, reading profiles can feel intimidating to most regular folks and needs some level of knowledge to interpret. The power profiles captured in Firefox also differ in how much detail they show based on the underlying system architecture, and only capture operational energy use on the device.

Outside of that, groups like [Green Coding Berlin](https://www.green-coding.io/) are working on platform solutions that enable measurement. However, these require a dedicated setup/additional configuration which again adds a barrier to adoption.

All that said, when possible, "measure" rather than "estimate". And, lean towards talking about "energy use" rather than "carbon emissions" especially for the frontend (see this recent post I wrote [on that topic](https://fershad.com/writing/web-sustainability-metrics-carbon-energy/)).
