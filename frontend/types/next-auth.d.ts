import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      name: string,
      username: string,
      email: string,
      role: string,
      access_token: string,
      createdAt: Date,
      updatedAt: Date,
      deletedAt?: Date
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string,
    name: string,
    username: string,
    email: string,
    role: string,
    access_token: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
  }
}