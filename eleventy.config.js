import 'dotenv/config';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { parseHTML } from "linkedom";
import { hosting } from "@tgwf/co2"
import markdownit from 'markdown-it'
import mdfigcaption from 'markdown-it-image-figures'
import { codeToHtml } from 'shiki'
import greenLinks from "eleventy-plugin-green-links";
import markdownItAnchor from 'markdown-it-anchor'
import slugify from '@sindresorhus/slugify'

const figoptions = {
    figcaption: true
};

const markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: 'deeplink',
    permalinkSymbol:
      '#',
    level: [2, 3, 4],
    slugify: function (s) {
      return slugify(s);
    },
    renderPermalink: (slug, opts, state, idx) => {
      // based on fifth version in
      // https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
      const linkContent = state.tokens[idx + 1].children[0].content;

      // Create the openning <div> for the wrapper
      const headingWrapperTokenOpen = Object.assign(
        new state.Token('div_open', 'div', 1),
        {
          attrs: [['class', 'heading-wrapper']],
        }
      );
      // Create the closing </div> for the wrapper
      const headingWrapperTokenClose = Object.assign(
        new state.Token('div_close', 'div', -1),
        {
          attrs: [['class', 'heading-wrapper']],
        }
      );

      // Create the tokens for the full accessible anchor link
      // <a class="deeplink" href="#your-own-platform-is-the-nearest-you-can-get-help-to-setup">
      //   <span aria-hidden="true">
      //     ${opts.permalinkSymbol}
      //   </span>
      //   <span class="visually-hidden">
      //     Section titled Your "own" platform is the nearest you can(get help to) setup
      //   </span>
      // </a >
      const anchorTokens = [
        Object.assign(new state.Token('link_open', 'a', 1), {
          attrs: [
            ...(opts.permalinkClass ? [['class', opts.permalinkClass]] : []),
            ['href', opts.permalinkHref(slug, state)],
            ...Object.entries(opts.permalinkAttrs(slug, state)),
          ],
        }),
        Object.assign(new state.Token('span_open', 'span', 1), {
          attrs: [['aria-hidden', 'true']],
        }),
        Object.assign(new state.Token('html_block', '', 0), {
          content: opts.permalinkSymbol,
        }),
        Object.assign(new state.Token('span_close', 'span', -1), {}),
        Object.assign(new state.Token('span_open', 'span', 1), {
          attrs: [['class', 'visually-hidden']],
        }),
        Object.assign(new state.Token('html_block', '', 0), {
          content: `Section titled ${linkContent}`,
        }),
        Object.assign(new state.Token('span_close', 'span', -1), {}),
        new state.Token('link_close', 'a', -1),
      ];

      // idx is the index of the heading's first token
      // insert the wrapper opening before the heading
      state.tokens.splice(idx, 0, headingWrapperTokenOpen);
      // insert the anchor link tokens after the wrapper opening and the 3 tokens of the heading
      state.tokens.splice(idx + 3 + 1, 0, ...anchorTokens);
      // insert the wrapper closing after all these
      state.tokens.splice(
        idx + 3 + 1 + anchorTokens.length,
        0,
        headingWrapperTokenClose
      );
    },
  };



const mdLib = markdownit({
	html: true,
//   linkify: true,
//   typographer: true
}).use(mdfigcaption, figoptions).use(markdownItAnchor, markdownItAnchorOptions);

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

	eleventyConfig.addPlugin(greenLinks, {
		// ignore: ["fershad.com", "thegreenwebfoundation.org"],
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

	eleventyConfig.addPairedShortcode("codeToHtml", async function(code, lang = "text", filename) {
		code = code.replace(/\r?\n$/, '');

		try {
			const html = await codeToHtml(code, {
				lang,
				theme: "nord",
			});

			if (filename && lang) {
				return `<div class="codeblock">
				${filename ? `<div class="filename">${filename}</div>` : ""}
				${lang ? `<div class="lang">${lang}</div>` : ""}
				${html}
				</div>`;
			} else if (lang) {
				return `<div class="codeblock">
				${lang ? `<div class="lang">${lang}</div>` : ""}
				${html}
				</div>`;
			} else {
				return `<div class="codeblock">${html}</div>`;
			}
		} catch {
			const html = code;
			return `<pre><code>${html}</code></pre>`;
		}
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