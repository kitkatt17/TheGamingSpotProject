const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect email or password");
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect email or password");
      }
      let token = signToken(user);
      token = token ? `Bearer ${token}` : token;
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    saveGame: async (parent, { gameData }, context) => {
      // console.log("first")
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedGames: gameData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in to save a game");
    },

    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedGames: { gameId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        "You need to be logged in to remove a game from your saved games"
      );
    },
  },
};

module.exports = resolvers;
