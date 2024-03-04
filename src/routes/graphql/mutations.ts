import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from './types/postType.js';
import {
  ChangePostDTOType,
  ChangePostType,
  CreatePostDTOType,
  CreatePostType,
} from './mutation-types/postMutationType.js';
import prismaClient from './types/context.js';
import { UUIDType } from './types/uuid.js';
import { ProfileType } from './types/profileType.js';
import {
  ChangeProfileDTOType,
  ChangeProfileType,
  CreateProfileDTOType,
  CreateProfileType,
} from './mutation-types/profileMutationTypes.js';
import { UserType } from './types/userType.js';
import {
  ChangeUserDTOType,
  ChangeUserType,
  CreateUserDTOType,
  CreateUserType,
  SubscribedToUserType,
} from './mutation-types/userMutationTypes.js';

export const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(CreatePostDTOType) } },
      resolve: async (_: unknown, { dto }: CreatePostType) =>
        await prismaClient.post.create({
          data: dto,
        }),
    },

    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangePostDTOType },
      },
      resolve: async (_: unknown, { id, dto }: ChangePostType) =>
        await prismaClient.post.update({ where: { id }, data: dto }),
    },

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_: unknown, id: string) => {
        try {
          await prismaClient.post.delete({ where: { id } });
        } catch (err) {
          return false;
        }
        return true;
      },
    },

    createProfile: {
      type: ProfileType as GraphQLObjectType,
      args: { dto: { type: CreateProfileDTOType } },
      resolve: async (_: unknown, { dto }: CreateProfileType) =>
        await prismaClient.profile.create({
          data: dto,
        }),
    },

    changeProfile: {
      type: ProfileType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeProfileDTOType },
      },
      resolve: async (_: unknown, { id, dto }: ChangeProfileType) =>
        await prismaClient.profile.update({ where: { id }, data: dto }),
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_: unknown, id: string) => {
        try {
          await prismaClient.profile.delete({ where: { id } });
        } catch (err) {
          return false;
        }
        return true;
      },
    },

    createUser: {
      type: UserType as GraphQLObjectType,
      args: { dto: { type: CreateUserDTOType } },
      resolve: async (_: unknown, { dto }: CreateUserType) =>
        await prismaClient.user.create({
          data: dto,
        }),
    },

    changeUser: {
      type: UserType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeUserDTOType },
      },
      resolve: async (_: unknown, { id, dto }: ChangeUserType) =>
        await prismaClient.user.update({ where: { id }, data: dto }),
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_: unknown, id: string) => {
        try {
          await prismaClient.user.delete({ where: { id } });
        } catch (err) {
          return false;
        }
        return true;
      },
    },

    subscribeTo: {
      type: UserType as GraphQLObjectType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _: unknown,
        { userId, authorId }: SubscribedToUserType,
      ) =>
        await prismaClient.user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        }),
    },

    unsubscribeFrom: {
      type: UUIDType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _: unknown,
        { userId, authorId }: SubscribedToUserType,
      ) => {
        await prismaClient.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId,
            },
          },
        });
        return userId;
      },}
    
  }),
});
