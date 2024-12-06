import 'dotenv/config';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { parseHTML } from "linkedom";
import { hosting } from "@tgwf/co2"
import markdownit from 'markdown-it'

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
    
    return {
        dir: {
            input: "src",
        }
    };

};