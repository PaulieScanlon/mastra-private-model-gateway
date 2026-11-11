import { Mastra } from "@mastra/core/mastra";
import { MastraCompositeStore } from "@mastra/core/storage";
import { DuckDBStore } from "@mastra/duckdb";
import { MastraEditor } from "@mastra/editor";
import { LibSQLStore } from "@mastra/libsql";
import { MastraStorageExporter, Observability, SensitiveDataFilter } from "@mastra/observability";
import { researchAgent } from "./agents/research-agent";
import { privateGateway } from "./gateways/private-gateway";

export const mastra = new Mastra({
  bundler: {
    externals: ["@duckdb/node-bindings"]
  },
  gateways: { privateGateway },
  agents: { researchAgent },
  editor: new MastraEditor(),
  storage: new MastraCompositeStore({
    id: "composite-storage",
    default: new LibSQLStore({ id: "mastra-storage", url: "file:./mastra.db" }),
    domains: {
      observability: await new DuckDBStore().getStore("observability")
    }
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: "mastra-private-model-gateway",
        exporters: [new MastraStorageExporter()],
        spanOutputProcessors: [new SensitiveDataFilter()]
      }
    }
  })
});
