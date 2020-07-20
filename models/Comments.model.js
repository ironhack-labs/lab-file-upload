// models/Comments.model.js
const mongoose = require('mongoose');

const { Schema, model, isValidObjectId } = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: {
    type: String
  },
  imageName: {
    type: String
  }
});

module.exports = model('Comment', commentSchema);
