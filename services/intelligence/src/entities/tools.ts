import * as cheerio from "cheerio";
import TurndownService from "turndown";

export interface ReadWebpageOptions {
  url: string;
  format?: "markdown" | "raw" | "json";
}

export async function readWebpage(
  options: ReadWebpageOptions,
): Promise<{ content: string }> {
  const { url, format = "raw" } = options;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const html = await response.text();

  if (format === "raw") {
    return { content: html };
  }

  const $ = cheerio.load(html);

  // Remove script and style elements
  $("script, style, noscript").remove();

  if (format === "json") {
    const title = $("title").text().trim();
    const metaDescription = $('meta[name="description"]').attr("content") || "";
    // Extract some text content
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();

    return {
      content: JSON.stringify({
        title,
        description: metaDescription,
        url,
        text: bodyText,
      }),
    };
  }

  // Default: markdown
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });

  // Try to find the main content if possible, otherwise use body
  const mainContent = $("article, main, #content, .content, body").first();
  const markdown = turndownService.turndown(mainContent.html() || "");

  return { content: markdown };
}
