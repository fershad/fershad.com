// This plug-in creates a hero image and an og image for every html page.
// ---
// The images are published alongside each `index.html` as `hero.png` and `og.png`.
// ---
// In theory, the images should never change, so they are cached in the codebase to avoid redrawing
// them every build. This adds a bunch of files to the codebase, but it greatly speeds up builds.
// ---
// On a 2019 Macbook Pro, drawing, caching, and publishing images for 33 pages (66 images) takes
// 5.55 seconds (around 0.17 seconds per page). Skipping the drawing step and using cached images
// takes 0.03 seconds for all 33 pages.

import fs from "fs";
// const seedrandom = require('seedrandom');
import sharp from "sharp";
import { AssetCache } from "@11ty/eleventy-fetch";
import { createCanvas } from "canvas";
// const { Noise } = require('noisejs');

const cacheDuration = "100y"; // "never" rebuild a cached image

export default async function generateOgImages(eleventyConfig) {
  eleventyConfig.on("eleventy.after", async ({ dir, results }) => {
    const start = Date.now();
    console.log("Creating og images");
    // build a list of images that need to be processed
    const images = buildImageList(results, dir.output);
    // get/create and publish the images
    const stats = await processImages(images);
    const elapsed = Math.round((Date.now() - start) / 10) / 100;
    console.log(
      `Processed ${images.length} images in ${elapsed} seconds. ` +
        `${stats.created} created, ${stats.cached} from cache.`,
    );
    return;
  });
}

// get and publish the image
// either get the image from cache or redraw it
// if redrawn, cache the image for the next build
async function processImages(images) {
  // track how many images came from cache or were drawn fresh
  let cached = 0;
  let created = 0;
  // loop through each image
  await Promise.allSettled(
    images.map(async (image) => {
      // use cache if possible
      const asset = new AssetCache(image.path, ".cache/og");
      if (asset.isCacheValid(cacheDuration)) {
        cached++;
        image.buffer = await asset.getCachedValue();
      } else {
        created++;
        // cache isn't valid, create a new image
        image.buffer = await createImage(image);
        // cache the result
        asset.save(image.buffer, "buffer");
      }

      // make sure destination folder exists
      await fs.promises.mkdir(image.folder, { recursive: true });
      // publish the image to the destination folder
      return fs.promises.writeFile(image.path, image.buffer);
    }),
  );
  return { cached, created };
}

function buildImageList(results, output) {
  const images = [];
  results.forEach((result) => {
    if (result.outputPath.endsWith("/index.html")) {
      const folder = output + result.url;
      images.push({
        url: result.url,
        folder,
        path: folder + "og.png",
        htmlPath: result.outputPath,
        w: 1200,
        h: 630,
        transparent: false,
      });
    }
  });
  return images;
}

// returns a compressed image buffer
function createImage(image) {
  const size = 4;
  const columns = image.w / size;
  const rows = image.h / size;
  const colours = ["#f16f6f", "#67f3da", "#4dabf7", "#f2f4f6", "#252521"];

  const canvas = createCanvas(image.w, image.h);
  const ctx = canvas.getContext("2d");

  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      ctx.fillStyle = colours[Math.floor(colours.length * Math.random())]; // select random array element
      ctx.fillRect(size * c, size * r, size, size);
    }
  }

  const title = getPageTitle(image.htmlPath);
  if (title) {
    drawTitleBlock(ctx, image.w, image.h, title);
  }
  drawSignatureBlock(ctx, image.w, image.h);

  const buffer = canvas.toBuffer("image/png");
  return sharp(buffer).png({ quality: 90, compressionLevel: 9 }).toBuffer();
}

function getPageTitle(htmlPath) {
  try {
    const html = fs.readFileSync(htmlPath, "utf8");
    return extractTitle(html);
  } catch (error) {
    console.warn(`Failed to parse title from ${htmlPath}: ${error.message}`);
    return "";
  }
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) {
    return "";
  }

  return decodeHtmlEntities(match[1])
    .replace(" - Fershad Irani", "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function decodeHtmlEntities(text) {
  const namedEntities = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
  };

  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, value) => {
    const normalized = String(value).toLowerCase();

    if (normalized.startsWith("#x")) {
      const codePoint = Number.parseInt(normalized.slice(2), 16);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    if (normalized.startsWith("#")) {
      const codePoint = Number.parseInt(normalized.slice(1), 10);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    return namedEntities[normalized] ?? entity;
  });
}

function drawTitleBlock(ctx, width, height, title) {
  const fontSize = 48;
  const lineHeight = Math.round(fontSize * 1.45);
  const marginLeft = 64;
  const marginRight = 64;
  const paddingX = 40;
  const paddingY = 32;

  ctx.font = `600 ${fontSize}px sans-serif`;

  const maxTextWidth = width - marginLeft - marginRight - paddingX * 2;
  const lines = wrapText(ctx, title, maxTextWidth);

  if (lines.length === 0) {
    return;
  }

  const widestLine = Math.max(
    ...lines.map((line) => ctx.measureText(line).width),
  );
  const blockWidth = Math.min(maxTextWidth, widestLine) + paddingX * 2;
  const blockHeight = lines.length * lineHeight + paddingY * 2;

  const blockX = marginLeft;
  const blockY = Math.round((height - blockHeight) / 2);

  ctx.fillStyle = "#252521";
  ctx.fillRect(blockX, blockY, blockWidth, blockHeight);

  ctx.fillStyle = "#f2f4f6";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  lines.forEach((line, index) => {
    const x = blockX + paddingX;
    const y = blockY + paddingY + index * lineHeight;
    ctx.fillText(line, x, y);
  });
}

function drawSignatureBlock(ctx, width, height) {
  const text = "FERSHAD IRANI";
  const fontSize = 32;
  const paddingX = 24;
  const paddingY = 16;
  const marginRight = 48;
  const marginBottom = 40;

  ctx.font = `600 ${fontSize}px sans-serif`;
  ctx.textBaseline = "top";

  const textWidth = ctx.measureText(text).width;
  const blockWidth = Math.round(textWidth + paddingX * 2);
  const blockHeight = Math.round(fontSize + paddingY * 2);

  const blockX = width - marginRight - blockWidth;
  const blockY = height - marginBottom - blockHeight;

  ctx.fillStyle = "#252521";
  ctx.fillRect(blockX, blockY, blockWidth, blockHeight);

  ctx.fillStyle = "#f2f4f6";
  ctx.textAlign = "left";
  ctx.fillText(text, blockX + paddingX, blockY + paddingY);
}

function wrapText(ctx, text, maxWidth) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [];
  }

  const words = normalized.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (ctx.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = "";
    }

    if (ctx.measureText(word).width <= maxWidth) {
      currentLine = word;
      continue;
    }

    let chunk = "";
    for (const char of word) {
      const candidateChunk = chunk + char;
      if (
        ctx.measureText(candidateChunk).width <= maxWidth ||
        chunk.length === 0
      ) {
        chunk = candidateChunk;
      } else {
        lines.push(chunk);
        chunk = char;
      }
    }
    currentLine = chunk;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function draw(w, h, ctx, points, lineWidth, fg, bg) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawSplines(ctx, points, lineWidth, fg);
  ctx.stroke();
}
