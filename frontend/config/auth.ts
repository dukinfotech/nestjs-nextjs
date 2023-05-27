import { User } from "@/generated/graphql";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // The maximum age of the NextAuth.js issued JWT in seconds (default 30 days)
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        return credentials as User;
      },
    }),
  ]
};
