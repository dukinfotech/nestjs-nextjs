"use client";

import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { LIST_POSTS } from "./ServerComponent";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ClientComponent() {
  const { loading, error, data } = useQuery(LIST_POSTS);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (data) {
      console.log(data.posts);
    }
  }, [data]);

  return (
    <>
      <h4>Client Component</h4>
      {!isAuthenticated ? (
        <Button onPress={() => signIn()}>Sign In</Button>
      ) : (
        <Button onPress={() => signOut()}>Sign Out</Button>
      )}
    </>
  );
}
