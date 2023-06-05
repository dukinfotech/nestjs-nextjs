import { ListPostsQuery } from "@/generated/graphql";
import { gql } from "@/generated";
import { getServerSession } from "next-auth";
import { getApolloClient } from "@/config/apollo";
import { SessionContextValue } from "next-auth/react";

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
  const apolloClient = await getApolloClient();
  const { loading, error, data } = await apolloClient.query<ListPostsQuery>({
    query: LIST_POSTS,
    fetchPolicy: "no-cache"
  });
  // TODO: Hiển thị lỗi 500 nếu server component lỗi
  return data;
}

export default async function ServerComponent() {
  const data = await fetchData();
  console.log(data.posts);

  return <h4>Server Component</h4>;
}
