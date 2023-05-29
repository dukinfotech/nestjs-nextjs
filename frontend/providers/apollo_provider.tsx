'use client';

import { ApolloClient, ApolloProvider as ApolloPrv, HttpLink, InMemoryCache, from } from "@apollo/client"
import { useSession } from "next-auth/react";

import { useEffect } from "react";

export default function ApolloProvider({
    children,
  }: {
    children: React.ReactNode
  }) {

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    
  }, [isAuthenticated]);

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