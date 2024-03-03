import prismaClient from './types/context.js';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './types/memberType.js';
import { MemberType as MemberTypeFromPrisma, PrismaClient  } from '@prisma/client';


export const RootQuery = new GraphQLObjectType<unknown, PrismaClient>({
  name: 'RootQueryType',
  fields: {
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: MemberTypeFromPrisma) =>
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
