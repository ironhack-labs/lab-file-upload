const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  img: {type: Schema.Types.ObjectId, ref: 'Picture'}
}, {
  timestamps:{ createdAt: 'createdAT', updatedAt:'updatedAt'}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
