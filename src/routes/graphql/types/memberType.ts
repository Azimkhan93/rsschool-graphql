import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId as MemberTypeIdFromSchema } from '../../member-types/schemas.js';
import { MemberType as MemberTypeFromPrisma } from '@prisma/client';
import { ProfilesType } from './profileType.js';
import prismaClient from './context.js';

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
      type: ProfilesType as GraphQLList<GraphQLObjectType>,
      resolve: async ({ id }: MemberTypeFromPrisma ) => {
        await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});
