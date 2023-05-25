'use client';

import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { LIST_POSTS } from "./ServerComponent";

export default function ClientComponent() {
	const { loading, error, data } = useQuery(LIST_POSTS)

	useEffect(() => {
		if (data) {
			console.log(data.posts);
		}
	}, [data]);

	return (
		<h4>Client Component</h4>
	)
}