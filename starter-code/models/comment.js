const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorId: Schema.Types.ObjectId,
  imagePath: String,
  imageName: String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;