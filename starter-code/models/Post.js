const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: Object
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
