import Fetch from "@11ty/eleventy-fetch";
const token = process.env.READWISE_TOKEN;
const updated = new Date().toUTCString();

export default async function () {
	let url = "https://readwise.io/api/v3/list/?location=archive";

	let json = await Fetch(url, {
		duration: "1d", // 1 day caching
		type: "json", // we’ll parse JSON for you
        fetchOptions: {
            headers: {
                Authorization: `Token ${token}`,
        }
    }});

    // Limit to 5 items
    json = json.results.filter(result => !result.parent_id).slice(0, 5);

	return {
        updated,
        reader: json
    };
};