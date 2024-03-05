import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { User as UserTypeFromPrisma } from '@prisma/client';
import prismaClient from './context.js';
import { ProfileType } from './profileType.js';
import { PostsType } from './postType.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: UserTypeFromPrisma) =>
        await prismaClient.profile.findUnique({ where: { userId: id } }),
    },
    posts: {
      type: PostsType as GraphQLList<GraphQLObjectType>,
      resolve: async ({ id }: UserTypeFromPrisma) =>
        await prismaClient.post.findMany({ where: { authorId: id } }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: UserTypeFromPrisma) =>
        await prismaClient.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: UserTypeFromPrisma) =>
        await prismaClient.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        }),
    },
  }),
});
