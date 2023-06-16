import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Singleton } from "./singleton";
import { Session } from "next-auth";
import { authOptions } from "./auth";
import { SessionContextValue, signIn, signOut } from "next-auth/react";
import { REFRESH_TOKENS } from "@/providers/apollo_provider";
import { RefreshTokensQuery } from "@/generated/graphql";
import { onError } from "@apollo/client/link/error";
import { print } from 'graphql';
import { getServerSession } from "./next-auth";
import { redirect } from "next/navigation";

export enum TokenType {
  accessToken,
  refreshToken
}

const getApolloClient = async () => {
  const errorLink = await initializeErrorLink();
  const authLink = await initializeAuthLink(TokenType.accessToken);
  const httpLink = initializeHttpLink();
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
  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) console.error(`[Network error]: ${networkError}`);
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        if (session) {
          interceptErrors(session, path, extensions).then(() => {
            forward(operation)
          })
        }
      });
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
      // TODO redirect LOGIN
      signIn();
    } else if (session.user.refreshToken) {
      try {
        const result = await fetch(`${process.env.APP_HOST}/api/graphql`, {
          method: 'POST',
          headers: {
            accept: '*/*',
            'content-type': 'application/json',
            authorization: `Bearer ${session.user.refreshToken}`,
          },
          body: JSON.stringify({
            query: REFRESH_TOKENS,
            operationName: 'RefreshTokens',
          })  
        });
        console.log('222', result.status) // TODO check why return 400?
        // TODO update session
      } catch (error) {
        console.log(`Bearer ${session.user.refreshToken}`)
        console.error(error);
        // TODO signOut
        signOut();
      }
    }
  }
};

export { getApolloClient };
