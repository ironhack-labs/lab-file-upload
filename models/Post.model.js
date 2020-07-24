const { Schema, model, ObjectId } = require('mongoose');
require('./User.model');
require('./comment.model');

const postSchema = new Schema(
  {
    content: {
      type: String
    },
    creatorId: {
      type: ObjectId,
      ref: 'User'
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    },
    comment: { type: ObjectId, ref: 'Comment' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false
});

module.exports = model('Post', postSchema);
