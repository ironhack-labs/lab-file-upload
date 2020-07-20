// models/Post.model.js
const mongoose = require('mongoose');
require('./User.model');

const { Schema, model, isValidObjectId } = require('mongoose');

const postSchema = new Schema({
  content: {
    type: String
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  picPath: {
    type: String
  },
  picName: {
    type: String
  }
});

module.exports = model('Post', postSchema);
