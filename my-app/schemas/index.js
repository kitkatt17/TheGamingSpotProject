const { gql } = require('apollo-server-express');

// Import typeDefs from separate files
const typeDefs = require('./typeDefs');

// Import resolvers from separate files
const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers,
};
