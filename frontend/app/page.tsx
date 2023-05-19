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

  const { data } = await apolloClient.query({ query: postsQuery });
  return data;
};

export default async function Home() {
  const data = await fetchData();
  console.log(data);

  return (
    <main>
      <ul>
        <li></li>
      </ul>
    </main>
  )
}