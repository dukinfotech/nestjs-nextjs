/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  _count: CategoryCount;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  posts: Scalars['Int']['output'];
};

export type Post = {
  __typename?: 'Post';
  _count: PostCount;
  author: User;
  authorId: Scalars['String']['output'];
  categories?: Maybe<Array<Category>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  like: Scalars['Int']['output'];
  publishDate?: Maybe<Scalars['DateTime']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
  thumbNailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostCount = {
  __typename?: 'PostCount';
  categories: Scalars['Int']['output'];
  tags: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  tiktok?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<Array<Post>>;
  signIn: SignInResponse;
};


export type QuerySignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignInResponse = {
  __typename?: 'SignInResponse';
  _count: UserCount;
  accessToken: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  profile?: Maybe<Profile>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  _count: TagCount;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  posts?: Maybe<Array<Post>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TagCount = {
  __typename?: 'TagCount';
  posts: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  profile?: Maybe<Profile>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  posts: Scalars['Int']['output'];
};

export type SignInQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'SignInResponse', id: string, name: string, username: string, email: string, role: Role, accessToken: string, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type ListPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string }> | null };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<SignInQuery, SignInQueryVariables>;
export const ListPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<ListPostsQuery, ListPostsQueryVariables>;