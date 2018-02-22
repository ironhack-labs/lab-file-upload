const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId:    String,
  picPath: String,
  picName: String,
  comments: []
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
