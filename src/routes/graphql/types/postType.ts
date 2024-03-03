import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

const PostFields = {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
};

export const PostType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: PostFields,
});

export const PostsType = new GraphQLList(PostType);