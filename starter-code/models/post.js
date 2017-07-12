const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content:    String,
  creatorId:  String,
  picPath:    String,
  picName:    String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
