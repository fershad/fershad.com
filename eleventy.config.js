import 'dotenv/config';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { parseHTML } from "linkedom";
import { hosting } from "@tgwf/co2"
import markdownit from 'markdown-it'
import mdfigcaption from 'markdown-it-image-figures'
import { codeToHtml } from 'shiki'

const figoptions = {
    figcaption: true
};
const mdLib = markdownit({}).use(mdfigcaption, figoptions);
const dev = process.env.ELEVENTY_RUN_MODE === "serve" ? true : false;
export default function(eleventyConfig) {

	eleventyConfig.addWatchTarget("./public/css/");

    eleventyConfig.addPassthroughCopy({"public": "/"});

    // Layouts
    eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");

    // NOTE: PLUGINS
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	eleventyConfig.addFilter("limitWords", function(value, limit = 50) {
		// Return the first `limit` words, plus an ellipsis if needed
		return value.split(" ").slice(0, limit).join(" ") + (value.split(" ").length > limit ? "..." : "");
	});


	eleventyConfig.addShortcode("greenLinks", async function() {
		if (dev) {
			return "0 green links / 0 total links";
		}
		
		const content = this.page.rawInput;
		const filetype = this.page.inputPath.split('.').pop();

		let parsedContent;

		if (filetype === 'md') {
			const md = markdownit();
			const mdContent = md.render(content);
			parsedContent = parseHTML(mdContent);
		} else {
			parsedContent = parseHTML(content);
		}

		const { document } = parsedContent;
		const links = [...document.querySelectorAll('a')];
		const allValidLinks = links.filter((link) => /^(https?\:\/\/|\/\/)/i.test(link.href));

		let greenLinksCount = 0;

		if (links.length > 0) {
			//   Get all unique hostnames from the links
			const uniqueHostnames = [...new Set(allValidLinks.map((link) => new URL(link.href).hostname))];

		// 	//   Remove the hostnames that should be ignored
		// 	ignore.forEach((hostname) => {
		// 		const ignoreHostnameIndex = uniqueHostnames.indexOf(hostname);
		// 	if (ignoreHostnameIndex > -1) {
		// 		uniqueHostnames.splice(ignoreHostnameIndex, 1);
		// 	}
		//   });
	  
			  //   Check if the hostnames are green
			  const greenHostnames = await hosting(uniqueHostnames);
	  
			  //   Add the green attribute to the links
			  allValidLinks.forEach((link) => {
				  const hostname = new URL(link.href).hostname;
				  if (greenHostnames.includes(hostname)) {
					  greenLinksCount++;
				  }
			  });
		}

		return `<span class="green-links">${greenLinksCount} green links</span> / ${links.length} total links`;

		
	});

	eleventyConfig.addPairedShortcode("codeToHtml", function(code, lang = "text", filename) {
		const html = codeToHtml(code, {
			lang,
			theme: "plastic",
		});

		return `
		<div class="code-block">
		${filename ? `<p class="filename">${filename}</p>` : ""}
		${html}
		</div>`;
	});

	eleventyConfig.addPairedShortcode("callout", function(content, title) {
		const md = markdownit();
		return `<aside class="callout">${ title ? `<p class="title">${title}</p>` : ""}${md.render(content)}</aside>`;
	});

	eleventyConfig.addShortcode("codepenIframe", function(penId, title, user = "fishintaiwan") {
		return `<iframe height="300" style="width: 100%;" scrolling="no" title="${title}" src="https://codepen.io/fishintaiwan/embed/preview/${penId}?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/${user}/pen/${penId}" gaw:remove>
</iframe>
<p><a href="https://codepen.io/${user}/pen/${penId}">View ${title} by @${user} on CodePen</a></p>`;
	});

	eleventyConfig.addFilter("sortByPublishedDate", function(array) {
		// The data.published value is a string in the format "YYYY/MM/DD"
		return array.sort((a, b) => {
			const dateA = new Date(a.data.published);
			const dateB = new Date(b.data.published);
			return dateB - dateA;
		});
	});

	eleventyConfig.setLibrary("md", mdLib);
    
    return {
        dir: {
            input: "src",
        }
    };

};