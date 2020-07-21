// models/Post.model.js
const { Schema, model, ObjectId } = require('mongoose');

const postSchema = new Schema(
  {
    content: {
      type: String
    },
    creatorId: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false
});

module.exports = model('Post', postSchema);
