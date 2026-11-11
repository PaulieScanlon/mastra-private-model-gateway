import "dotenv/config";
import { mastra } from "../src/mastra/index";

const agent = mastra.getAgent("researchAgent");
const result = await agent.generate(process.argv[2] ?? "What is the latest version of Ollama?");
console.log("tools:", result.toolCalls.map((call) => JSON.stringify(call.payload.args)).join("\n       "));
console.log("\n" + result.text);
process.exit(0);
