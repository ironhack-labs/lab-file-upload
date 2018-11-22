const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  imagePath: String,
  imageName: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
