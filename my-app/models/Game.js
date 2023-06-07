const { Schema } = require('mongoose');


const gameSchema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  released: {
    type: String,
  },
  genre: [
    {
      type: String,
    },
  ],
  platform: [
    {
      type: String,
    },
  ],
  screenshot: [
    {
      type: String,
    },
  ],
 
});

module.exports = gameSchema;