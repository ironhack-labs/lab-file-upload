const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('./user');

const commentSchema = Schema({
  content: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;