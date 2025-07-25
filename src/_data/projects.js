import { baseURL } from "./site.js";

export default [
  {
    slug: "grid-aware-websites-component",
    title: "Grid-aware websites web component",
    url: "https://github.com/thegreenwebfoundation/gaw-web-component",
    media: `./public/img/grid-aware-websites.jpg`,
    media_alt: "",
    shortContent:
      "A web component for grid-aware websites to give users context and control over their experience.",
    content:
      "One of the things we have heard from folks as we worked on the Grid-aware Websites project was the need for users to have information about the grid-aware experience they were being presented with. This web component aims to provide a standardise way to present that information as well as a common method for allowing users to opt-in/out of automatically applying grid-awareness to as they browse a site.",
    links: [
      {
        text: "Project home",
        url: "https://www.thegreenwebfoundation.org/tools/grid-aware-websites/",
      },
      {
        text: "Source code",
        url: "https://github.com/thegreenwebfoundation/gaw-web-component",
      },
    ],
  },
  {
    slug: "grid-aware-websites",
    title: "Grid-aware websites",
    url: "https://github.com/thegreenwebfoundation/grid-aware-websites",
    media: `./public/img/grid-aware-websites.jpg`,
    media_alt: "",
    shortContent:
      "Giving developers to ability to make their websites react to changes in the energy grid.",
    content:
      "A project with the Green Web Foundation to explore our idea for making grid-aware websites a commonplace tool in website developer toolkits.",
    links: [
      {
        text: "Project home",
        url: "https://www.thegreenwebfoundation.org/tools/grid-aware-websites/",
      },
      {
        text: "Source code",
        url: "https://github.com/thegreenwebfoundation/grid-aware-websites",
      },
      {
        text: "Blog post",
        url: "https://fershad.com/writing/making-this-website-grid-aware/",
      },
    ],
  },
  {
    slug: "green-web-tracker",
    title: "Green Web Tracker",
    url: "https://tracker.greenweb.org",
    media_alt: "",
    shortContent:
      "An open source project to track how many domains run on green hosting.",
    content:
      "An open source website that tracks green hosting of domains across a number of user submitted indexes.",
    links: [
      {
        text: "Website",
        url: "https://tracker.greenweb.org",
      },
      {
        text: "Source code",
        url: "https://github.com/thegreenwebfoundation/green-web-tracker",
      },
      {
        text: "Blog post",
        url: "https://fershad.com/writing/introducing-green-web-tracker",
      },
    ],
  },
  {
    slug: "co2.js",
    title: "CO2.js",
    url: "https://github.com/thegreenwebfoundation/co2.js",
    media: `./public/img/co2-js.png`,
    media_alt: "",
    shortContent:
      "A JavaScript library that allows developers to estimate digital emissions.",
    content:
      "I am a code contributor to, and maintainer of, CO2.js - A JavaScript library that allows developers to estimate the emissions associated with their apps, websites and software.",
    links: [
      {
        text: "Introduction",
        url: "https://fershad.com/writing/co2-js-an-open-library-for-digital-carbon-reporting/",
      },
      {
        text: "Source code",
        url: "https://github.com/thegreenwebfoundation/co2.js",
      },
      {
        text: "Documentation",
        url: "https://github.com/fershad/eleventy-plugin-green-links",
      },
    ],
  },
  {
    title: "CO2 estimates in Firefox Profiler",
    media: `./public/img/firefox-profiler.jpg`,
    media_alt: "",
    content: "Presenting CO2 estimates in the Firefox DevTools Profiler.",
    links: [
      {
        text: "Blog post",
        url: "https://fershad.com/writing/co2e-estimates-in-firefox-profiler/",
      },
    ],
  },
  {
    title: "Carbon-aware website",
    media: `./public/img/carbon-aware-site.jpg`,
    archived: true,
    media_alt: "",
    content:
      "In 2023, I made my website carbon aware. That means it changes dynamically depending on the carbon intensity of the electricity grid that a visitor is on.",
    links: [
      {
        text: "Short intro",
        url: "https://fershad.com/carbon-aware-site/",
      },
      {
        text: "Longer post",
        url: "https://fershad.com/writing/making-this-website-carbon-aware/",
      },
      {
        text: "Code",
        url: "https://github.com/fershad/carbon-aware-site-worker",
      },
    ],
  },
  {
    title: "Eleventy Plugin: Green Links",
    media: `./public/img/eleventy-plugin-green-links.png`,
    media_alt: "",
    content:
      "An Eleventy plugin which checks if links on a website are hosted on verified green hosting providers from The Green Web Foundation's Green Web dataset.",
    links: [
      {
        text: "Introduction",
        url: "https://fershad.com/writing/eleventy-plugin-green-links/",
      },
      {
        text: "NPM",
        url: "https://www.npmjs.com/package/eleventy-plugin-green-links",
      },
      {
        text: "Source code",
        url: "https://github.com/fershad/eleventy-plugin-green-links",
      },
    ],
  },
  {
    title: "ReqCheck",
    media: `./public/img/reqcheck.png`,
    media_alt: "",
    content:
      "ReqCheck is a tool I’ve built to help folks find out where all the different requests made by a web page are served from.",
    links: [
      {
        text: "Introduction",
        url: "https://fershad.com/writing/checking-where-website-requests-come-from-with-reqcheck",
      },
      {
        text: "Website",
        url: "https://reqcheck.fershad.com/?utm_campaign=fershad-site&utm_source=projects&utm_medium=website",
      },
    ],
  },
  {
    title: "Are my third parties green?",
    slug: "are-my-third-parties-green",
    media: `./public/img/amtpg.jpg`,
    shortContent:
      "A tool to show if the third-party resources on a website are hosted on green infrastructure.",
    media_alt: "",
    content:
      "I built aremythirdpartiesgreen.com to help give some visibility to the sustainability of third-party requests on the web. Use it to test your own site, and find out if the external resources being used are hosted on green infrastructure.",
    links: [
      {
        text: "Introduction",
        url: "https://fershad.com/writing/building-are-my-third-parties-green/",
      },
      {
        text: "Building the Directory",
        url: "https://fershad.com/writing/adding-a-directory-and-api-to-are-my-third-parties-green/",
      },
      {
        text: "Website",
        url: "https://aremythirdpartiesgreen.com/?utm_campaign=fershad-site&utm_source=projects&utm_medium=website",
      },
    ],
  },
  {
    title: "Flowty",
    media: `./public/img/flowty.jpg`,
    archived: true,
    media_alt: "",
    content:
      "Webflow is a great service for designers who want to create amazing websites for clients. It does leave a few things on the table when it comes to web sustainability though. Flowty gives designers who build with Weblow the power to create fast, low-carbon, self-hosted sites in minutes.",
    links: [
      {
        text: "Introduction",
        url: "https://fershad.com/writing/introducing-flowty-build-low-carbon-webflow-sites/",
      },
      {
        text: "Website",
        url: "https://flowty.site/?utm_campaign=fershad-site&utm_source=projects&utm_medium=website",
      },
    ],
  },
];
