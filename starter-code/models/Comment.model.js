const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    imgPath: String,
    imageName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Comment', commentSchema);
