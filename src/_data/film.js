import Fetch from "@11ty/eleventy-fetch";

export default async function () {
  let url = "https://film.fershad.com/all.json?v=2.0";

  let json = await fetch("https://film.fershad.com/all.json").then((res) =>
    res.json(),
  );

  // Filter the images that don't have descriptions
  json.images = json.images.filter(
    (image) => image.description && image.portrait === "true",
  );
  const random = json.images[Math.floor(Math.random() * json.images.length)];

  return random;
}
