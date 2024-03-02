import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId as MemberTypeIdFromSchema } from '../../member-types/schemas.js';

export type Member = {
  id: MemberTypeIdFromSchema | string;
  discount: number;
  postsLimitPerMonth: number;
};


export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'BASIC' },
    business: { value: "BUSINESS" },
  },
});

const MemberTypeFields = {
  id: { type: MemberTypeId },
  discount: { type: GraphQLFloat },
  postsLimitPerMonth: { type: GraphQLInt },
};

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: MemberTypeFields,
});