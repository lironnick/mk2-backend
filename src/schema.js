// IMPORTS
const { GraphQLServer } = require('graphql-yoga');
const { merge } = require('lodash');
const { schemasTypeDefs, schemasResolvers } = require('./utils/resolveSchemas');
const getLoaders = require('./batches/getLoaders');
const RequestedFields = require('./ast/RequestedFields');
// ------------------------------------------------------------------

// DEFINE QUERY, MUTATION AND RESOLVERS
const Query = `
  scalar DateTime
  scalar Upload
  
  type Query {
    
    _empty: String
    
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};
// ------------------------------------------------------------------

// CONTEXT
const context = (req) => ({
  req: req.request,
  dataloaders: getLoaders(),
  requestedFields: new RequestedFields()

});
// ------------------------------------------------------------------

// GRAPHQL SERVER
const server = new GraphQLServer({
  typeDefs: [Query, Mutation, schemasTypeDefs],
  resolvers: merge(resolvers, schemasResolvers),
  context
});
// ------------------------------------------------------------------

module.exports.server = server;