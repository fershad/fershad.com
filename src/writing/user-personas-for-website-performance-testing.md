---
title: Creating user personas for website performance testing
published: 2022/03/29
---

In a past life, I worked in product marketing. One of the things our management would regularly ask us to do was to research and create user persona. These personas would form the basis around which would we write and craft the marketing materials for our products. In the same way, it helps to have some baseline personas on hand when looking at doing performance testing on a website.

The global nature of the web allows companies to target international markets that would otherwise be inaccessible to them. That’s where these personas come in really handy. They allow us to have different baselines for users in different parts of the world. This, in turn, allows us to conduct more realistic performance tests.

## The web isn’t the same for everyone

Not everyone’s experience of the internet is the same. Hardware, software, and network conditions different greatly across the world, and even within countries. Some of your website’s visitors will be on high-speed connection, and new laptops. Others experience it on less powerful Android phones with mobile internet. Some of your users may be using the internet on limited or capped data plans.

So, with all this variance how can we use personas to set hardware, software and network baselines to use when running website performance tests?

## Approaches to creating user personas

There are a few approaches we can take to get an understanding of the conditions under which users in different parts of the world visit our sites. At the heart of each is a need to understand:

- What device are they using?
- What’s their internet connectivity like?
- What browser are they using?

### User interviews

If you have access to customers, or users, from different parts of the world then you can ask them these questions directly. This can be either in the form of surveys, or direct interviews.

### Website analytics

Your website’s own analytics might allow you to filter data to answer the questions above. Most services allow you to filter visitors by country, and get general information about the browsers and device types (desktop, mobile, tablet) they are using. Ideally, we’d like to get more detailed device information like brand, model, and/or operating system.

### Conduct your own research

There’s enough data out there that should allow you to create an “average user” persona for visitors from almost any country. This does take a bit of extra time and effort, but it is definitely worth it.

#### Find out the average device

Looking at mobile operating system market share is one way to get a feel for the types of devices that are more common in a given country or region. StatCounter Global Stats’ [Worldwide Mobile Operating System Market Share](https://gs.statcounter.com/os-market-share/mobile/worldwide) is a great way to find this information. Data is available globally, by region, and by country.

#### Understand network conditions

There’s a bit more data available when we’re looking to get a feel for network speeds in another part of the world. [Cable.co.uk](http://Cable.co.uk)’s [Worldwide Broadband Speed League](https://www.cable.co.uk/broadband/speed/worldwide-speed-league) presents median broadband internet speeds at both the country and regional level.

If you’re focused on mobile experience, [GSMA’s ‘The Mobile Economy’ reports](https://www.gsma.com/mobileeconomy/#trends) are available for different regions, and present a breakdown of mobile technology adoption per country. These reports also include projections for technology adoption for the next few years, making them handy for future planning.

#### What browser are people using?

Once again, StatCounter Global Stats has our back here. Their [Browser Market Share Worldwide](https://gs.statcounter.com/browser-market-share) dataset contains browser market share data by country, and even platform.

## Using personas for a performance test

Now that we’ve created a few personas for different users around the globe, we can start using them in website performance tests. Probably the best tool for this type of testing is [WebPageTest](http://webpagetest.org/). Using WebPageTest’s Advanced Configurations panel we can set:

- **Test location**: Pick one in or close to the country you want to target
- **Browser**: Choose the desktop browser or mobile device you want to test on
- **Connection**: Set the network conditions for your test

Remember, the profile we’ve created is a baseline. You can adjust the preferences to test for slightly better or worse conditions.
