const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorId: String,
  imagePath: String,
  imageName: String
});

module.exports = mongoose.model('Comment', CommentSchema);
