const upcoming = [];

const past = [
  {
    event: "Green IO Conference Singapore",
    url: "https://greenio.tech//conference/18/singapore-2026-april",
    slides:
      "https://drive.google.com/file/d/1elqr-id7gB7vCjNjmmm7SeTapddivDrQ/view?usp=sharing",
    title:
      "Improving the discoverability of AI sustainability data with carbon.txt",
    date: "2026-04-14",
  },
  {
    event: "Netherlands WordPress Meetup",
    url: "",
    slides:
      "https://docs.google.com/presentation/d/1bhT9JvrcfWiWRFUlXhLsNPPQXiKadFEkzXq1cU1rrG8/edit?usp=sharing",
    title: "Building a grid-aware web",
    date: "2025-07-08",
  },
  {
    event: "Web Directions Code",
    url: "https://webdirections.org/code/",
    video: "https://conffab.com/presentation/building-a-grid-aware-web-2/",
    slides:
      "https://docs.google.com/presentation/d/12t1SVUrEshf0pz8vrUaHRg3EQd-32wxlC2j8I3TdHLA/edit?usp=sharing",
    title: "Building a grid-aware web",
    date: "2025-06-13",
  },
  {
    event: "Green IO Conference Singapore",
    url: "https://greenio.tech/conference/14/singapore-2025-april-green-it",
    slides:
      "https://drive.google.com/file/d/1pSd-Nu6Db7lvLs6N5FwL3JPOvsZBkG1d/view?usp=sharing",
    title: "Imagining a grid-aware web",
    date: "2025-04-16",
  },
  {
    event: "Green IO Conference Singapore",
    url: "https://greenio.tech/conference/2/singapore-2024-greenit-digital-sustainability",
    slides:
      "https://www.thegreenwebfoundation.org/slides/greenio-singapore-2024",
    title: "The nuance of quantifying digital carbon emissions",
    date: "2024-04-18",
  },
  {
    event: "Digital Sustainability Summit, Taipei",
    url: "https://dss.ithome.com.tw/",
    slides: "https://www.thegreenwebfoundation.org/twdss24",
    title: "Thinking differently about digital sustainability",
    date: "2024-03-29",
  },
  {
    event: "Digital Ethics Forum",
    url: "https://www.digitalethicsforum.com/def-23/",
    title: "Calculating website emissions in the Italian context",
    date: "2023-11-23",
    video:
      "https://www.thegreenwebfoundation.org/news/estimating-website-emissions-in-the-italian-context-sitigreen-co2-js/",
  },
  {
    event: "Environment Variables Podcast",
    url: "https://podcasts.bcast.fm/e/vnwrxy28-the-week-in-green-software-open-data-with-fershad-irani",
    title: "The Week in Green Software: Open Data with Fershad Irani",
    episode:
      "https://podcasts.bcast.fm/e/vnwrxy28-the-week-in-green-software-open-data-with-fershad-irani",
    date: "2022-07-19",
  },
  {
    event: "Web Directions Lazy Load",
    url: "https://webdirections.org/lazyload/",
    title: "Web Performance and the Planet",
    date: "2022-06-10",
  },
  {
    event: "Startup Taiwan",
    url: "https://www.youtube.com/channel/UCj6eq6QSnUsrYXktcp0Zp2w",
    title: "Leaving a tech job in Taiwan to be a web performance consultant",
    video: "https://www.youtube.com/watch?v=cXCMq6nBr6A",
    date: "2022-03-11",
  },
  {
    event: "Green I/O Podcast",
    url: "https://gaelduez.com/blog/2-greenio-1-Fershad-Irani-web-performance-sustainability",
    title:
      "Episode #1 with Fershad Irani - Using website performance to green the web",
    episode:
      "https://anchor.fm/greenio/episodes/Fershad-Irani---Using-website-performance-to-green-the-web-e1f6179",
    date: "2022-03-03",
  },
  {
    event: "Taiwan Code Camp",
    url: "https://www.eventbrite.com/e/making-websites-run-faster-environmentally-friendly-tickets-232071551257",
    video: "https://www.youtube.com/watch?v=G5UE9LBA8aY",
    slides: "/files/tw-code-camp-feb-2022.pdf",
    title: "Making websites run faster & environmentally-friendly",
    date: "2022-02-17",
  },
  {
    event: "Toronto Web Perf",
    url: "https://www.meetup.com/Toronto-Web-Performance-Group/events/283332963/",
    video: "https://youtu.be/LD8HiUGdsX0",
    slides: "/files/torwebperf_feb_2022.pdf",
    title: "Web Performance and the Planet",
    date: "2022-02-07",
  },
];

export default { upcoming, past };
