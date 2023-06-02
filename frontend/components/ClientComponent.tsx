"use client";

import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { LIST_POSTS } from "./ServerComponent";
import { signIn } from "next-auth/react";
import SignOutButton from "./modules/users/auth/SignOutButton";
import { Button } from "@nextui-org/react";
import useAuth from "@/hooks/useAuth";

export default function ClientComponent() {
  const [queryListPosts, { called, loading, data }] = useLazyQuery(LIST_POSTS);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      queryListPosts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && data) {
      console.log(data.posts);
    }
  }, [loading]);

  return (
    <>
      <h4>Client Component</h4>
      {isAuthenticated ? (
        <SignOutButton />
      ) : (
        <Button onPress={() => signIn()}>Sign In</Button>
      )}
    </>
  );
}
