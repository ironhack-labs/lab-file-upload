// models/Comments.model.js
const { Schema, model, ObjectId } = require('mongoose');

const commentSchema = new Schema(
  {
    content: {
      type: String
    },
    authorId: {
      type: ObjectId,
      ref: 'User'
    },
    postId: {
      type: ObjectId,
      ref: 'Post'
    },
    imagePath: {
      type: String
    },
    imageName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Comment', commentSchema);
