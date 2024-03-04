import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';

export interface CreateUserType {
  dto: {
    id: string;
    name: string;
    balance: number;
  };
}

export const CreateUserDTOType = new GraphQLInputObjectType({
  name: 'CreateUserDTOType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export interface ChangeUserType {
  id: string;
  dto: {
    id: string;
    name: string;
    balance: number;
  };
}

export const ChangeUserDTOType = new GraphQLInputObjectType({
  name: 'ChangeUserDTOType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});


export interface SubscribedToUserType {
  userId: string; 
  authorId: string; 
}
