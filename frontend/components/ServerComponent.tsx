import { apolloClient } from '../config/apollo';
import { gql } from '@apollo/client';

async function fetchData() {
  const postsQuery = gql`
    query {
      posts {
        id
        title
      }
    }
  `;

  const { loading, error, data } = await apolloClient.query({ query: postsQuery });
  return data;
};

export default async function ServerComponent() {
  const data = await fetchData();
  console.log(data);

  return (
		<h4>Server Component</h4>
	)
}