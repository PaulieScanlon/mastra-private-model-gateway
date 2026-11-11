import { Agent } from "@mastra/core/agent";
import { webFetchTool } from "@mastra/core/tools";
import { Memory } from "@mastra/memory";
import { webSearchTool } from "../tools/web-search-tool";

export const researchAgent = new Agent({
  id: "research-agent",
  name: "Research Agent",
  instructions: `You research questions on the web. Search first, fetch a page only when the excerpts aren't enough, and answer briefly with the URLs you used.`,
  model: "private/ollama/gpt-oss:20b",
  defaultOptions: { maxSteps: 10 },
  memory: new Memory(),
  tools: { webSearch: webSearchTool, webFetch: webFetchTool }
});
