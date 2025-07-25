import "dotenv/config";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownit from "markdown-it";
import mdfigcaption from "markdown-it-image-figures";
import { codeToHtml } from "shiki";
import markdownItAnchor from "markdown-it-anchor";
import slugify from "@sindresorhus/slugify";
import pluginTOC from "eleventy-plugin-nesting-toc";
import markdownItAttrs from "markdown-it-attrs";
import pluginRss from "@11ty/eleventy-plugin-rss";
import CleanCSS from "clean-css";
import stringHash from "@sindresorhus/string-hash";
import { globby } from "globby";
import fs from "fs";
import sitemap from "@quasibit/eleventy-plugin-sitemap";
import sanitizeHTML from "sanitize-html";

function do_minifycss(source, output_path) {
  // https://starbeamrainbowlabs.com/blog/article.php?article=posts/506-eleventy-minification.html
  if (!output_path.endsWith(".css") || output_path.endsWith("listPage.css"))
    return source;

  const result = new CleanCSS({
    level: 2,
  })
    .minify(source)
    .styles.trim();
  console.log(
    `MINIFY ${output_path}`,
    source.length,
    `→`,
    result.length,
    `(${((1 - result.length / source.length) * 100).toFixed(2)}% reduction)`,
  );
  return result;
}

const figoptions = {
  figcaption: true,
};

const markdownItAnchorOptions = {
  permalink: true,
  permalinkClass: "deeplink",
  permalinkSymbol: "#",
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
      new state.Token("div_open", "div", 1),
      {
        attrs: [["class", "heading-wrapper"]],
      },
    );
    // Create the closing </div> for the wrapper
    const headingWrapperTokenClose = Object.assign(
      new state.Token("div_close", "div", -1),
      {
        attrs: [["class", "heading-wrapper"]],
      },
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
      Object.assign(new state.Token("link_open", "a", 1), {
        attrs: [
          ...(opts.permalinkClass ? [["class", opts.permalinkClass]] : []),
          ["href", opts.permalinkHref(slug, state)],
          ...Object.entries(opts.permalinkAttrs(slug, state)),
        ],
      }),
      Object.assign(new state.Token("span_open", "span", 1), {
        attrs: [["aria-hidden", "true"]],
      }),
      Object.assign(new state.Token("html_block", "", 0), {
        content: opts.permalinkSymbol,
      }),
      Object.assign(new state.Token("span_close", "span", -1), {}),
      Object.assign(new state.Token("span_open", "span", 1), {
        attrs: [["class", "visually-hidden"]],
      }),
      Object.assign(new state.Token("html_block", "", 0), {
        content: `Section titled ${linkContent}`,
      }),
      Object.assign(new state.Token("span_close", "span", -1), {}),
      new state.Token("link_close", "a", -1),
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
      headingWrapperTokenClose,
    );
  },
};

// Using markdownit, how can I add an data attribute to all headings of level 2 and 3?
const mdLib = markdownit({
  html: true,
  breaks: true,
  //   linkify: true,
  //   typographer: true
});

// Add this custom ruler before other plugins
mdLib.core.ruler.before("inline", "heading-data-attr", (state) => {
  state.tokens.forEach((token, idx) => {
    if (token.type === "heading_open") {
      const level = parseInt(token.tag.slice(1));
      if (level === 2 || level === 3) {
        // Find the content in the next token
        const contentToken = state.tokens[idx + 1];
        if (contentToken && contentToken.type === "inline") {
          const headingText = contentToken.content;
          // Add the data-glitch attribute to the token's attrs array
          token.attrs = token.attrs || [];
          token.attrs.push(["data-glitch", headingText]);
        }
      }
    }
  });
});

// Now add the other plugins
mdLib
  .use(mdfigcaption, figoptions)
  .use(markdownItAnchor, markdownItAnchorOptions)
  .use(markdownItAttrs);

const dev = process.env.ELEVENTY_RUN_MODE === "serve" ? true : false;
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.watchIgnores.add("public/img/.DS_Store");

  // Layouts
  eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");

  // NOTE: PLUGINS
  // eleventyConfig.addPlugin(feedPlugin, {
  // 	type: "atom", // or "rss", "json"
  // 	outputPath: "/feed.xml",
  // 	collection: {
  // 		name: "post", // iterate over `collections.posts`
  // 		limit: 0,     // 0 means no limit
  // 	},
  // 	metadata: {
  // 		language: "en",
  // 		title: "Fershad Irani - Writing",
  // 		subtitle: "Writings about web sustainability, and how we can takes steps towards a greener web.",
  // 		base: "https://fershad.com/",
  // 		author: {
  // 			name: "Fershad Irani",
  // 			// email: "", // Optional
  // 		}
  // 	}
  // });
  eleventyConfig.addTransform("cssmin", do_minifycss);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addFilter(
    "getNewestCollectionItemPublishedDate",
    function (collection) {
      return new Date(
        Math.max(
          ...collection.map((item) => {
            return item.data?.published
              ? new Date(item.data?.published)
              : item.page.date;
          }),
        ),
      );
    },
  );

  eleventyConfig.addFilter("webmentionsByUrl", function (webmentions, url) {
    const allowedTypes = {
      likes: ["like-of"],
      reposts: ["repost-of"],
      comments: ["in-reply-to"],
      mentions: ["mention-of"],
    };

    const sanitize = (entry) => {
      if (entry.content && entry.content.html) {
        entry.content = sanitizeHTML(entry.content.html, {
          allowedTags: ["b", "i", "em", "strong", "a"],
        });
      }
      return entry;
    };

    const pageWebmentions = webmentions
      .filter((mention) => mention["wm-target"] === "https://fershad.com" + url)
      .sort((a, b) => new Date(b.published) - new Date(a.published))
      .map(sanitize);

    const likes = pageWebmentions
      .filter((mention) => allowedTypes.likes.includes(mention["wm-property"]))
      .filter((like) => like.author)
      .map((like) => like.author);

    const reposts = pageWebmentions
      .filter((mention) =>
        allowedTypes.reposts.includes(mention["wm-property"]),
      )
      .filter((repost) => repost.author)
      .map((repost) => repost.author);

    const comments = pageWebmentions
      .filter((mention) =>
        allowedTypes.comments.includes(mention["wm-property"]),
      )
      .filter((comment) => {
        const { author, published, content } = comment;
        return author && author.name && published && content;
      });

    const mentions = pageWebmentions
      .filter((mention) =>
        allowedTypes.mentions.includes(mention["wm-property"]),
      )
      .filter((mention) => {
        const { author } = mention;
        return mention["wm-source"];
      });

    const mentionCount =
      likes.length + reposts.length + comments.length + mentions.length;
    const data = { likes, reposts, comments, mentions, mentionCount };
    return data;
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",

    // Add any other Image utility options here:

    // optional, output image formats - avif since I don't have many images.
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

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://fershad.com",
    },
  });

  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addFilter("removeDeepLinks", function (source) {
    return source.replace(/<a class="deeplink" href="#.*?">(.*?)<\/a>/g, "");
  });

  eleventyConfig.addFilter("getDomain", function (canonical) {
    const url = new URL(canonical);
    const domain = url.hostname;

    return domain;
  });

  eleventyConfig.addFilter("has", function (array, value) {
    return array.includes(value);
  });

  eleventyConfig.addFilter("versionHashCSS", async function (value) {
    const cssFiles = await globby("src/_includes/css/*.css");
    // Remove src/_includes from the path
    const files = cssFiles.map((file) => file.replace("src/_includes", ""));
    const match = files.find((file) => file.includes(value));
    if (match) {
      // Return the last modified date as a string
      const lastModifiedDate = new Date(
        fs.statSync(`src/_includes${match}`).mtime,
      );
      return lastModifiedDate ? `${value}?v=${lastModifiedDate.getTime()}` : "";
    } else {
      return value;
    }
  });

  // if (!dev) {
  // 	eleventyConfig.addPlugin(greenLinks, {
  // 		// ignore: ["fershad.com", "thegreenwebfoundation.org"],
  // 	  });
  // }

  eleventyConfig.addFilter("limitWords", function (value, limit = 50) {
    // Return the first `limit` words, plus an ellipsis if needed
    return (
      value.split(" ").slice(0, limit).join(" ") +
      (value.split(" ").length > limit ? "..." : "")
    );
  });

  eleventyConfig.addPairedShortcode(
    "codeToHtml",
    async function (code, lang = "text", filename) {
      code = code.replace(/\r?\n$/, "");

      try {
        const html = await codeToHtml(code, {
          lang,
          theme: "nord",
        });

        if (filename && lang) {
          return `<div class="codeblock">
				${filename ? `<div class="filename" data-glitch="${filename}">${filename}</div>` : ""}
				${lang ? `<div class="lang" data-glitch="${lang}">${lang}</div>` : ""}
				${html}
				</div>`;
        } else if (lang) {
          return `<div class="codeblock">
				${lang ? `<div class="lang" data-glitch="${lang}">${lang}</div>` : ""}
				${html}
				</div>`;
        } else {
          return `<div class="codeblock">${html}</div>`;
        }
      } catch {
        const html = code;
        return `<pre><code>${html}</code></pre>`;
      }
    },
  );

  eleventyConfig.addPairedShortcode("callout", function (content, title) {
    const md = markdownit();
    return `<aside class="banner outline callout">${title ? `<p class="title" data-glitch="${title || ""}">${title}</p>` : ""}${md.render(content)}</aside>`;
  });

  eleventyConfig.addFilter("linkContent", function (raw) {
    return mdLib.render(raw);
  });

  eleventyConfig.addShortcode(
    "codepenIframe",
    function (penId, title, user = "fishintaiwan") {
      return `<figure><iframe data-gaw-remove height="300" style="width: 100%;" scrolling="no" title="${title}" src="https://codepen.io/fishintaiwan/embed/${penId}?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/${user}/pen/${penId}">
</iframe>
<figcaption><p><a href="https://codepen.io/${user}/pen/${penId}">View ${title} by @${user} on CodePen</a></p></figcaption></figure>`;
    },
  );

  eleventyConfig.addFilter("sortByPublishedDate", function (array) {
    // Filter any items that don't have a data.published value
    array = array.filter((item) => {
      return "published" in item.data;
    });
    // The data.published value is a string in the format "YYYY/MM/DD"
    return array.sort((a, b) => {
      const dateA = new Date(a.data.published);
      const dateB = new Date(b.data.published);
      return dateB - dateA;
    });
  });

  eleventyConfig.addFilter("filterOnlyTag", function (array, tag, exclude) {
    return array.filter((item) => {
      if (exclude) {
        return (
          item.data.tags.includes(tag) && !item.data.tags.includes(exclude)
        );
      } else {
        return item.data.tags.includes(tag);
      }
    });
  });

  eleventyConfig.addFilter("stringHash", function (value) {
    return stringHash(value);
  });

  // A filter to return a random number between 0 and 1000
  eleventyConfig.addShortcode("random", function () {
    return Math.random() * 1000;
  });

  // A shortcode to return 'normal', 'alternate', 'reverse', or 'alternate-reverse'
  eleventyConfig.addShortcode("direction", function () {
    const directions = ["normal", "alternate", "reverse", "alternate-reverse"];
    return directions[Math.floor(Math.random() * directions.length)];
  });

  // A filter that takes in a markdown table and returns a HTML table with a wrapper div
  eleventyConfig.addFilter("markdownTable", function (value) {
    const md = markdownit();
    const html = md.render(value);
    return `<div class="table-wrapper">${html}</div>`;
  });

  // A filter that takes a markdown heading and returns it with a attr attached
  eleventyConfig.addFilter("headingGlitch", function (value) {
    const headingText = value.replaceAll("#", "").trim();
    return `${value} { data-glitch="${headingText}" }`;
  });

  eleventyConfig.addShortcode("editLink", function (page) {
    const repoLink = "https://github.com/fershad/fershad.com";
    return `See something that needs fixing? <a href="${repoLink}/edit/main/${page.inputPath.replace("./", "")}">Edit on GitHub.</a>`;
  });

  eleventyConfig.addFilter("publishedToDate", function (value) {
    return new Date(value);
  });

  eleventyConfig.addNunjucksFilter("limit", (arr, limit = Infinity) => {
    if (limit < 0) {
      // Return the last N items.
      return arr.slice(limit);
    }
    // Return the first N items.
    return arr.slice(0, limit);
  });

  eleventyConfig.setLibrary("md", mdLib);

  return {
    dir: {
      input: "src",
    },
  };
}
