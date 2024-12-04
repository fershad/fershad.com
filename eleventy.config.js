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
    
    return {
        dir: {
            input: "src",
        }
    };

};