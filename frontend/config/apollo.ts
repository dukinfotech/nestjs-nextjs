import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { Singleton } from './singleton';

const singleton = Singleton.getInstance();
let _apolloClient = singleton.apolloClient;

if (!_apolloClient) {
  const httpLink = new HttpLink({
    uri: process.env.APP_HOST + '/api/graphql',
    credentials: 'same-origin' // Send the cookie along with every request
  });

  _apolloClient = new ApolloClient({
    link: from([
      httpLink
    ]),
    cache: new InMemoryCache(),
  });

  Singleton.setInstance({ ...singleton, apolloClient: _apolloClient });
}

const apolloClient = _apolloClient!

export { apolloClient };

