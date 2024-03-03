import prismaClient from './types/context.js';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './types/memberType.js';
import {
  MemberType as MemberTypeFromPrisma,
  Post as PostTypeFromPrisma,
  Profile as ProfileTypeFromPrisma,
  User as UserTypeFromPrisma,
  PrismaClient,
} from '@prisma/client';
import { PostType } from './types/postType.js';
import { UUIDType } from './types/uuid.js';
import { ProfileType } from './types/profileType.js';
import { UserType } from './types/userType.js';

export const RootQuery = new GraphQLObjectType<unknown, PrismaClient>({
  name: 'RootQueryType',
  fields: {
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: MemberTypeFromPrisma) =>
        await prismaClient.memberType.findUnique({
          where: { id },
        }),
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async () => {
        return prismaClient.memberType.findMany();
      },
    },

    post: {
      type: PostType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: PostTypeFromPrisma) =>
        await prismaClient.post.findUnique({
          where: { id },
        }),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async () => {
        return prismaClient.post.findMany();
      },
    },

    profile: {
      type: ProfileType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: ProfileTypeFromPrisma) =>
        await prismaClient.profile.findUnique({
          where: { id },
        }),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async () => {
        return prismaClient.profile.findMany();
      },
    },

    user: {
      type: UserType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: UserTypeFromPrisma) =>
        await prismaClient.user.findUnique({
          where: { id },
        }),
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return prismaClient.user.findMany();
      },
    },

  },
});
