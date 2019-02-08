const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  authorid: String,
  imagePath: String,
  imageName: String,
  postId: String
});

const Comment = mongoose.model('Comment', PostSchema);

module.exports = Comment;




