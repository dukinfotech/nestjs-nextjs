"use client";

import {
  ApolloClient,
  ApolloProvider as ApolloPrv,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = useSession();

  // Config apolloClient for ClientComponent (using useQuery hooks)
  const apolloClient = useMemo(() => {
    return initializeApolloClient(data?.user.accessToken);
  }, [status]);

  return <ApolloPrv client={apolloClient}>{children}</ApolloPrv>;
}

const initializeApolloClient = (accessToken?: string) => {
  const httpLink = new HttpLink({
    uri: "/api/graphql",
    credentials: "same-origin", // Send the cookie along with every request
  });
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return apolloClient;
};
