const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: String,
  authorId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  imagePath: String,
  imageName: String,
}, {
  timestamps: true
});

module.exports = model('Comment', commentSchema);