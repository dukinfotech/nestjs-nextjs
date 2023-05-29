import { User } from "@/generated/graphql";
import type { NextAuthOptions } from "next-auth";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encode: async ({ token: user, secret }: JWTEncodeParams) => {
      const payload = {
        id: user!.id,
        email: user!.email
      };
      const encodedToken = jwt.sign(payload, secret, {
        expiresIn: Number(process.env.NEXTAUTH_JWT_EXPIRE),
        algorithm: "HS512",
      });
      return encodedToken;
    },
    decode: async ({ token, secret }: JWTDecodeParams) => {
      const decodedPayload = jwt.verify(token!, secret) as JWT;
      return decodedPayload;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {}, // Define fields in sign-in form if using Next-auth's default pages
      async authorize(user: any) {
        if (user.id) {
          return user;
        } else {
          // TODO: Translate
          throw new Error("translate: Sai ten tai khoan hoac mat khau");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const myUser = user as User
      return {
        ...token,
        ...myUser
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token
      }
    },
  },
};
