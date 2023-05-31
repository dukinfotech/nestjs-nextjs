import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Singleton } from './singleton';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

const singleton = Singleton.getInstance();
let _apolloClient = singleton.apolloClient;

if (!_apolloClient) {
  const httpLink = new HttpLink({
    uri: process.env.APP_HOST + '/api/graphql',
    credentials: 'same-origin' // Send the cookie along with every request
  });
  const authLink = setContext(async (_, { headers }) => {
    const session = await getServerSession(authOptions);
    return {
      headers: {
        ...headers,
        authorization: session ? `Bearer ${session.user.accessToken}` : '',
      },
    };
  });

  _apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  Singleton.setInstance({ ...singleton, apolloClient: _apolloClient });
}

const apolloClient = _apolloClient!

export { apolloClient };

