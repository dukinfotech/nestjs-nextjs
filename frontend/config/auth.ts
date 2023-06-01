import { SignInResponse } from "@/generated/graphql";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  jwt: {
    secret: process.env.APP_SECRET,
    maxAge: Number(process.env.APP_ACCESS_TOKEN_EXPIRE_IN)
  },
  providers: [
    // Login with email and password
    // The authorize flow: authorize() => encode() => jwt() => session()
    CredentialsProvider({
      credentials: {}, // Define fields in sign-in form if using Next-auth's default pages
      async authorize(signInResponse: any) {
        if (signInResponse) {
          return signInResponse;
        } else {
          // TODO: Translate
          throw new Error("translate: Sai ten tai khoan hoac mat khau");
        }
      },
    }),
  ],
  callbacks: {
    // Attach more data to JWT from the return of the authorize method
    async jwt({ token, user }) {
      const signInUser = user as SignInResponse;
      if (signInUser) {
        token = { ...token, ...signInUser };
      }
      return token;
    },
    // Attach more data to session from the return of the jwt method
    async session({ session, token }) {
      session.user = { ...session.user, ...token };
      return session;
    },
  },
};
