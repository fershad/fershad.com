---
title: "The Week in Green Software: Open Data with Fershad Irani"
published: 2023/08/12
---

A couple of weeks ago I had the pleasure of jumping on the Environment Variables: This Week in Green Software podcast with Chris Adams. I work with Chris at the Green Web Foundation, but it was fun to nerd out about news across the sustainable tech space on the podcast.

You can listen to the podcast here: [https://podcasts.bcast.fm/e/vnwrxy28-the-week-in-green-software-open-data-with-fershad-irani](https://podcasts.bcast.fm/e/vnwrxy28-the-week-in-green-software-open-data-with-fershad-irani)​

Below is a transcript of our conversation, and links to the articles and resources we talk about.

**Chris Adams:** Hello and welcome to Environment Variables, brought to you by the Green Software Foundation. In each episode, we discuss the latest news and events surrounding green software. On our show, you can expect candid conversations with top experts in their field who have a passion for how to reduce the greenhouse gas emissions of software.

I'm your host, Chris Adams.

Hello and welcome to another episode of The Week in Green Software, where we bring you the latest news and updates from the world of sustainable software development. I'm your host, Chris Adams. In today's episode, we're looking at open data about how green the power we use is, the wonders of HotCarbon, some cool new projects from the cloud native computing foundation and the Green Software Foundation, and a really cool technology called gzip.ai. Finally, we have some fantastic opportunities for you to be part of the Green Software Foundation because they're hiring. But before we dive in, let me introduce my guest today, Fershad Irani, an independent web sustainability consultant and maintainer of CO2. js. Fershad, I'll hand over to you to introduce yourself, if that's okay.

**Fershad Irani:** Cheers, Chris. Thanks, man. I know you've been trying to get me on this podcast for a while, so it's exciting to be finally here. Yeah. Hi folks. As Chris mentioned, my name is Fershad Irani. I'm a web sustainability consultant and I live in Taipei, Taiwan. Most of the time I spend these days is working with Chris and a bunch of other amazing people at the Green Web Foundation.

I think I've been over... It's over a year now, hasn't it, since I've been there, Chris? Or close to.

**Chris Adams:** I think it has been indeed. Yeah.

**Fershad Irani:** Yeah, during that time, we've, we've done a heck of a lot, I think, um, doing a bit of writing and a bit of coding. Chris did mention co2.js, which is where I've spent a big chunk of the last year. It's an open source carbon estimation library.

I think Chris has mentioned it once or twice on this podcast, just snuck it in there. It's been really cool watching that project grow over the year and now it's being picked up by some other quite large projects itself, such as the Mozilla Firefox browser and web page test, which is just mind blowing to think that some code I've written is in those projects.

But outside of web sustainability, I do have a bit of a life. I help organize and play in a local touch rugby, or touch football for all the Aussies out there. We have a group here in Taiwan and we play weekly and try and send teams internationally whenever we can.

**Chris Adams:** Cool. Thanks. Thanks, Fish. Oh, and I'm calling just for context when we work together, Fershad said Chris, you can call me Fish instead of Fershad. So if I call Fershad Fish at any point, it's, it's basically just, uh, a, a shortened version of the, of his name that he's comfortable with us using. All right.

So that's who I'm referring to when I ask. What do you think, Fish? I do not have any actual Fish in, uh, the podcast today.

**Fershad Irani:** Cat's out of the bag.

**Chris Adams:** Yeah. Yeah. Actually, is the cat also in the room as well? Like we, we gonna have a incursion from her today.

**Fershad Irani:** She likes her video calls, so she might jump in on this one. Eventually, it's food time at the moment.

**Chris Adams:** All right. So we may have a third guest as we record today. All right. I should just briefly introduce myself before we start. I mentioned my name is Chris Adams. I am the executive director at the Green Web Foundation, which is one of the member organizations of the Green Software Foundation. The Green Software Foundation, I work there at, as the chair of the policy working group, and that's basically the thing I'd probably share with you now, actually.

So I think Fish. I guess we should probably start looking through, you're familiar with the format. So should we do the usual thing of running through some of the stories that caught our eye and then basically share a bit of context for them?

**Fershad Irani:** Let's go, mate.

**Chris Adams:** All right. Okay. So I think what's the first story that we have here was actually a story from Electricity Maps.

They're one of, they're another member of the Green Software Foundation. And earlier on this month, they released some open data and like a significant amount of open data, actually. Fish, I might let you start on this one because there's, I think it's worth people understanding why this is interesting and it might be worth you sharing some of this because you've worked with a number of different providers of carbon intensity data now.

**Fershad Irani:** Yeah, this data that Electricity Maps has released is just a huge data dump from 2021 2022. You have almost 55 countries in their data set and it's just such an awesome amount of historical data with so much granularity, not only yearly data, which we're used to working with most of the time, but now to have monthly, daily, hourly historical data available for free.

That's something that's really going to be handy for a lot of people building out tools and analysis around carbon emissions and all that type of stuff. Yeah. Until now, for the most part, we have been working with annual. grid intensities, like the data that we've got from EMBA and we've put that into co2.js in the last year.

I can't wait to play around with, with this data set and see, um, what we can get in there in the future from monthly, daily, even hourly figures if we're able to. They do say that they are going to release 2023's data. I'm not too sure when.

**Chris Adams:** So as I understand, this is basically a push to essentially increase the floor of data quality that is available in the public domain for people to use so they can, Oh, there's our cat coming in. Yep. The goal is to increase the level of data quality as a floor so that rather than only having to use annual data, which often occludes and hide some of the information to provide a much higher resolution. So for example, you can see if you're going to like decide to move computing jobs to different parts of the world at different times, you can see the impact of this. The other thing that's also interesting about this is that it's actually released using the open database license, which means that you're able to build on this commercially or use it in all kinds of projects.

Now, what I have done when I found out about this is I had a go at this and I've used a tool called Observable, which makes it really easy to build little tools, little exploratory notebooks. And we've got a couple of links to essentially the hourly carbon intensity data for a series of countries that we found.

So we've got one for Germany and Finland, but basically they have one for almost every single sub grid in America, which is what people might refer to as balancing authorities in America. And this is cool because I think one of the things that I realized when I started playing with this data is that this lets me see, okay, if I did a bit of, if I had a computing job last year, where else could I run at the same time?

Or where could I move that to? over the whole kind of geographic space and time last year to see how I could have reduced the emissions for that. That's something that I haven't really been able to do before. And it's nice to see this. The other thing that is worth bearing in mind is that this, there is a commitment from the organization, Electricity Maps to publish on a yearly basis every time going forward.

So at the end of 2023, they'll be publishing the data from 2023 as open data for anyone to use. And you're able to use the data real time from them. Basically as a commercial product, right? And that's essentially what you can see this being used for. It's a way to increase the data quality used for the last year.

But if you want to do something real time, then you may need to use electricity maps or what time or some of the other tools, depending on what your specific use cases, but this being out is a really cool thing. I'm really happy to see it.

**Fershad Irani:** And just on that last point, like, we do need more of this and as much of it as possible to be open source in terms of monthly, daily, hourly emissions data. And if that can come from governments or from other private entities, that just helps all of us in this space. Like it, it helps drive decisions like you were saying about.

Carbon aware computing and stuff like that that also helps improve the accuracy and transparency of the carbon estimates that we're producing it that we're going to start relying on for reporting and other legislation that comes in the future.

**Chris Adams:** Yeah, like, I feel this is quite useful because this publication, if you're looking at the carbon intensity of anything you did last year, you've basically gone from, essentially you made something 8, 760 times more accurate because you've actually got hourly figures for this stuff, which has been really hard or really expensive to get access to previously in this kind of way.

So that's cool. I don't think that's worth bearing in mind is that you have to ask yourself, how many times do you need to pay for this data? Because you may not be familiar with how kind of literature grids work, but in many parts of the world, there is a small levee that's put on to that's built into the kind of basically hourly rate you pay for any power is usually between 20 to 10%, a lot of the time, which is essentially allocated to potentially funding a transition to renewables for this stuff. And this information is collected anyway for this. So the idea that it's actually visible and that it's available in the public domain is a really good thing and really long overdue. So it's nice to see this. So yeah, good news story. We've shared a link to the data portal and it's free for anyone to use and fetch the data from. And hopefully we should see this turning up in places like the CarbonAware SDK and any other tools like CodeCarbon and so on, so you can start making more responsible decisions about when and where. You run any kind of computing jobs.

Let's look at the next story. The next story is about HotCarbon, which is a online conference, online and hybrid conference that's initially based in America, but the cool news is that it's basically sustainability, ICT, nerd Christmas, there's a bunch of really good papers that have been released, and there's also now the recorded videos of all the talks from this.

And if you are trying to find out what the state of the art is. in discussions around digital sustainability. This is one of the places to look for the kind of technical discussions about this. And there's a couple of talks that I think both Fish and myself have really caught our eye. Fish, I'll let you go first.

And then I'll come in with my one actually, because I think there's one that you. Quite liked, right?

**Fershad Irani:** Yeah, my one's actually from last year's HotCarbon. There's actually a paper from Romain Jacob and Laurent Vanbever, both from ETH in Zurich. And in last year's HotCarbon, they published this paper, which is just, it's got just a beautiful name, if anything else, The Internet of Tomorrow Must Sleep and Grow Old.

And that was, I think the very, probably the first, if not one of the first times that I've personally really started thinking about with the data transfer is the best proxy for website carbon emissions and how we calculate them that kind of began a rabbit hole for me and I'm still going down that rabbit hole as I think a lot of us are. But it was really interesting and presented some of the the ways that networks operate and function presented that really clearly and the video for that is is a really good short 20 25 minute watch I think it is but they've also got a paper this year with kind of a less pretty sounding name, but Chris, you want to talk to that one?

**Chris Adams:** Yeah. So first of all, before I talk about this one in particular, I'll just let people know that last year we did an interview specifically with Romain Jacob about the paper that he shared last time. So we will share a link to that to go into more detail about it. But the general thrust of the paper from last year.

Was that the internet is basically provisioned in its current state for availability above all else, which means there's lots and lots of the time we've massively over provisioned for it. So big, it's like having the biggest possible computer you can imagine just for when most of the time it isn't actually used that much.

This time, he's actually, Romain Jacob is the, one of the lead authors, along with Jackie Lim and Laurent Venbever, I think, from ETH Zurich. They're talking about, are there ways to do something about this? And it's not such a poetic name. But the general thrust of this paper is that given that we know that most of the time we're not using the entire capacity of the internet, is it possible to kind of power down parts of it as it were, is it possible to make parts of the internet sleep so that you can make meaningful reductions in the energy usage and as a result, the carbon footprint of this stuff.

And the argument basically is that yes, you can do some things like this. There are savings in the order of tons based on looking at a open data set from OVH called the weather map data set where OVH, which is another cloud provider have basically shared the traffic that they have running inside their own networks.

And they basically explored this and said, given what we know about how the internet is used and what kind of usage patterns we have, is it plausible to selectively power down parts of the internet and still maintain like the same level of quality of service basically. And it's super nerdy. But it's a really nice cool paper and it's a fun read.

It's one of the first times I've seen people actually work with real data from a real organization, because one of the thrill struggles you have is actually having access to this information. So this is really cool to see this. There are other more ones. There are many more papers as well, but I think what we might need to do is run through the list and see if we can get some of the people from HotCarbon at 2023 to speak about this, because there was a number of really exciting looking papers and there is 20 videos and 20 papers to read through.

So if you want to. Basically see what's happening at the real cutting edge. That's a place to look.

**Fershad Irani:** Just to be sure that HotCarbon's already happened, right?

**Chris Adams:** Yeah, it happened a couple of weeks ago, but the videos were literally published. I think last night or two nights ago or something like that. So there's a bunch of, that's the place to look.

**Fershad Irani:** So hot off the press.

**Chris Adams:** Yeah, absolutely. HotCarbon, hot off the press indeed. And if you want something even hotter, there is a mailing list called the E Impact mailing list, which I'll share a link to, where there are ongoing and robust conversations about all this stuff here.

So Fish, you spoke to this idea about, okay, is data transfer a good proxy for understanding website carbon emissions or anything like that? That's the place that I am usually following to see what the conversations are, going back and forth on that stuff. And it's a really useful place to learn from essentially world experts for free about what's happening there.

**Fershad Irani:** Do you want to do a spicy take and give an answer to that one? Is data transfer the best proxy for website carbon emissions? Chris Adams.

**Chris Adams:** I'm not going to have a spicy take on this one yet, because I'm still trying to figure this one out. Because I feel that there's lots and lots of evidence that basically shows that the network part doesn't change all that much based on what you send over the wire. So you can make the argument, rather than thinking about it like a kind of road and cars driving, it might be more useful to think about networks as like a cycle lane where you have people using it.

So. You know, if you in aggregate, look to all the people cycling on a cycle lane, you might see a small change in usage, but you're not going to see a massive changes if you had like loads of cars driving along it. And I think this is an issue of us having mental models or not the correct mental model when we think about this stuff.

That's about as spicy as I can really take. Cause I don't think I know enough about it, but Fish, we should probably share a link to your piece, because this is one thing that we've had. Bunch of time talking about with both implementing the sustainable web design model in co2.js, but also because there's a whole separate discussion about this, both at a regulatory level, but also in inside industry with actually the sustainable web design model specifically, there's a whole bunch of work going on there that I suspect you might have some reckons on or something you could share on there actually.

**Fershad Irani:** Yeah. And I think it's also worth noting that there are other methodologies for estimating website carbon emissions or digital carbon emissions out there that don't use data transfer necessarily as their proxy. And they use other things like time on device or they try to measure the actual usage of a device, which is something that you can also do these days in.

The Firefox web browser, which is super cool. And I'm with you. It's something that we're all learning as we go. And there's more research coming out about it for now. Data transfer is the best we have, but with what's in Firefox, hopefully other browsers can implement that type of technology as well. We can start to see some real world data that we can then base some of our estimates and assumptions off.

And we can then work with that.

**Chris Adams:** There is one thing that I would wish for, if we could see something like this for HotCarbon 2024, this whole paper here is based on the willingness of one organization to share some data about how a network is working so that it can form basically a public understanding of where the real impactful decisions and interventions are possible can be made when we think about greening software, right?

We know that browser makers like Firefox and Chrome and Microsoft Edge, they have all this telemetry information about how their browsers are being used because they use it to improve the products, right? If there was a way to share a suitably safely prepared data set, which was a representative sample of how websites and things were used, it will be so useful for us to actually understand this.

And now that we've done a bit of work with say Firefox, for example, we understand that these numbers, they can be collected and they can be used because. If you're using Firefox now, you can basically turn on the Firefox kind of profile and you can see right down to the process or thread level, what the energy impact of various parts of the page are.

And we know that some of this stuff is essentially presented in telemetry to inform product decisions. If you had organizations sharing some open data around this, it would be such a help for understanding what the things are. What the most effective interventions would be for impacting website for carbon figures but right now we don't have that yet, but it's the thing we could hope for. And who knows, there's a year now for it. So fingers crossed, eh?

**Fershad Irani:** HotCarbon 2024.

**Chris Adams:** Yes. All right. Should we move to the next story fish?

**Fershad Irani:** Let's go.

**Chris Adams:** This one is a story from a character, someone called Assaad Razzouk, who is, I think he's actually based in Singapore.

And he's one person who runs a podcast called the Angry Clean Energy Guy, but he's actually has a background working in this field. I basically wanted to share this cause I found this really interesting specifically because when you speak to people who are thought leaders in the kind of world of cloud and sustainability in cloud, one of the recommendations that you'll hear people say is, please don't run things in Southeast Asia right now.

Because the energy is really dirty and it's really hard to do that and because it's so hot, it also means that even the computing that you do run, there's going to be a massive amount spent to keep the computers from glowing red and overheating rather than actually doing your computing. And this is the first time I've seen where someone saying, no, there's actually some changes taking place there's been massive investments, particularly from Singapore in some of the surrounding areas, to make some changes to this. So while we've seen the energy transition move quite quickly in China and to an extent, Europe and America specifically with the IEA, you're now seeing some signs of this in Southeast Asia as well, which hopefully means that computing will be getting greener over time.

And Fish, I know that you initially came from Australia. So I figured I'd share this link here from Grok Ventures and Quinbrook, basically the story about connecting Australia to Singapore to provide a punch of clean energy through this actually.

**Fershad Irani:** Yeah, I'll, I'll be a bit cynical, as any good Aussie should, and um, just say, this is something that I've heard mumblings of doing something like this for, I think, over 10 years? Since, yeah, before I moved here to Taiwan, and for the last 25, 30 years people have been talking about high speed rail along the east coast of Australia, and that's still not there.

This is a really cool idea, and something definitely that, when you look at a place like Singapore,

**Chris Adams:** Hmm.

**Fershad Irani:** It's small, they've got land constraints, they can't just suddenly put up a whole bunch of solar, they can't really put up a whole bunch of wind because it's a major shipping channel and a lot of planes come through there as well.

They need to be looking outside to import energy, and they've got Indonesia, Malaysia pretty close by. It's good to see that Singapore is doing some investment outside of their own borders in clean energy. As someone who lives there, Asia, has got a way to go in terms of being green. But the potential is there. We sit on this thing called the Ring of Fire, and it's an active geothermal hotbed. I've got hot springs 20 minutes by car from my place. There's potential there for, for geothermal beyond just using solar and, and wind. So Asia does have that possibility of being a, a green hub for digital sometime in the future.

**Chris Adams:** Do you know what I actually totally forgot about the whole Pacific Rim Ring of Fire stuff, because there was an announcement, I think two weeks ago or last week from Microsoft, them basically breaking ground on a massive geothermal project for some of the data centers in New Zealand, specifically for this.

So yeah, that's actually a useful, interesting perspective. I didn't think about that actually.

**Fershad Irani:** Let's move on to the next story, which is from the Green Software Foundation and one of the brainchilds of Adrian Cockcroft. It's about introducing a specification for real time carbon intensity. Chris, I think you'll be able to speak a bit more to this, but from my understanding, what this is all about is aiming to set a common way for data centers to report on energy and emissions, preferably in real time.

And I think that's something that would be useful for a tool like Cloud Carbon Footprint, wouldn't it?

**Chris Adams:** Yeah, first of all, it's really cool to see this proposal go ahead because essentially one of the struggles you have is even if you're using, say, Microsoft, Amazon and Google, you're running, you're trying to run the same computing load between these three, it's almost impossible to have any kind of meaningful comparison between these things because they all measure carbon in slightly different ways and include different things, whereas other ones don't now, what It's basically been proposed here is there's actually two things.

So first of all, there are different ways of measuring. And also the figures that you see are not particularly actionable a lot of the time. So the resolute, the information you will usually come a few months later rather than in real time or anything, or even the same half hour, basically. Now what's been proposed here is essentially a way to talk about minute by minute metrics that a cloud provider would make available so that you can actually make informed decisions about when and where, or what kind of computing jobs you choose to schedule, or even which providers you're going to choose to use compared to other ones. Now I've read through the proposal and it's really well thought through and one of the reasons that people have said that they can't share this information before is that cloud providers basically will usually will say. We can't share this data because there's a security issue related to this. And Fish do you remember when we did some work with Firefox, we had something like this because one thing we learned when we were trying to get some high resolution figures for the browser, one of the solutions was we could get these figures, but you would need to run Firefox as root, which might not be a good idea for people to be doing that.

And essentially what the thrust of this points to is that if you keep the resolution at minute by minute level. Then you're no longer disclosing any kind of dangerous information that might help an attacker, but it also provides sufficient resolution for you to make much more informed scheduling decisions as an operator.

But also you actually get some consistent ways to make comparisons between different providers of these services. So this is my view is something that is really overdue and to see someone who's actually fleshed it out quite well, and actually thought about lots of the issues and how this relates to some of the weird aspects of how people count energy is green with certificates and so on.

There's really good news and it's also. Interesting to see that you've got groups like the cloud native computing foundation getting involved or have it expressing interest as well. I think this is long overdue and you're right. Tools like cloud carbon footprint could presumably could in theory consume this kind of information if it was exposed by the providers, because right now they have to use models and guesswork based on the billing data, which is much less useful than getting direct figures.

It also means that any other cloud provider who, which is not the big three could also share this information. So you could finally have some meaningful ways to make meaningful comparisons between them.

**Fershad Irani:** And that's something I didn't think about when I first read it, but it actually really good like pardon the pun, but this turns the heat up on those or has the potential to turn the heat up on those big cloud providers and gives people a chance to, like you say, compare them on their carbon footprint.

They might even need to start competing on carbon footprint because that's going to be important in the future.

**Chris Adams:** This is exactly it. This makes some of this possible. And it also means that new entrants can actually start sharing these numbers. So you could compete on transparency to provide these numbers as a way to help customers make the responsible decisions that are currently really difficult to do. Or you could even plausibly build this into some of the tooling so that it's just part of how Kubernetes works or part of how maybe even Docker might work for example. This is actually, in my view, really exciting. And I'm really curious to see where it goes next, actually. All right. I think we've spoken about that quite a lot.

Should we look at the next one. This is the IEA. So the IEA, Fish, I'll let you speak a bit about this one here. Cause this is the International Energy Agency.

They've updated their data set, their, their information about data centers for 2023, this, this is the resource that is almost always cited as the authoritative figures on what the environmental impact of the tech sector is or how much energy it uses. And if you want to cite any numbers, these are peer reviewed and generally pretty reliable numbers you can refer to.

They're safe ones to use. And yeah, they're pretty eyeopening. Aren't they Fish?

**Fershad Irani:** Yeah. Firstly, it's good to see this data being updated. It's not so good to see some of the figures that are coming out of it. But like talking about data centers, the big three plus plus Meta. One of the things that struck me from this report was that from 2017 to 2021. So that encompasses some of the COVID years.

The report says that there was a doubling in the amount of energy consumed by those four providers. It also then goes on to say that it expects there to be moderate growth for the next few years. I really hope that their definition of quote unquote moderate isn't another doubling because then we're going to be in serious trouble on the data center front because that's a lot of energy to be consuming.

I think in the report it says somewhere around 1. 3% of total global like energy use or something. And that's without including cryptocurrencies, which is a whole other ball game. I think they've steered clear of it in this report.

**Chris Adams:** Yeah. As I understand it was broken out separately because it's generally considered not part of the existing economy for this part. And also we're not going to talk about cryptocurrencies on this because the less said about them, the better. But generally speaking, this is one of the first times you've seen these figures broken out like that, because typically what you've had people talking about is the actual energy usage staying more or less about level for the last, say, 10 years or so, but what this really highlights is that this has stayed level because we've had a massive concentration of usage to a very small number of providers, as opposed to having a large number of maybe less efficient providers.

There are some good signs of that in terms of in absolute terms, the figures are not growing as much as they could be, but it also means that we've got this massive concentration of, we've got all this consolidation, which has other impacts in terms of, okay, how easy is it to then pass all kinds of policy as a result for this, to move things away from being level to going down rather than going up.

And this is the thing that we'll see coming forward, basically.

**Fershad Irani:** And I think on that thing, just like one thing that I can't possibly see it going down in the future is like just the amount of volume, the amount of internet traffic that is there. There's a number in that report for 4.4 zettabytes of internet traffic in 2022, which is, I don't even know what that number is, man.

Like it's just mind bogglingly big.

**Chris Adams:** a zettabyte, right? I'm just, if I can find the figures for that, it's. Good Lord. So there's 21 zeros behind it. Yeah. If a million is like three, six, that's seven. So yeah, that's 20. That's a. A very large number. That's an incomprehensibly large number, but

**Fershad Irani:** That's mental.

**Chris Adams:** yeah, that's one of the issues that we struggle with.

Okay. So this at least gives you an idea of where the most recent current data is that you might refer to. Okay.

There's maybe one more story. Then we'll look at what else is going on in terms of jobs and things going out there. Fish, this is one I just want to point people to, because I've seen quite an interest in the Cloud Native Computing Foundation.

There's a new thing called the Green Reviews Project, which has come up. And, uh, I'll just read the kind of blurb on this because this, in my view, looks cool. Basically, the Green Reviews Working Group helps CNCF projects assess and improve the cloud native sustainability footprint. So the idea of this, as I understand, is to start integrating sustainability reviews into how projects are maintained and run so that you get an idea of just bringing up the floor of competency on projects.

So people have some way to talk about this and think about it. And essentially consider these as requirements in the same way that you might look at other things as requirements. This is interesting in my view. I was quite excited to see something like this. And there's a couple of links of what this looks like in practice with, I believe, the Falco project.

And a couple of other ones there. So yeah, interesting to actually see something like this happening. This looks like it's going to be merged in the next week or two and a working group, the kind of technical architecture working group for this. And yeah, I was quite excited to see this actually land.

**Fershad Irani:** And that's a really good way of making sustainability or sustainability considerations a regular part of a process and a way of doing things. That's rather than it being its own separate silo that might get looked at, might not get looked at. If it is part of the regular process that everyone has to go through, you're going to see more traction, more movement in the right direction, which is good to hear.

**Chris Adams:** Yeah, I think it'd be really useful to actually have a chat with some of the CNCF folks on this, maybe they can come on the podcast and talk about a, how this happened and what this looks like, because we are now seeing various open source projects or groups starting to essentially start, create their own groups for this.

So WordPress has one, Wagtail has one. This is one, which is, seems to be across some, a number of all the projects in the CNCF, the Cloud Native Computing Foundation. So there's a bunch of stuff going on there. So yeah, this, in my view, this is quite exciting, actually.

All So the final thing, this is a little bit like we shared last week. If you are looking for work, the Green Software Foundation is actually hiring for a technical project manager and a content project manager. So these are funded positions that are available. You look at and it's, and you can apply with links that they have there.

So there's, that's what's going on there. Okay, so we're just coming up to the hour for this show, and, uh, we normally have a kind of easy question to round this off. Now, Fish, I know that you've been doing a bit of travel away from Taipei and you've just come back, so I figured I'd ask, what's the first place you, you try to go to, to get some food you can't get anywhere else or as good as anywhere else when you are back in Taipei?

What's your first place you're thinking of

**Fershad Irani:** We got dumplings. We had dumplings the first time, first night we got back, which is quintessential Taiwan. I adid find myself that when I was on the road, I was traveling through Australia, mostly where I grew up. And I did find myself craving instant noodles, which is a bit weird, but there's just a dearth of choice.

There's hardly any choice in Australia for instant noodles. And then you come back here and you've got mind blowing

**Chris Adams:** cornucopia of ramen in packets?

**Fershad Irani:** Oh yeah. Yeah, so it was dumplings first and instant noodles a very close second.

**Chris Adams:** I was not expecting that second answer. I'll be I'll be real. Okay for me when I come back to Berlin It's all about falafel for me There's a really good place called Lausanne when you come back to Kreuzberg and it's probably the best falafel in at least five square kilometers if you're going in anywhere near Kreuzberg. So that's all for this episode.

All the resources and links will be shared in this podcast episode, and you can visit podcast. greensoftwarefoundation to look at some of the previous episodes that we've actually referred to a few times. And finally, Fish, thanks for coming on. Really, I really enjoyed hanging out and chatting with you again.

So everyone else, see you on the episode and Fish, bye for now, I suppose.

**Fershad Irani:** See you folks.

**Chris Adams:** Cheers, Fish. Hey everyone, thanks for listening. Just a reminder to follow Environment Variables on Apple Podcasts, Spotify, Google Podcasts, or wherever you get your podcasts. And please do leave a rating and review if you like what we're doing.

It helps other people discover the show. And of course, we'd love to have more listeners. To find out more about the Green Software Foundation, please visit greensoftware. foundation. That's greensoftware. foundation in any browser. Thanks again and see you in the next episode.​

**News:**

- [Electricity Maps Open Data](https://app.electricitymaps.com/map?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) \[4:02\]
- [HotCarbon 2023: 2nd Workshop on Sustainable Computer Systems](https://hotcarbon.org/2023/index.html?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | HotCarbon \[9:27\]
- [Articles by Assaad Razzouk | Thought Leader Renewable Energy](https://theangrycleanenergyguy.com/articles/?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | Angry Clean Energy Guy \[17:51\]
- [Quinbrook pops up in Grok’s camp at Sun Cable, deal close](https://www.afr.com/street-talk/quinbrook-pops-up-in-grok-s-camp-at-sun-cable-deal-close-20230525-p5db92#:~:text=Quinbrook%20Infrastructure%20Partners%20is%20understood,a%20few%20parties%20including%20Quinbrook?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | Financial Review \[19:05\]
- [Adrian Cockcroft’s Proposal for a Specification for Real Time Carbon Intensity](https://github.com/Green-Software-Foundation/pr-faqs/pull/10/commits/887177bb388bde1d7b0eacd9735c35f1f90f6648?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | Green Software Foundation \[20:55\]
- [Data centres & networks |](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) IEA \[25:14\]
- [Graduated and Incubating Projects](https://www.cncf.io/projects/?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | Green Reviews Project | Cloud Native Computing Foundation \[28:36\]

**Resources:**

- [Observable](https://observablehq.com/?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) \[6:10\]
- [The Internet of Tomorrow Must Sleep More and Grow Old](https://www.romainjacob.net/bibliography/jacob2022Internet.html?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | Romain Jacob \[10:10\]
- [Green Networks](https://podcast.greensoftware.foundation/e/rnkw9p2n-green-networks?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) | Environment Variables episode with Romain Jacob \[11:12\]
- [OVH weathermap](http://weathermap.ovh.net/?utm_medium=podcast&utm_source=bcast&utm_campaign=environment-variables) \[12:21\]
