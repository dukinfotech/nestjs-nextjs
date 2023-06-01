"use client";

import { gql } from "@/generated";
import { useMutation } from "@apollo/client";
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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SIGN_IN = gql(
  `
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        id
        name
        username
        email
        roles {
          name
        }
        accessToken
        refreshToken
        createdAt
        updatedAt
        deletedAt
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
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const [signInForm, setSignInForm] = useState<SignInForm>(signInFormDefault);
  const [mutateSignIn, { called, loading, data }] = useMutation(SIGN_IN);

  const handleSignIn = async () => {
    if (signInForm.email && signInForm.password) {
      await mutateSignIn({ variables: signInForm });
    }
  };

  useEffect(() => {
    if (called && !loading) {
      const payload = data ? data.signIn : null;
      signIn("credentials", { ...payload, callbackUrl });
    }
  }, [loading]);

  // TODO: UI/UX
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
        {error && (
          <Text h3 color="error">
            {error}
          </Text>
        )}
        <Spacer y={0.1} />
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
