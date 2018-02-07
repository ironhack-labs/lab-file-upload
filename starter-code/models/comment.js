const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'   
  },
  picture: {
    type : Schema.Types.ObjectId,
    ref: 'Picture'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
