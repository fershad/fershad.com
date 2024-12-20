---
title: Are my third parties green? Two and a bit years on
published: 2024/05/01
permalink:  /writing/are-my-third-parties-green-two-and-a-bit-years-on/
summary: >-
  The Are my third parties green? project has been running for over two years
  now. In this post, I look back at the project, and do an analysis of the data
  it's captured.
---

I release [Are my third parties green?](https://aremythirdpartiesgreen.com/) (AMTPG) out into the internet in late January, 2022. It started as a small project to scratch an itch I'd developed after reading the [2021 edition of the Web Almanac](https://almanac.httparchive.org/en/2021/third-parties#prevalence).

Those two years have gone by fast, and AMTPG has grown so much as a project. But in those two years, I've never really stopped to check out the data from the tests that have been run through AMTPG and answer the question that started this project - _just how many of the third-party requests on the web come from green hosts?_. So, with a bit of spare time on my hands I've decided to try and do just that.

## A sprint down memory lane

When I thought up the idea for AMTPG in 2022, I'd begun to shift the focus of my work almost entirely towards the field of web sustainability. I built it as an online tool to scan a webpage using [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) and check the third-party scripts that page loads for green hosting using the [Green Web Foundation's Dataset](https://www.thegreenwebfoundation.org/tools/green-web-dataset/). I covered the stack in a bit more detail in [this introductory post](https://fershad.com/writing/building-are-my-third-parties-green/).

Over the years, the web based tool has run over 4,500 web page checks. Beyond that, it's grown as a project to now include:

- [A Directory](https://aremythirdpartiesgreen.com/directory/) providing detail about the green hosting status for over 2000 third-party providers.
- An API that [powers the directory](https://fershad.com/writing/adding-a-directory-and-api-to-are-my-third-parties-green/).
- [Browser extensions](https://aremythirdpartiesgreen.com/extensions) for Chrome and Firefox

Some of these ideas were in my mind when I started the project, but if you've seen me play Zelda (BoTW of ToTK) you'll know how easily I can get sidetracked by random things that look mildly interesting. It's a wonder any of these things actually did ship, though I'm glad I did! Perhaps it is worth finishing the main quest after all.

Anyway, my Nintendo Switch is out of battery right now so I'm going to finish the main quest of writing this blog post. Onto the analysis of over 4,500 results.

## So, how green are third-parties on the web?

All the results of test run through the online version of AMTPG are stored so that they can be recovered if that specific test run is shared by a user. To run this analysis, I downloaded a dump of all the test results as of April 29, 2024. Results of tests run using the web extensions are not saved, and so are not reflected in this analysis.

- **Total tests:** 4,616  
- **Total identified third-party resources:** 131,086  
- **Total identified third-party resources served from green hosts:** 85,755  
- **Percentage green:** 65.42%

Those are the headline figures from this analysis. It blows my mind that over 4,500 web pages have been tested using this tool. In those 4,616 tests, 131,086 third-party resources were identified 85,755 of which were found to be served from green hosting.

So just over 65% of the third-party traffic on the internet is served from known green hosts.

I came into this analysis expecting the number of be somewhere closer to the 70% mark, just based on vibe. That vibe was mostly centered around the fact that so many third-party scripts are loaded from large CDNs (like Cloudflare and Google), and these show up as green providers when checking the Green Web Dataset.

It's also really interesting to compare this figure to what was surfaced in the [2022 Web Almanac Sustainability](https://almanac.httparchive.org/en/2022/sustainability#third-parties) chapter. In that (much larger dataset), 89% of desktop & 91% of mobile third-party requests were served from green hosts. But when you look at the top 10,000 websites, the figures (desktop 66%, mobile 67%) more closely align to the results from AMTPG.

### Tests over time

Most months the website does between 50 and 200 tests. There was one wild month shortly after I launched the website where it had almost 900 tests. That's the first time I've ever had to pay Google for compute on their cloud platform.

![A bar chart showing year and month on the x-axis and the number of checks on the y-axis. It reads: 2022-1, 114; 2022-2, 109; 2022-3,887; 2022-4, 174; 2022-5, 230; 2022-6, 40; 2022-7, 68; 2022-8, 52; 2022-9, 80; 2022-10, 81; 2022-11, 26; 2022-12, 110; 2023-1, 83; 2023-2, 133; 2023-3, 95; 2023-4, 113; 2023-5, 221; 2023-6, 65, 2023-7, 55; 2023-8, 128; 2023-9, 220; 2023-10, 143; 2023-11, 321; 2023-12, 140; 2024-1, 413; 2024-2, 267; 2024-3, 129; 2024-4, 119.](../../public/img/blog/ec2874f1a39c4a785030eb824abfa45ef11ecf5a-953x441.png "Chart 1: Total tests per month")

[View the chart and data.](https://docs.google.com/spreadsheets/d/1jS9vWHnjLtEg-Lj2N5JstYsbttb_EcKxBqI0fc36Mn0/edit#gid=1654711040)

This next chart shows the total third-party requests for each month. Overlayed on that is the number of results that returned a being hosted on green servers. To visualise this a little easier I've added a line chart showing the percentage of green results as a portion of the total results for each month.

There's an initial dip in the number of green results that appear. I think this is more a result of me not updating the dataset for the website frequently enough during the initial months of the project. In general, the trend pretty steadily sits between 65-75% of results returning as green.

It's worth bearing in mind that the Green Web Foundation's Dataset is regularly updated to add and remove IP addresses assigned to green hosting providers. Some the variance seen below could also be attributed to changes in the dataset over time.

![A bar and line chart showing year and month on the x-axis, the number of third-party results on the left y-axis, and the percentage of green results on the right y-axis. It reads: 2022-1, 4473 total checks, 63% green; 2022-2, 3204 total checks, 65% green; 2022-3, 25899 total checks, 61% green; 2022-4, 6606 total checks, 57% green; 2022-5, 6892 total checks, 52% green; 2022-6, 1076 total checks, 45% green; 2022-7, 1923 total checks, 69% green; 2022-8, 2226 total checks, 65% green; 2022-9, 1876 total checks, 66% green; 2022-10, 3111 total checks, 75% green; 2022-11, 736 total checks, 68% green; 2022-12, 1197 total checks, 79% green; 2023-1, 1804 total checks, 65% green; 2023-2, 2312 total checks, 67% green; 2023-3, 2973 total checks, 71% green; 2023-4, 3673 total checks, 60% green; 2023-5, 7671 total checks, 79% green; 2023-6, 1649 total checks, 80% green, 2023-7, 1250 total checks, 81% green; 2023-8, 6213 total checks, 68% green; 2023-9, 4931 total checks, 74% green; 2023-10, 3689 total checks, 68% green; 2023-11, 8165 total checks, 74% green; 2023-12, 4376 total checks, 68% green; 2024-1, 7725 total checks, 68% green; 2024-2, 5957 total checks, 60%; 2024-3, 4019 total checks, 66%; 2024-4, 5460 total checks, 60% green.](../../public/img/blog/8f953777f9f6d9dc8eefbda4e6dfc43ff38548a1-1177x616.png "Chart 2: Third-party requests found in tests, per month.")

[View the chart and data.](https://docs.google.com/spreadsheets/d/1jS9vWHnjLtEg-Lj2N5JstYsbttb_EcKxBqI0fc36Mn0/edit#gid=1751087428)

### A couple of big ones

I'm not going to callout individual sites here, but out of curiosity I checked on largest single third-party resource and the most number of third-parties loaded on a single page.

- **Largest third-party resource (transfer size):** 13 MB
- **Most third-party requests**: 1,139 (600 green - 53%)

The largest single third-party resource appears to be some kind of mapping service. I'm kinda surprised that the value for that result isn't higher, and that it wasn't a video resource just given how prevalent hero videos still are.

### Breakdown by category

AMTPG uses categorises third-party requests based on data from Patrick Hulce's [third-party-web repository](https://github.com/patrickhulce/third-party-web/). Looking at results by category, we can see what types of third-party request make up the majority of resources found in tests run on AMTPG.

{% capture tableContent %}

| Category         | Requests | Green | Transfer Size |
| ---------------- | -------- | ----- | ------------- |
| CDN              | 14,117   | 90%   | 434 MB        |
| Tag Manager      | 6,773    | 89%   | 275 MB        |
| Analytics        | 12,749   | 71%   | 117 MB        |
| Socials          | 6,442    | 72%   | 161 MB        |
| Ad               | 29,765   | 62%   | 129 MB        |
| Utility          | 11,866   | 78%   | 156 MB        |
| Marketing        | 2,886    | 69%   | 42 MB         |
| Content          | 2,243    | 68%   | 80 MB         |
| Hosting          | 4,936    | 48%   | 308 MB        |
| Video            | 2,579    | 77%   | 117 MB        |
| Consent Provider | 2,056    | 96%   | 32 MB         |
| Customer Success | 1,198    | 40%   | 27 MB         |
{% endcapture %}

{{ tableContent | markdownTable }}

There's a catch-all category of _other_ which I have excluded from the results above.

Looking at these results, a few things stand out.

1. Despite having the most number of requests, scripts for Advertising (ad category) had a relatively small transfer size.
2. The Hosting category, on the other hand has a smaller number of requests but a much larger total transfer size. This is largely driven by website builders like Wix, Webflow, and Squarespace who host assets in their own asset registries.
3. The CDN and Tag Manager categories are dominated by Google and Adobe products which are served from CDN infrastructure that's currently recognised as green by the Green Web Foundation.
4. Likewise for the Consent Provider category. While not dominated by a Google or Adobe sized player, the overwhelming majority are serving content from CDN providers that are recognised as green by the Green Web Foundation.

## Rounding off

Are my third parties green? is a pretty stable little project now. I don't plan on adding new features to it in the foreseeable future, but will definitely continue to update the underlying data periodically.

Going through this analysis has been a fun little exercise, especially as I've been able to get an answer for the question that originally spurred me building AMTPG in the first place. That said, the sample size I'm working with here is rather small. I'd be super interested to see if the folks working on this year's [Web Almanac Sustainability chapter](https://github.com/HTTPArchive/almanac.httparchive.org/issues/3611) take a look at third-party requests in detail. After a year's absence, I wonder if their results might start to align more closely to what I've presented here.
