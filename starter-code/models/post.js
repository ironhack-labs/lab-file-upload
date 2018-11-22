const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  idUser: String,
  description: String,
  originalname: String,
  url: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;