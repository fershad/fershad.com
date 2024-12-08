---
title: Including user interaction in website carbon estimates
published: 2024/07/09
---

All the website carbon calculators I know about work in roughly the same way:

- User enters a web page to test.
- The web page is loaded using a service like [Google PageSpeed Insights](https://pagespeed.web.dev/) or [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).
- The amount of data transferred during the page load is returned to the calculator.
- Based on that value, and possibly some other variables (like green hosting), a carbon emissions estimate is returned to the user for that page load.

This is great for baselining the estimated carbon emissions of a web page when it first loads, but no many real users are just loading a web page and then leaving. Capturing user interaction (like scrolling, loading a video, opening a modal etc.) and reflecting that in web page/website carbon estimates is vital if we want to start working with estimates that realistically reflect a page being used in the real world.

## Enter the Performance API PerformanceResourceTiming interface

The [Performance API PerformanceResourceTiming API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) is a browser interface allows developers to get data on the loading of network resources on a web page.

`PerformanceResourceTiming` can be run from inside the browser's console, or from.a script loaded on a page. It returns an array of the resources loaded on the page being viewed. This includes lazy-loaded resources, or other resources that are downloaded as a result of a user interaction. That makes it perfect for going beyond page load and capturing web page emissions that includes user interactions.

## Using PerformanceResourceTiming with CO2.js to estimate web page carbon emissions

To use `PerformanceResourceTiming` for estimating web page carbon emissions we'll need to get the `transferSize` data that's captured and use that with an existing website carbon estimation model. We'll talk about how to get the data transfer information shortly, and to help provide an easy way to use that information with different website carbon estimation models we can use the CO2.js library.

### Start using PerformanceResourceTiming

Before we start using `PerformanceResourceTiming` to get information about how much data is transferred as a page is used, we need to decide how often we're going to query the interface. We can use any number of triggers for this, but a few of the most common would be:

- `setInterval` - querying the interface every _x_ number of milliseconds.
- `document.addEventListener("click",{})` - querying the interface on every click interaction.
- `window.addEventListener("scroll", {})` - querying the interface on every scroll interaction.

These all have different upsides and limitations. Anything that relies on timing (`setInterval`, `setTimeout`) might not capture all the information about a users interaction on the page. Others, like listening for clicks would need to also then have fallbacks that work for keyboard users. Scroll triggered events won't capture user interaction like playing a video. From a web sustainability perspective, though, it would be preferable to not run these interface queries too frequently since they do utilise a small amount of compute and energy each time.

Whichever approach you take, you can use the function below to query `PerformanceResourceTiming` and return the total bytes of data transferred.

<!-- markdownlint-disable -->
{% codeToHtml "js" %}
    function getPageWeight() {
        const performance = window.performance.getEntriesByType('resource');
        const transferSize = performance.reduce((acc, resource) => acc + resource.transferSize, 0);
        return transferSize;
    }
{% endcodeToHtml %}
<!-- markdownlint-enable -->

## Putting it together with CO2.js

[CO2.js](https://github.com/thegreenwebfoundation/co2.js/tree/main) is a JavaScript library that I maintain as part of my role with the Green Web Foundation. It exists to enable developers to estimate the emissions related to use of their apps, websites, and software, based on peer reviewed research that’s found in methodologies like the Sustainable Web Design Model and 1byte model. It also provides access to high-quality grid intensity data for countries and regions around the world provided by [Ember Climate](https://ember-climate.org/).

The code below shows a simple implementation that imports CO2.js and uses the function above to estimate the carbon emissions of a web page every 10 seconds.

<!-- markdownlint-disable -->
{% codeToHtml "js" %}
    import { co2 } from '@tgwf/co2';

    const model = new co2({ model: "swd", version: 4 });

    setInterval(() => {
     pageWeight = getPageWeight();
     const emissions = model.perByte(pageWeight);
     return emissions;
    }, 10000);
{% endcodeToHtml %}
<!-- markdownlint-enable -->

Read more about using CO2.js in the Green Web Foundation's [Developers Documentation website](https://developers.thegreenwebfoundation.org/co2js/overview/).

## Demo code repo

You can find the code for this demonstration on Github. It runs a check for the page size on load, and then runs again each time an image is loaded. The demo page in the repository contains three large images all lazy loaded. Whenever a new image loads, the resulting CO2e estimate is calculated and updated in a sticky banner on the left of the page. It also logs a trace of the estimation in the console.

**Repo**: [https://github.com/fershad/webpage-co2e](https://github.com/fershad/webpage-co2e)  
**Demo page**: [https://fershad.github.io/webpage-co2e/](https://fershad.github.io/webpage-co2e/)

## Other upsides of this approach

Besides being able to estimate web page emissions based on actual user interaction, this approach will also more accurately reflect the reduction in data transferred when assets are served from the browser's cache.

You can see this in action by loading this demo page for the first time, and scrolling to the bottom. You can open the console to see the total data transferred by this interaction.

Next, scroll back to the top and reload the page. Scroll to the bottom again. You should see that there's a big difference between the reported CO2e on the second load, since the image assets are being loaded from cache. If you open the console you'll see that there's still a small amount data being transferred, but not as much as when the whole images are loaded for the first time.
