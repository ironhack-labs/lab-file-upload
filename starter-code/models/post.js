const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: String,
  imagePath: String,
  imageName: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
