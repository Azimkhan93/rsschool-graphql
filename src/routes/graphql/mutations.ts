import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from './types/postType.js';
import {
  ChangePostType,
  CreatePostDTOType,
  CreatePostType,
} from './mutation-types/postMutationType.js';
import prismaClient from './types/context.js';
import { UUIDType } from './types/uuid.js';

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

    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: CreatePostDTOType },
      },
      resolve: async (_: unknown, { id, dto }: ChangePostType) =>
        await prismaClient.post.update({ where: { id }, data: dto }),
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_: unknown, id: string) =>
        await prismaClient.post.delete({ where: { id } }),
    },

  }),
});
