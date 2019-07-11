const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  authorId:     { type : Schema.Types.ObjectId, ref: 'User' },
  postId:     { type : Schema.Types.ObjectId, ref: 'Post' },
  comment:      String,
  imgName:      String,
  imgPath:      String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
