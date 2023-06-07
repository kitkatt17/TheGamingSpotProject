const { AuthenticationError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

require('dotenv').config();
const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

module.exports = {
  authMiddleware: function ({ req }) {
   
    let token = req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }

    if (token) {
      try {
        const { data } = jwt.verify(token, secret, { expiresIn: expiration });
        return { ...req, user:data};
      } catch {
        throw new AuthenticationError("Invalid token!");
      }
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
