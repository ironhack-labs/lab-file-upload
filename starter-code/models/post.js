const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorID: String,
  picName: String,
  picPath: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
