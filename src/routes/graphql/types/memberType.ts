import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId as MemberTypeIdFromSchema } from '../../member-types/schemas.js';
import { ProfilesType } from './profileType.js';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export type Member = {
  id: MemberTypeIdFromSchema | string;
  discount: number;
  postsLimitPerMonth: number;
};

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeIdFromSchema.BASIC },
    business: { value: MemberTypeIdFromSchema.BUSINESS },
  },
});


export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async ({ id }: Member ) => {
        await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});
