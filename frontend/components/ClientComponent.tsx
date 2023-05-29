"use client";

import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { LIST_POSTS } from "./ServerComponent";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ClientComponent() {
  const [queryListPosts, { called, loading, data }] = useLazyQuery(LIST_POSTS);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (isAuthenticated) {
      queryListPosts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (called && !loading) {
      console.log(data?.posts);
    }
  }, [loading]);

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
