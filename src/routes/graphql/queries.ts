import { PrismaClient } from '@prisma/client';

import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Member, MemberType, MemberTypeId } from './types/memberType.js';
// import { UUIDType } from './types/uuid.js';
const prismaClient = new PrismaClient();

export const RootQuery = new GraphQLObjectType<unknown, PrismaClient>({
  name: 'RootQueryType',
  fields: {
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: Member) =>
        await prismaClient.memberType.findUnique({
          where: { id },
        }),
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async () => {
        return prismaClient.memberType.findMany()},
    },
  },
});
