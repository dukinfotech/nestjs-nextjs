import { ListPostsQuery } from "@/generated/graphql";
import { apolloClient } from "../config/apollo";
import { gql } from "@/generated";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

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
  });
  // TODO: Hiển thị lỗi 500 nếu server component lỗi
  return data;
}

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (session) {
    // const data = await fetchData();
    // console.log(data.posts);
  }

  return <h4>Server Component</h4>;
}
