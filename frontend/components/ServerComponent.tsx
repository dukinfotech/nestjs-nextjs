import { ListPostsQuery } from '@/generated/graphql';
import { apolloClient } from '../config/apollo';
import { gql } from "@/generated";

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

async function fetchData() {
  const { loading, error, data } = await apolloClient!.query<ListPostsQuery>({ query: LIST_POSTS });
  return data;
};

export default async function ServerComponent() {
  const data = await fetchData();
  console.log(data.posts);

  return (
		<h4>Server Component</h4>
	)
}