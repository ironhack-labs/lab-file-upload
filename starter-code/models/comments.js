const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require("./user")

const CommentSchema = Schema({
  content: String,
  authorId: Schema.Types.ObjectId,
  picPath: String,
  picName: String

});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;