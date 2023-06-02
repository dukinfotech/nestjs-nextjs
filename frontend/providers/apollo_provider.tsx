"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloPrv,
  HttpLink,
  InMemoryCache,
  from,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  SessionContextValue,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";
import { RefreshTokensQuery } from "@/generated/graphql";

export const REFRESH_TOKENS = gql(
  `
    query refreshTokens {
      refreshTokens {
        accessToken
        refreshToken
      }
    }
  `
);

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  // Config apolloClient for ClientComponent (using useQuery hooks)
  const apolloClient = useMemo(() => {
    console.log(`Authentication Status: ${session.status}`);
    return getApolloClient(session);
  }, [session.status]);

  return <ApolloPrv client={apolloClient}>{children}</ApolloPrv>;
}

const getApolloClient = (session: SessionContextValue) => {
  const errorLink = initializeErrorLink(session);
  const httpLink = initializeHttpLink();
  const links = [errorLink, httpLink];

  if (session.status === "authenticated" && session) {
    const accessToken = session.data.user.accessToken;
    const authLink = initializeAuthLink(accessToken);
    links.unshift(authLink);
  }

  const apolloClient = initializeApolloClient(links);
  return apolloClient;
};

const initializeHttpLink = (appHost?: string) => {
  return new HttpLink({
    uri: `${appHost || ""}/api/graphql`,
    credentials: "same-origin", // Send the cookie along with every request
  });
};

const initializeErrorLink = (session: SessionContextValue) => {
  return onError(({ graphQLErrors, networkError }) => {
    if (networkError && process.env.NODE_ENV === "development") {
    }
    if (graphQLErrors) {
      graphQLErrors.forEach(
        async ({ message, locations, path, extensions }) => {
          if (process.env.NODE_ENV === "development") {
            console.info(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          }
          if (session.status === "authenticated") {
            await interceptErrors(session, path, extensions);
          }
        }
      );
    }
  });
};

const initializeAuthLink = (token: string) => {
  return setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });
};

const initializeApolloClient = (links: Array<ApolloLink>) => {
  const apolloClient = new ApolloClient({
    link: from(links),
    cache: new InMemoryCache(),
  });

  return apolloClient;
};

// Interceptor for issue refreshToken and redirect to signIn page
const interceptErrors = async (
  session: SessionContextValue,
  path: any,
  extensions: any
) => {
  if (extensions.originalError.statusCode === 401) {
    if (path.includes("refreshToken")) {
      // refreshToken was expired
      signIn();
    } else if (session.data?.user.refreshToken) {
      // Issue new set of accessToken and refreshToken
      const httpLink = initializeHttpLink();
      const authLink = initializeAuthLink(session.data.user.refreshToken);
      const apolloClient = initializeApolloClient([authLink, httpLink]);

      try {
        const result = await apolloClient.query<RefreshTokensQuery>({
          query: REFRESH_TOKENS,
          fetchPolicy: "no-cache",
        });
        session.update(result.data.refreshTokens);
      } catch (error) {
        console.log(error);
        signOut();
      }
    }
  }
};
