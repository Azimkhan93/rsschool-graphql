import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { MemberTypeId as MemberTypeIdFromSchema } from '../../member-types/schemas.js';
import { MemberTypeId } from '../types/memberType.js';
import { UUIDType } from '../types/uuid.js';

export interface CreateProfileType {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: MemberTypeIdFromSchema;
    userId: string;
  };
}

export const CreateProfileDTOType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  }),
});


export interface ChangeProfileType {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: MemberTypeIdFromSchema;
  };
};


export const ChangeProfileDTOType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});