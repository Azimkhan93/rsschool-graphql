import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { Post as PostTypeFromPrisma } from '@prisma/client';
import { UserType } from './userType.js';
import prismaClient from './context.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    author: {
      type: UserType as GraphQLObjectType,
      resolve: async ({ authorId }: PostTypeFromPrisma, _: unknown) =>
        prismaClient.user.findUnique({ where: { id: authorId } }),
    },
  }),
});

export const PostsType = new GraphQLList(PostType);
