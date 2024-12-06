import Fetch from "@11ty/eleventy-fetch";
const token = process.env.READWISE_TOKEN;
const currentDate = new Date()
const updated = currentDate.toUTCString();

currentDate.setDate(currentDate.getDate() - 30);
const isoDate = currentDate.toISOString();

export default async function () {
	let url = `https://readwise.io/api/v3/list/?location=archive&updatedAfter=${isoDate}`;

	let json = await Fetch(url, {
		duration: "5d", // 1 day caching
		type: "json", // we’ll parse JSON for you
        fetchOptions: {
            headers: {
                Authorization: `Token ${token}`,
        }
    }});

    // NOTE: The original JSON does include other things like notes & highlights. Maybe some that can be used later?

    const list = json.results.filter(result => !result.parent_id).slice(0, 30);
    // Limit to 5 items
    json = json.results.filter(result => !result.parent_id).slice(0, 5);

	return {
        updated,
        reader: json,
        list
    };
};