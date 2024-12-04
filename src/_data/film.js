import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let url = "https://film.fershad.com/all.json";

	let json = await Fetch(url, {
		duration: "90d", // 3 months caching
		type: "json", // we’ll parse JSON for you
	});

    // Filter the images that don't have descriptions
    json.images = json.images.filter(image => image.description);
    const random = json.images[Math.floor(Math.random() * json.images.length)];

	return random;
};