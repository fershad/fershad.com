---
title: Power measurements and CO2e estimates in Firefox Profiler
published: 2023/02/16
permalink:  /writing/co2e-estimates-in-firefox-profiler/
summary: >-
  A quick look at power usage profiling that's available in Firefox Dev Tools
  Profiler, and the accompanying CO2e measurements.
---

Earlier this year, an update to the Firefox Dev Tools Profiler was merged into production (Jan. 10, 2023 - [here's the PR](https://github.com/firefox-devtools/profiler/pull/4414)). It includes a merge of some code I helped author which surfaced carbon emissions estimates for power measurements made using the profiler. You may remember me using a pre-release version of this when I [audited the COP27 website](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/) last year.

Having code merged into a Mozilla project is wild. It's even cooler when it gets a shout out at [FOSDEM](https://fosdem.org/2023/schedule/event/energy_power_profiling_firefox/).

## What is the Firefox Profiler?

In a nutshell, the Firefox Profiler is a Developer Tool in the Firefox browser that can be used to capture a performance profile of browser usage. This profile contains extremely low-level detail on the processes and functions that were being run at the time it was capture, and is extremely useful for debugging performance issues, memory leaks, and much more.

### Power measurements in Firefox Profiler

[As of Firefox 104](https://www.mozilla.org/en-US/firefox/104.0/releasenotes/), the profiler has been able to capture power usage. About a month ago I had the pleasure of talking with Florian Quèze, one of the developers responsible for getting this feature into the Profiler. As you can imagine, capturing the power profile of a browser is no easy feat, and there's a bunch of important caveats to keep in mind if you do go ahead and use it.

1. The power profile that is capture on Intel CPU devices is that of the _entire system_. That means if you've got a whole bunch of background apps running, their power usage will be captured too.
2. On AMD CPUs, you can get power profiles broken down per core, but again they capture _entire system_ power draw.
3. On Apple Silicon CPUs, you can get a _per process_ breakdown. This should allow you to isolate the power track for the browser window that is being captured.
4. Capturing power profiles works well on Windows 11 and Apple Mac devices, but needs some manual steps to work on Linux. I've not yet managed to get it going on my Linux device.
5. It's currently not possible to capture the power profile of a mobile device.

### CO2e estimates in the Firefox Profiler

The CO2e (carbon dioxide equivalent) emissions estimates that I helped add to the Profiler are pretty straight forward. It works by:

1. Taking the power figures recorded by the profiler and converting them to kilowatt-hours.
2. Multiplying this value by 442 g/kWh (the global average grid intensity in grams of one kilowatt-hour).

Ideally, we’d like to use region-specific figures for even greater detail. There’s been some [conversation around this](https://github.com/firefox-devtools/profiler/pull/4243#issuecomment-1266624528) as part of the PR for this feature. I expect we'll be able to get something like this implemented sometime this year.

## Recording a profile

Another thing that came out of my chat with Florian, was that he recommended using the Profiler Toolbar Extension for Firefox when capturing power profiles. The reason, he said, was that they had put in a lot of work into making the extension consume as little power as possible so as not to impact the results of the recording. To add it to your Toolbar, go to [https://profiler.firefox.com](https://profiler.firefox.com) and click on the _Enable Firefox Profiler Menu Button_.

![ ](../../public/img/blog/f93b05a2dfa1d52c97e209360eebb7443707ea12-1404x1073.png "Screen capture showing how to add the Firefox Profiler to the browser taskbar.")

This gives you a one-click profiling option through the Firefox taskbar. Another way to capture a profile is through DevTools. In the browser, open up DevTools and navigate to the Performance tab. There, you’ll see a dropdown with different presets which you can use. There’ll be a Power option in that list. With that selected, you can start recording!

![ ](../../public/img/blog/c002eb1d76f1294417f3f7f63ffef37af7edcd7c-989x443.png "Screenshot from Firefox 106 DevTools, showing the Power preset selected in the Performance tab.")

### My recommendation

Given what I mentioned above about how the profiler captures power use of the **entire system**, it might make sense to run a clean profile first (with just Firefox open, no tabs open) to give you a comparison point when trying to examine how power hungry a page is.

## Reading a profile

Depending on the system you’ve run the profile on, you’ll be presented with different Power tracks. In my examples, I’ve captured a profile on a Windows 11 Surface Pro 6 Laptop. This is an Intel powered device, and so I’m presented the with below four tracks:

- Power: DRAM
- Power: CPU package
- Power: CPU cores
- Power: iGPU

![ ](../../public/img/blog/b8b3f4fc314f3da222b1397eedca403b29ed92a9-873x196.png "Screenshot showing Power tracks (rows) in the Firefox Profiler.")

From what I understand now, to get the full power usage during the profile I’ve capture I would want to sum together the values for **Power: DRAM** and **Power: CPU Cores**. I can get these values by hovering over the respective tracks and noting the **Energy use in the visible range** value.

You’ll also notice the little CO2e value in parentheses after the power reading. You can use that for a ballpark carbon estimate, or you can get more precise if you want by converting the power measurement to kilowatts per hour, and then multiplying that by an appropriate grid carbon intensity figure.

{% callout "Update - 19.09.2023"%}
The team at Mozilla have been working a bit more on this feature recently, and now it's possible to change the grid intensity that is used to calculate the CO2e estimate in the profiler.

I've written about how to do that in this quick note - [Change the value for CO2e calculations in Firefox Profiler](https://qt.fershad.com/writing/change-gco2kwh-firefox-profiler/)
{% endcallout %}

## Watt else could you do?

Get it. Watt. Power measurements. It’s been a long day, fam.

I don’t want to be a bad influence, and nerdsnipe folks into spending their weekends looking at power profiles. That said, I’ll just put a couple of ideas out there.

Since the profiler is capturing system level power consumption, you could feasibly:

- Measure the power usage of desktop applications, or
- Measure the power usage of the same web page across different browsers, or
- Measure the power usage of a web page in dark & light mode

With all the other above, you’d want to capture a clean baseline of your system’s power usage before capturing a profile for whatever you’re testing.

## Closing thoughts

This is super cool stuff, and exposes a lot of potential avenues for research and auditing. The impact of device usage is significant as a whole, even if the impact of individual devices is measured in milligrams. One only needs to look at [Mozilla’s own greenhouse gas emissions findings](https://blog.mozilla.org/en/mozilla/release-mozillas-greenhouse-gas-emissions-baseline/).

![ ](../../public/img/blog/d0fc5ea8b241ce725d4ed429fc92e553c2eea97a-1920x1080.png "Chart showing that 98% of Mozilla’s emissions in 2019 came from the use of their products.")
