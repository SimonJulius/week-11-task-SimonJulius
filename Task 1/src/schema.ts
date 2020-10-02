import { GraphQLObjectType, GraphQLSchema } from "graphql";

import resolvers from "./controllers/resolvers";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    organizations: resolvers.getAll(),

    organization: resolvers.getById(),
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createOrganization: resolvers.createOrganization(),
    deleteOrganization: resolvers.deleteOrganization(),
    editOrganization: resolvers.editOrganization(),
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
