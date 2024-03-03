import { GraphQLObjectType } from 'graphql';
import { PostType } from './types/postType.js';
import { CreatePostDTOType, CreatePostType } from './mutation-types/postMutationType.js';
import prismaClient from './types/context.js';

export const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostDTOType } },
      resolve: async (_: unknown, { dto }: CreatePostType) =>
        await prismaClient.post.create({
          data: dto,
        }),
    },
  }),
});
