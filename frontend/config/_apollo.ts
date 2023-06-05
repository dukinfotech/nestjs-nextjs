import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation,
  from,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getServerSession, } from "next-auth";
import { authOptions } from "./auth";
import { onError } from "@apollo/client/link/error";
import { RefreshTokensQuery } from "@/generated/graphql";
import { redirect } from "next/navigation";

const REFRESH_TOKENS = gql(
  `
    query refreshTokens {
      refreshTokens {
        accessToken
        refreshToken
      }
    }
  `
);

enum TokenType {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

const initializeHttpLink = (appHost?: string) => {
  return new HttpLink({
    uri: `${appHost || ""}/api/graphql`,
    credentials: "same-origin", // Send the cookie along with every request
  });
};

const initializeAuthLink = async (tokenType: TokenType) => {
  return setContext(async (_, { headers }) => {
    const session = await getServerSession(authOptions);
    if (session) {
      session.user.accessToken = 'accessToken'
    }
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${session?.user[tokenType]}`,
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

const getApolloClient = async () => {
  const httpLink = initializeHttpLink(process.env.APP_HOST);
  const authLink = await initializeAuthLink(TokenType.accessToken);
  const apolloClient = initializeApolloClient([authLink, httpLink]);
  return apolloClient;
};

type Callback = (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => Promise<unknown>;

const performApolloClient = async (callback: Callback) => {
  const apolloClient = await getApolloClient();
  try {
    const data = await callback(apolloClient);
    return data;
  } catch (error) {
    if (error instanceof ApolloError && error.graphQLErrors) {
      const unAuthenticatedError = error.graphQLErrors.find(e => e.extensions.code === 'UNAUTHENTICATED')
      const isUnauthenticatedError = Boolean(unAuthenticatedError);
      const isRefreshTokenExpired = Boolean(isUnauthenticatedError && unAuthenticatedError?.path?.includes('refreshTokens'));
      if (isUnauthenticatedError) {
        if (isRefreshTokenExpired) {
          return redirect("/auth/signin");
        } else {
          console.log(11111111111111111111)
          // call update lai token hoac hack set vao cookie      
          const httpLink = initializeHttpLink(process.env.APP_HOST);
          const authLink = await initializeAuthLink(TokenType.refreshToken);
          const apolloClient = initializeApolloClient([authLink, httpLink]);
          
        }
      }
    }
  }
};

export { getApolloClient, performApolloClient };
