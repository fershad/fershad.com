---
title: Stress testing site performance
published: 2021/09/13
---

As developers, we're normally building and testing websites on devices with decent specs. That's fine for productivity, but it does leave a lot of room for performance issues to be missed.

The truth is that most people who use the web do not have access to the latest iPhone, an ultra-fast laptop, or even high-speed internet. Heck, they [might not even be using a phone, laptop, or desktop at all](https://shkspr.mobi/blog/2021/01/the-unreasonable-effectiveness-of-simple-html/). Browsers come installed with a lot of low-powered devices - from portable games consoles, to TVs, to fridges. These devices don't necessarily have powerful CPUs to handle heavy processing tasks, and portable devices might be further restricted by weak network connectivity.

Of course, it's next to impossible to test your website for every possible usage scenario. But effective stress testing will greatly increase the likelihood that your site is available and usable to visitors, even in less-than-ideal situations.

## Testing on your device

Regularly testing a web page as you build it is a great way to prevent performance issues from creeping in. However, there's one important thing to keep in mind when running performance tests on your own device.

Local testing tools will often use your device's CPU, GPU and network to run tests. This means that if you're on a souped-up laptop and connected to high-speed internet, your test will be reflective of that environment.

### Have extra testing devices handy

It's always worth keeping some older devices handy for testing. Not only is this good for performance testing, but it also [helps reduce e-waste](https://www.siliconrepublic.com/enterprise/gerry-mcgovern-digital-pollution-e-waste) by extending the useful life of those devices.

Personally, I've taken over my girlfriend's old 2012 MacBook and iPhone 8 to use as testing devices for iOS & Safari. Despite also recently upgrading to a faster laptop, I've held onto my Surface Pro 6 to serve as lower-spec laptop testing device.

Of course, this solution is possible for everyone. Space, budget, and access to devices can all get in the way.

### Apply throttling to your tests

Another way to test site performance during development is to use your browser's DevTools. Once again, though, these tests will all be run using your device's own CPU, GPU and network. Throttling is one way you can turn down the speed of your processors and network to simulate how your site performs on lower spec devices.

If you're checking requests in the Network tab, you can apply Network throttling to get a feel for how requests come in over slower networks. You can also disable caching, allowing you to experience the site as a first-time visitor.

The same applies in the Performance tab. Here you can also apply CPU throttling, to simulate how processor-intensive tasks may perform on low-powered devices.

Finally, if you're using DevTools to run Lighthouse audits then be sure that you've enabled the _Simulated throttling_ option which will apply network and CPU throttling to the tests being run.

{% callout "Note" %}
It's worth noting that network throttling here will slow down the download time for assets, but TCP/SSL connections will not be slowed down. This is important to keep in mind if you've got a lot of third-party resources coming in.

TCP/SSL connections add about a second to requests and in the real world will be impacted by slow network conditions.
{% endcallout %}

## Going further with WebPageTest

[WebPageTest](https://webpagetest.org/) is an insanely powerful tool for understanding website performance. WebPageTest allows you run tests from different locations, on a wide range of devices (some real, other simulated), alongside applying network throttling and a host of other settings.

When working with WebPageTest, I strongly recommend using network settings that are a few notches down from what you might expect your average user to be on. For example, if you're testing the desktop version of your site, then run a test using a 4G (or even Fast 3G) network connection just to simulate how it might feel for someone that doesn't have fast cable internet.

Another huge benefit of using WebPageTest is that it allows you script clicks and navigations into your tests. This means that you can test performance of page navigation, or even simulate a user journey while collecting performance metrics at the same time. It's a bit too much to get into right now, but if you're interested here's [some documentation](https://docs.webpagetest.org/scripting/) to get you started.
