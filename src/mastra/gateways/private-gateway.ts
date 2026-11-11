import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { MastraModelGatewayInterface } from "@mastra/core/llm";

export const privateGateway: MastraModelGatewayInterface = {
  id: "private",
  name: "Private Gateway",
  fetchProviders: async () => {
    return {
      ollama: {
        name: "Ollama",
        models: ["gpt-oss:20b"],
        apiKeyEnvVar: [],
        gateway: "private",
        url: "http://localhost:11434/v1"
      }
    };
  },
  buildUrl: () => {
    return "http://localhost:11434/v1";
  },
  getApiKey: async () => {
    return "";
  },
  resolveLanguageModel: ({ modelId, providerId, apiKey }) => {
    return createOpenAICompatible({
      name: providerId,
      apiKey,
      baseURL: "http://localhost:11434/v1"
    }).chatModel(modelId);
  }
};
