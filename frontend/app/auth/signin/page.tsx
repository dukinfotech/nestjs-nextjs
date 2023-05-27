"use client";

import { gql } from "@/generated";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SIGN_IN = gql(
  `
    query signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        name,
        username,
        email,
      }
    }
  `
);

type SignInForm = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const signInFormDefault: SignInForm = {
    email: "admin@example.com",
    password: "@Password888",
  };
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [signInForm, setSignInForm] = useState<SignInForm>(signInFormDefault);
  const [signInQuery, { called, loading, data }] = useLazyQuery(SIGN_IN, {
    variables: signInForm
  });

  const handleSignIn = async () => {
    if (signInForm.email && signInForm.password) {
      await signInQuery();
      if (called && data) {
        signIn("credentials", { redirect: false, ...data.signIn, callbackUrl });
      }
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      open
      preventClose
      blur
      animated={false}
    >
      <Modal.Header>
        <Text h3>Login</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          initialValue={signInFormDefault.email}
          shadow={false}
          labelPlaceholder="Email"
          type="email"
          status="default"
          onBlur={(e) =>
            setSignInForm({ ...signInForm, email: e.target.value })
          }
        />
        <Spacer y={0.1} />
        <Input
          initialValue={signInFormDefault.password}
          shadow={false}
          labelPlaceholder="Password"
          type="password"
          status="default"
          onBlur={(e) =>
            setSignInForm({ ...signInForm, password: e.target.value })
          }
        />
        <Row justify="space-between">
          <Checkbox>Remember me</Checkbox>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={handleSignIn}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
