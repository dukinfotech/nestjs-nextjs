"use client";

import { gql } from "@/generated";
import { useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export const SIGN_OUT = gql(
  `
    mutation signOut {
      signOut
    }
  `
);

export default function SignOutButton() {
  const [mutateSignOut, { called, loading, data }] = useMutation(SIGN_OUT);

  useEffect(() => {
    if (called && !loading) {
      if (data && data.signOut) {
        signOut();
      }
    }
  }, [loading]);

  return <Button onPress={() => mutateSignOut()}>Sign Out</Button>;
}
