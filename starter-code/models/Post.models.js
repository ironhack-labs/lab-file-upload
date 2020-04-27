const { Schema, model } = require('mongoose');

const Post = new Schema(
  {
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    picPath: String,
    picName: String,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = model('Post', Post);
