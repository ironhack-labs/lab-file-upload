const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imagePath: String,
  imageName: String,
  postID: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
