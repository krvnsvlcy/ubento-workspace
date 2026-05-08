import { z } from "zod";
import { AgentTool } from "../tool/tool.js";

export const readWebpageSchema = z.object({
  url: z.string().url().describe("The URL of the web page to read"),
  format: z
    .enum(["raw", "markdown"])
    .default("markdown")
    .describe(
      "The format of the content to return. Raw is the raw HTML content. Markdown is the content of the web page formatted as markdown. Default is markdown.",
    ),
});

export const readWebpageTool: AgentTool<typeof readWebpageSchema> = {
  name: "read_webpage",
  description: "Read the content of a web page.",
  args: readWebpageSchema,
  async run({ args, abortController }) {
    try {
      const res = await fetch(args.url, { signal: abortController.signal });
      const content = await res.text();

      return {
        content: [
          {
            type: "text",
            text: `Web page content from "${args.url}" loaded:\n\n${content}`,
          },
        ],
        structuredContent: { url: args.url },
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error loading "${args.url}": ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  },
};

export const fetchSchema = z.object({
  url: z.string().url().describe("The URL of the API to fetch"),
});

export const fetchTool: AgentTool<typeof fetchSchema> = {
  name: "fetch",
  description: "Fetch JSON from a URL.",
  args: fetchSchema,
  async run({ args, abortController }) {
    try {
      const res = await fetch(args.url, { signal: abortController.signal });
      const content = await res.text();

      return {
        content: [
          {
            type: "text",
            text: `JSON data from "${args.url}" loaded:\n\n${content}`,
          },
        ],
        structuredContent: { url: args.url },
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error fetching "${args.url}": ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  },
};
