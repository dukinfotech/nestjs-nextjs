import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Singleton } from "./singleton";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { SessionContextValue, signIn, signOut } from "next-auth/react";
import { REFRESH_TOKENS } from "@/providers/apollo_provider";
import { RefreshTokensQuery } from "@/generated/graphql";
import { onError } from "@apollo/client/link/error";

enum TokenType {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

const getApolloClient = async () => {
  const errorLink = await initializeErrorLink();
  const httpLink = initializeHttpLink();
  const authLink = await initializeAuthLink(TokenType.accessToken);

  const apolloClient = initializeApolloClient([errorLink, authLink, httpLink]);
  return apolloClient;
};

const initializeHttpLink = () => {
  return new HttpLink({
    uri: `${process.env.APP_HOST}/api/graphql`,
    credentials: "same-origin", // Send the cookie along with every request
  });
};

const initializeErrorLink = async () => {
  const session = await getServerSession();
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
          if (session) {
            await interceptErrors(session, path, extensions);
          }
        }
      );
    }
  });
};

const initializeAuthLink = async (tokenType: TokenType) => {
  const session = await getServerSession();
  const token = tokenType === TokenType.accessToken ? session?.user.accessToken : session?.user.refreshToken;
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
  session: Session,
  path: any,
  extensions: any
) => {
  if (extensions.originalError.statusCode === 401) {
    if (path.includes("refreshToken")) {
      // refreshToken was expired
      signIn();
    } else if (session.user.refreshToken) {
      // Issue new set of accessToken and refreshToken
      const httpLink = initializeHttpLink();
      const authLink = await initializeAuthLink(TokenType.refreshToken);
      const apolloClient = initializeApolloClient([authLink, httpLink]);

      try {
        const result = await apolloClient.query<RefreshTokensQuery>({
          query: REFRESH_TOKENS,
          fetchPolicy: "no-cache",
        });
        console.log('=======================', result)
        session.user = { ...session.user, ...result.data };
      } catch (error) {
        console.log(error);
        signOut();
      }
    }
  }
};

export { getApolloClient };
