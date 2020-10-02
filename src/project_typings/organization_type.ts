import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";

const OrganizationType = new GraphQLObjectType({
  name: "organization",
  fields: () => ({
    id: { type: GraphQLID },
    organization: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    products: { type: GraphQLList(GraphQLString) },
    marketValue: { type: GraphQLString },
    address: { type: GraphQLString },
    ceo: { type: GraphQLString },
    country: { type: GraphQLString },
    noOfEmployees: { type: GraphQLInt },
    employees: { type: GraphQLList(GraphQLString) },
  }),
});

export default OrganizationType;
