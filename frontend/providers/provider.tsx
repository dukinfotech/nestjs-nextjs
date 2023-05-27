"use client";

import { SessionProvider } from "next-auth/react";
import ApolloProvider from "./apollo_provider";
import NextUIProvider from "./nextui_provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
