const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('./Comment');

const PostSchema = Schema(
  {
    content: String,
    creatorId: String, // Should be a reference to tue userId
    picPath: String,
    picName: String,
    comments: [] // Should be an array of commentIds
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);
