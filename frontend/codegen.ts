import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3500/DB",
  documents: ["src/graphql/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
    "./src/generated/graphql-request-sdk.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        includeDirectives: true,
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
