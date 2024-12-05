import 'dotenv/config';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

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
    
    return {
        dir: {
            input: "src",
        }
    };

};