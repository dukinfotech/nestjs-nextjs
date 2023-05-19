// https://www.apollographql.com/docs/react/development-testing/static-typing/
import { CodegenConfig } from "@graphql-codegen/cli";
import * as path from "path";
import * as dotenv from "dotenv";

// This is the config file that generates TypeScript definitions automatically and is not related to Nextjs.
// So need to configure dotenv library separately.
dotenv.config({
  path: path.join(path.dirname(process.cwd()), ".env"),
});

const config: CodegenConfig = {
  schema: path.join(
    path.dirname(process.cwd()),
    "backend",
    process.env.BACKEND_GRAPHQL_DEFINITION_PATH as string
  ),
  documents: ["app/**/*.tsx"],
  generates: {
    "./generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
