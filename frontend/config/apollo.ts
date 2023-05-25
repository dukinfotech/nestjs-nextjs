import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { Singleton } from './singleton';

const singleton = Singleton.getInstance();
let apolloClient = singleton.apolloClient;

if (!apolloClient) {
  const httpLink = new HttpLink({
    uri: process.env.BACKEND_URL + '/graphql',
    credentials: 'same-origin' // Send the cookie along with every request
  });

  apolloClient = new ApolloClient({
    link: from([
      httpLink
    ]),
    cache: new InMemoryCache(),
  });
  Singleton.setInstance({ ...singleton, apolloClient });
}

export { apolloClient };

