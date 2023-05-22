import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.APP_URL + '/api/graphql',
  credentials: 'same-origin' // Send the cookie along with every request
})
export const apolloClient = new ApolloClient({
  link: from([
    httpLink
  ]),
  cache: new InMemoryCache(),
});