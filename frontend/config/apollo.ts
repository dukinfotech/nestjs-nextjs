import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.BACKEND_URL + '/graphql',
  cache: new InMemoryCache(),
});