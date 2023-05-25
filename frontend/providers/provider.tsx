"use client";

import ApolloProvider from "./apollo_provider";
import NextUIProvider from "./nextui_provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ApolloProvider>
  );
}
