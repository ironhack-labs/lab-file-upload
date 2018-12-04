const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,
  authorId: Object,
  imagePath: String,
  imageName: String
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
