import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from './types/postType.js';
import {
  ChangePostType,
  CreatePostDTOType,
  CreatePostType,
} from './mutation-types/postMutationType.js';
import prismaClient from './types/context.js';
import { UUIDType } from './types/uuid.js';
import { ProfileType } from './types/profileType.js';
import { CreateProfileDTOType, CreateProfileType } from './mutation-types/profileMutationTypes.js';
import { UserType } from './types/userType.js';
import { CreateUserDTOType, CreateUserType } from './mutation-types/userMutationTypes.js';

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
    
    createProfile: {
      type: ProfileType as GraphQLObjectType,
      args: { dto: { type: CreateProfileDTOType } },
      resolve: async (_: unknown, { dto }: CreateProfileType) =>
        await prismaClient.profile.create({
          data: dto,
        }),
    },

    createUser: {
      type: UserType as GraphQLObjectType,
      args: { dto: { type: CreateUserDTOType } },
      resolve: async (_: unknown, { dto }: CreateUserType) =>
        await prismaClient.user.create({
          data: dto,
        }),
    },
  }),
});
