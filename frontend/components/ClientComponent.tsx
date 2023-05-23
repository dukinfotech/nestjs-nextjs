'use client';

import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

export default function ClientComponent() {
	const postsQuery = gql`
    query {
      posts {
        id
        title
      }
    }
  `;

	const { loading, error, data } = useQuery(postsQuery);

	useEffect(() => {
		if (data) {
			console.log(data);
		}
	}, [data]);

	return (
		<h4>Client Component</h4>
	)
}