import Fetch from "@11ty/eleventy-fetch";

export default async function () {
  let url = "https://film.fershad.com/all.json?v=202512052326";

  let json = await Fetch(url, {
    duration: "30d", // 3 months caching
    type: "json", // we’ll parse JSON for you
  });

  return json.images.sort(() => Math.random() - 0.5);
}
