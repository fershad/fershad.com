---
title: "Readle - App Optimisation & Consultancy"
published: 2021/05/18
---

I've cut my teeth in website-related performance and optimisation. So I was a bit reluctant when [Christian Schraeder](https://www.linkedin.com/in/christian-w-a04742122/), the founder of [Readle](https://readle-app.com/), reached out for my help on their native mobile apps. I'd never worked on a mobile app before and wasn't too sure if I'd be able to help. To his credit though, Christian was very persistent. In the end, I agreed to take a look at the app.

As it turned out, a lot of my knowledge of website performance and optimisation enabled me to identify key areas for improvement within the app.

Christian and I know each other from a previous life when we both worked in the Marketing team of a Taiwanese software company.

{% callout "Disclaimer"%}
This post includes some affiliate links for products/services.
{% endcallout %}

## Readle App - Background

### What is it?

Readle is a language learning app available on both [iOS](https://apps.apple.com/us/app/%E5%AD%B8%E5%BE%B7%E6%96%87-hello-german-%E6%9C%89%E8%81%B2%E5%BE%B7%E8%AA%9E%E6%96%87%E7%AB%A0-%E5%8D%B3%E6%99%82%E5%BE%B7%E6%96%87%E5%AD%97%E5%85%B8/id1483552317?ls=1) and [Android](https://play.google.com/store/apps/details?id=com.hello.german). Rather than simply giving learners a list of vocabulary to memorise, Readle delivers a [more immersive experience](https://cwschraeder.medium.com/why-i-started-readle-the-first-graded-reader-to-learn-german-a265471a5204). Across over 500+ short articles (all with audio) language learners can expand their vocabulary, test their comprehension, and track their progress.

### Great app, but a bit slow

When Christian first asked me to help his main concern for the app was speed. Readle was seeing steady downloads growth and new user acquisition. At the same time, they were also receiving a growing number of complaints from users that interactions within the app were frustratingly slow - especially in East Asia, and the US.

The biggest source of speed-related user frustration came from slow response times when users selected words to learn. Christian was keen to address these speed issues. He knew it was important to his plans for expanding the app and continued growth.

## Initial assessment

After a quick onboarding and introduction to Readle's globally distributed team, I started diving into the app. My initial aim was to identify and prioritise the areas within the app that might be contributing to slowness. Two things stood out:

- **Response times for data requests** - Requests for data inside the app were being sent back to the origin server on every request. This created around a one-second roundtrip as the request was made, after which the data was downloaded. This happened each time an article was opened, a word selected, or an audio clip played.
- **The size of data being returned** - The data being returned by these requests, especially on the initial app load, was a significant chunk of JSON data. Downloading and parsing this data slowed the initial app load time. The same was found when articles were opened, with surplus data being sent down the line.

## Improving app speed

Working alongside [Marcel Kipp](https://www.linkedin.com/in/marcel-kipp-6011691b5/), Readle's app developer, we set about the task of improving the speed of key areas. We focused on the following parts of the app:

- App launch
- Opening articles
- Selecting words

These are the three actions within the app that users will regularly make, especially new users trying the app for the first time.

### 1.5 seconds faster app launch

After going through the JSON data for the app launch, Marcel was quickly able to identify which fields were surplus to requirements. Making the changes to remove these fields from the response presented the opportunity to create a new API that would better facilitate Readle's growth in the future.

In addition to sending data that wasn't required, the app was also requesting data for 100 articles when it launched. The data, however, was only used on the app's home screen. This was way more articles than would be needed, so we agreed to reduce it by half.

#### The results

Our efforts saw a massive reduction in the data being received on app launch. What was originally about 37,000 lines of JSON had now become just 600. In terms of kilobytes being sent, we went from over 100kB to less than 10kB.

This all added up to a **1.5-second reduction** to the app's initial launch time.

### Reducing data for articles

We undertook a similar process for articles data. Again, Marcel was able to reduce the data being sent and consolidated most of it into a new API. The savings here were not as large as for the app launch. We took about 2kB off the data transfer. This didn't directly improve the load time of article content but set us up nicely to start reducing the response time for requests.

## Faster content delivery with Cloudflare

With data sizes reduced (and a new API to boot!) it was time to tackle response times. With every request being sent back to the origin server, responses were taking around 800 milliseconds to be returned (that's before downloading the data). This was a large source of frustration for users who were otherwise really enjoying the app.

We looked into a few possibilities to get this time down. We discussed an approach that would use a distributed database to better serve users around the globe. After some investigation, we decided to go down a different route - to cache as many of the requests as possible.

Since Readle publishes new content every day, we decided to use edge caching to achieve better response times. Requests on the app were already passed through the Cloudflare network, which meant we could use Cloudflare page rules to set edge cache durations for different request types.

#### The results

Setting up edge caching on Cloudflare's global CDN allowed us to achieve improvements across the board. The most telling improvements were seen in the time taken to display story and word content to users. Once data was cached (after the first visit by any user), we saw:

- A further 1-second improvement in app launch time
- Story content ready for the user in under 200ms
- Word content shown to the user in under 200ms
- Audio content ready for playback almost instantly

With the changes in place, we also started seeing positive app reviews - especially from users based in Asia!

## Client testimonial

> Numbers tell more than words: As a result to his involvement and actions, the time to first byte when starting the app was cut by 75%. This had an immediate impact on user satisfaction and revenue.

[Christian Schraeder](https://www.linkedin.com/in/christian-w-a04742122/), Founder of Readle App

## Serving images in milliseconds

The one other significant change we made in the app was centred around image optimisation. Originally, the content creators at Readle would manually run images through an optimisation tool and then upload the resulting JPEG file. Automating this process would allow us to free the content editors of one task, as well as enable better image optimisation and delivery.

After looking into some options that could have seen us put image optimisation into Readle's backend CMS, we opted instead to use [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dyg8fkjzrzhfeiqce9nl). This enabled us to:

1. Optimise images
2. Deliver images in the best format (JPG or WebP)
3. Cache images on a global CDN (speeding up delivery to the user)

[Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dyg8fkjzrzhfeiqce9nl) has a generous free plan which was ideal for us. Making the change was easy using Cloudinary's API, and we started seeing results instantly.

#### The results

Testing on an Android phone, images were being served using WebP format. Total image file size at launch was reduced by around 100kB. Response times for image requests also fell by 600ms on average.
