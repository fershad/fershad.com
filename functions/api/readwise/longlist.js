import articles from './articles.json';

export async function onRequestGet(context) {
    console.log("Requesting Readwise longlist");
    console.log("Articles: ", articles.length);
    const updated = new Date().toUTCString();
    const token = context.env.READWISE_TOKEN;
    let url = "https://readwise.io/api/v3/list/?location=archive";

    let json = await fetch(url, {
        headers:
            { Authorization: `Token ${token}` }
    }).then(res => res.json());

    // Filter out parent_id items and compare against existing articles
    json = json.results
        .filter(result => !result.parent_id)
        .slice(0, 30);

    // Compare against existing articles
    const newArticles = json.filter(article => !articles.find(({id}) => id === article.id));
    console.log("Fetch articles: ", json.length);
    console.log("New articles: ", newArticles.length);

    return new Response(JSON.stringify({
        updated,
        reader: newArticles
    }),
    {
        headers: {
            "content-type": "application/json",
        },
    });
};