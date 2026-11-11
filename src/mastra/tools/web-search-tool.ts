import { createTool } from "@mastra/core/tools";
import Exa from "exa-js";
import { z } from "zod";

const exa = new Exa(process.env.EXA_API_KEY);

export const webSearchTool = createTool({
  id: "web-search",
  description: "Searches the web. Returns the title, URL and key excerpts of the top results.",
  inputSchema: z.object({
    query: z.string().describe("What to search for")
  }),
  execute: async ({ query }) => {
    const response = await exa.search(query, {
      type: "auto",
      numResults: 5,
      contents: { highlights: true }
    });
    return response.results.map((result) => {
      return { title: result.title, url: result.url, highlights: result.highlights };
    });
  }
});
