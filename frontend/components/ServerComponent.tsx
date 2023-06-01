import { ListPostsQuery } from "@/generated/graphql";
import { apolloClient } from "../config/apollo";
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
