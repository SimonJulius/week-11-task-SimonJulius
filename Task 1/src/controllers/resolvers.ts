import { GraphQLString, GraphQLInt, GraphQLList, GraphQLID } from "graphql";
import Organization from "../model/organization_model";
import OrganizationType from "../project_typings/organization_type";

import joi from "joi";

function validateOrg(details: any) {
  const joiOrganizationSchema = joi.object().keys({
    organization: joi.string().required(),
    products: joi.array().items(joi.string()),
    marketValue: joi.string().required(),
    address: joi.string().required(),
    ceo: joi.string(),
    country: joi.string(),
    noOfEmployees: joi.number(),
    employees: joi.array().items(joi.string()),
  });
  return joiOrganizationSchema.validate(details);
}

const createOrganization = () => {
  return {
    type: OrganizationType,
    args: {
      organization: { type: GraphQLString },
      products: { type: GraphQLList(GraphQLString) },
      marketValue: { type: GraphQLString },
      address: { type: GraphQLString },
      ceo: { type: GraphQLString },
      country: { type: GraphQLString },
      noOfEmployees: { type: GraphQLInt },
      employees: { type: GraphQLList(GraphQLString) },
    },
    resolve(_: any, args: any) {
      try {
        const { error, value } = validateOrg(args);
        if (error) throw new Error(error.details[0].message);

        let organization = new Organization(value);
        return organization.save();
      } catch (ex) {
        console.log(ex.message);
        return;
      }
    },
  };
};

const editOrganization = () => {
  return {
    type: OrganizationType,
    args: {
      id: { type: GraphQLID },
      organization: { type: GraphQLString },
      products: { type: new GraphQLList(GraphQLString) },
      marketValue: { type: GraphQLString },
      address: { type: GraphQLString },
      ceo: { type: GraphQLString },
      country: { type: GraphQLString },
      noOfEmployees: { type: GraphQLInt },
      employees: { type: new GraphQLList(GraphQLString) },
    },
    resolve(_: any, args: any) {
      try {
        const { id, ...rest } = args;
        rest.noOfEmployees = rest.employees.length;
        return Organization.findByIdAndUpdate(id, rest, {
          new: true,
        });
      } catch {
        (err: any) => {
          console.error(err);
          return;
        };
      }
    },
  };
};

const deleteOrganization = () => {
  return {
    type: OrganizationType,
    args: {
      id: { type: GraphQLID },
    },
    resolve(parent: any, args: any) {
      return Organization.findByIdAndDelete(args.id);
    },
  };
};

const getAll = () => {
  return {
    type: new GraphQLList(OrganizationType),
    args: {},
    resolve(_: any, _args: any) {
      return Organization.find({});
    },
  };
};

const getById = () => {
  return {
    type: OrganizationType,
    args: { id: { type: GraphQLID } },
    resolve(_: any, args: any) {
      return Organization.findById(args.id);
    },
  };
};

export default {
  deleteOrganization,
  createOrganization,
  editOrganization,
  getAll,
  getById,
};
