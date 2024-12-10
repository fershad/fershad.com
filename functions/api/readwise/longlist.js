
export async function onRequestGet(context) {
    const updated = new Date().toUTCString();
    const token = context.env.READWISE_TOKEN;
	let url = "https://readwise.io/api/v3/list/?location=archive";

	let json = await fetch(url, {
        headers:
            { Authorization: `Token ${token}` }
    }).then(res => res.json());

    // Limit to 5 items
    json = json.results.filter(result => !result.parent_id).slice(0, 30);

	return new Response(JSON.stringify({
        updated,
        reader: json
    }),
    {
        headers: {
            "content-type": "application/json",
        },
    });
};