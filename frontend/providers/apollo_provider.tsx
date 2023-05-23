'use client';

import { ApolloClient, ApolloProvider as ApolloPrv, HttpLink, InMemoryCache, from } from "@apollo/client"

export default function ApolloProvider({
    children,
  }: {
    children: React.ReactNode
  }) {

	// Config apolloClient for ClientComponent (using useQuery hooks)
	const apolloClient = initializeApolloClient();

	return (
		<ApolloPrv client={apolloClient}>
			{children}
		</ApolloPrv>
	)
}

const initializeApolloClient = () => {
	const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin' // Send the cookie along with every request
  });

  const apolloClient = new ApolloClient({
    link: from([
      httpLink
    ]),
    cache: new InMemoryCache(),
  });

	return apolloClient;
}