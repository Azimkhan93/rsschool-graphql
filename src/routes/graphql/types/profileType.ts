import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { Profile as ProfileTypeFromPrisma } from '@prisma/client';
import { MemberType, MemberTypeId } from './memberType.js';
import { UUIDType } from './uuid.js';
import { UserType } from './userType.js';
import prismaClient from './context.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async ({ userId }: ProfileTypeFromPrisma, __: unknown) =>
        await prismaClient.user.findUnique({ where: { id: userId } }),
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async ({ memberTypeId }: ProfileTypeFromPrisma, __: unknown) =>
        await prismaClient.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);
