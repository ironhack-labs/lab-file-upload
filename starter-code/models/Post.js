const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Comment = require('./Comment.js');

const postSchema = Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  picPath: String,
  picName: String,
  comments: {
    type: Array,
    default: [],
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;