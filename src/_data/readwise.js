import Fetch from "@11ty/eleventy-fetch";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dev = process.env.ELEVENTY_RUN_MODE === "serve" ? true : false;

const token = process.env.READWISE_TOKEN;
const currentDate = new Date()
const updated = currentDate.toUTCString();

currentDate.setDate(currentDate.getDate() - 30);
const isoDate = currentDate.toISOString();

const writeArticlesToFile = async (articles) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputDir = path.join(__dirname, '../../functions/api/readwise');
    const outputFile = path.join(outputDir, 'articles.json');

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
};

export default async function () {
    if (dev) {
        // Get the content of the articles.json file in ../functions/api/readwise
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const outputFile = path.join(__dirname, '../../functions/api/readwise/articles.json');
        const articles = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
        return {
            updated,
            reader: articles.slice(0, 5),
            list: articles,
            blogroll: []
        };
    }
    
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
    // Write articles to file
    await writeArticlesToFile(list);
    // Limit to 5 items
    json = json.results.filter(result => !result.parent_id).slice(0, 5);

    const blogroll = []

    await list.map(async (item) => {
        const origin = new URL(item.source_url).origin;
        const blogrollIndex = blogroll.findIndex(({url}) => url === origin);
        if (blogrollIndex === -1) {
            blogroll.push({url: origin, name: item.site_name});
        }
        // if (item.source_url && blogroll.findIndex({url: origin, name: item.site_name}) === -1) {
        //     blogroll.push({url: origin, name: item.site_name});
        // }
    });

    


	return {
        updated,
        reader: json,
        list,
        blogroll
    };
};