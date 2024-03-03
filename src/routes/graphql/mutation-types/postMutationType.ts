import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { UUIDType } from "../types/uuid.js";

export interface CreatePostType {
  dto: {
    authorId: string;
    title: string;
    content: string;
  };
}

export const CreatePostDTOType = new GraphQLInputObjectType({
  name: 'CreatePostType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});


export interface ChangePostType {
  id: string;
  dto: {
    authorId: string;
    title: string;
    content: string;
  };
};

export const ChangePostDTOType = new GraphQLInputObjectType({
  name: 'ChangePostType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});