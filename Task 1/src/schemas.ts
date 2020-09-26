import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {},
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {},
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
