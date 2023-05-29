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
      createdAt: Date,
      updatedAt: Date,
      deletedAt?: Date
    };
  }
}

declare module "next-auth/jwt" {
  // Mapping data from authorize method's return
  interface JWT {
    id: string,
    name: string,
    username: string,
    email: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
  }
}