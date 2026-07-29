import Fetch from "@11ty/eleventy-fetch";

export default async function () {
  let url = "https://film.fershad.com/all.json?v=2.0";

  let json = await Fetch(url, {
    duration: "90d", // 3 months caching
    type: "json", // we’ll parse JSON for you
  });

  const random = json.images[Math.floor(Math.random() * json.images.length)];

  return random;
}
