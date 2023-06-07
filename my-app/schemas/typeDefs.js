const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    gameCount: Int 
    savedGames: [Game] 
  }

  type Game { 
    gameId: String 
    name: String 
    released: String
    rating: String 
    genre: [String]
    platform: [String]
    screenshot: [String]
    
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: GameInput): User
    removeGame(gameId: String!): User
  }

  input GameInput {
    gameId: String 
    name: String 
    released: String
    rating: String 
    genre: [String]
    platform: [String]
    screenshot: [String]
  }
`;

module.exports = typeDefs;
