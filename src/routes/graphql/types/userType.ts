import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";

export type Post = {
  id: string;
  name: string;
  balance: number;
};


const UserFields = {
  id: { type: UUIDType },
  name: { type: GraphQLString },
  balance: {type: GraphQLFloat},
}


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: UserFields,
});