---
title: Change the value for CO2e calculations in Firefox Profiler
published: 2023-09-15
draft: false
lang: en
type: post
tags:
  - firefox profiler
  - website carbon
  - note
description: This is cool. You can now change the value Firefox Profiler uses when it calculates the CO2e emissions in a Power Profile.
---

This is cool. So earlier this year, through my role with the Green Web Foundation, we did some work to add carbon emissions estimates to the Firefox Profiler. You can read more about that [over on my blog](https://fershad.com/writing/co2e-estimates-in-firefox-profiler/).

When we rolled it out this feature, we used the global average grid intensity to convert the amount of energy used into an estimated CO2e value. Recently, the Firefox team have made a further update to this feature which greatly improves on this! Now, if you want to use a different grid intensity value (in grams CO2e per kilowatt-hour) then you can change that, and have that change persist when you share the Profile.

## How to change the grid intensity value

Take [this Power Profile](https://profiler.firefox.com/public/tdactt1zn64g58pqcnv92btc4r9v0e3v7yr2qdg/marker-chart/?globalTrackOrder=0&profileName=Test%20Run%201%20-%20No%20Cache&thread=0&v=10) I took recently for my article on the [power consumption of different image formats](https://fershad.com/writing/power-consumption-jpeg-webp-and-avif/). In the screenshot below, you can see a CO2e value of 0.16 mg for the entire recorded range. If you open the profile, you can see this yourself by hovering your mouse of the power track.

![Screenshot of the Firefox Profiler showing power consumption and CO2e estimates.](../../public/img/SCR-20230915-syqf.png "Screenshot of the Firefox Profiler showing power consumption and CO2e estimates.")

This value is calculated using the global average grid intensity (about 436 gCO2e/kWh at the time of writing). If I want to use a different grid intensity value instead, then I can do this via the console in my browser. Opening the console, and typing `window.profile.meta.gramsOfCO2ePerKWh = 1000` will set the grid intensity used in the calculation to 1000 gCO2e/kWh. And you can see in the screenshot below, we now see a different (higher) value of 0.37 mg for the entire recorded range. I've zoomed in on this screenshot to make it clearer.

![Screenshot showing the browser console open, with a command to change the grid intensity of the Firefox Profiler. One the left of the screen, a Profile is open showing the power and CO2e values.](../../public/img/SCR-20230915-tbrm.jpeg "Screenshot showing the browser console open, with a command to change the grid intensity of the Firefox Profiler. One the left of the screen, a Profile is open showing the power and CO2e values.")

What's even better is that now, if I re-upload the profile, the new CO2e value will remain. You can see that for yourself here: [https://share.firefox.dev/3ZgO8wR](https://share.firefox.dev/3ZgO8wR)
