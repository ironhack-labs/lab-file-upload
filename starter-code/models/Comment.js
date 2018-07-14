const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,
  creatorId:    Schema.ObjectId,
  postId:    Schema.ObjectId,
  picPath: String,
  picName: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

