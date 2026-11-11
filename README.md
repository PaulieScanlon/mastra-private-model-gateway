# mastra-private-model-gateway

A Mastra research agent that runs OpenAI's open-weight `gpt-oss:20b` on your machine with Ollama, routed through a custom model gateway (`private/ollama/gpt-oss:20b`). It searches the web with Exa.

## 1. Install and start the local model

Install Ollama, either the desktop app from [ollama.com](https://ollama.com) or with Homebrew:

```bash title="Terminal"
brew install ollama
```

Download the model (about 13GB, needs around 16GB of memory):

```bash title="Terminal"
ollama pull gpt-oss:20b
```

Start the server. Skip this if the Ollama desktop app is open, since it runs the same server in the background:

```bash title="Terminal"
ollama serve
```

`ollama serve` keeps running and logs each request to the terminal, so leave it open in its own tab.

Check it's running at `http://localhost:11434`. The page should say "Ollama is running".

## 2. Set up the project

```bash title="Terminal"
npm install
```

Add an [Exa](https://exa.ai) API key to `.env` for web search:

```bash title=".env"
EXA_API_KEY=your-key
```

No model API key is needed. Ollama doesn't check one.

## 3. Start the Mastra dev server

```bash title="Terminal"
npm run dev
```

## 4. Chat to the agent

1. Open Studio at `http://localhost:4111`.
2. Go to **Agents** and open **Research Agent**.
3. Send:

   > What's the best way to deploy Ollama gpt-oss on AWS?

The agent searches with Exa, reads pages when it needs more detail, and answers with sources. Expect 20–60 seconds, since the model runs locally.

Studio's model picker shows "Select provider / Select model" for this agent. That's a Studio display bug with gateway models; the agent still runs on `private/ollama/gpt-oss:20b`.
