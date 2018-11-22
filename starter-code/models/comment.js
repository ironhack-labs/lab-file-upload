const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content:  String,
  picPath: String,
  picName: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
