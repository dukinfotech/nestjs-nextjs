'use client';

import { gql } from "@/generated";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

export const LIST_POSTS = gql(
	`
    query listPosts {
      posts {
        id
        title
      }
    }
  `
);

export default function ClientComponent() {
	

	const { loading, error, data } = useQuery(LIST_POSTS)

	useEffect(() => {
		if (data) {
			console.log(data);
		}
	}, [data]);

	return (
		<h4>Client Component</h4>
	)
}