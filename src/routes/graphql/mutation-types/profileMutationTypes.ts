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
  name: 'CreateProfileDTOType',
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
    userId: string;
  };
};


export const ChangeProfileDTOType = new GraphQLInputObjectType({
  name: 'ChangeProfileDTOType',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  }),
});