const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,
  authorId: String,
  imagePath: String,
  imageName: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;