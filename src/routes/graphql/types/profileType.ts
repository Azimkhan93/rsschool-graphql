import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberTypeId as MemberTypeIdFromSchema } from "../../member-types/schemas.js";
import { MemberTypeId } from "./memberType.js";
import { UUIDType } from "./uuid.js";


export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeIdFromSchema | string;
};

const ProfileFields = {
  id: {type: new GraphQLNonNull(UUIDType)},
  isMale: {type: GraphQLBoolean},
  yearOfBirth: {type: GraphQLInt},
  userId: {type: UUIDType},
  memberTypeId: {type: MemberTypeId },
};

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: ProfileFields,
});

export const ProfilesType = new GraphQLList(ProfileType);