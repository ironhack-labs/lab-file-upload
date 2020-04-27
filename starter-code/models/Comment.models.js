const { Schema, model } = require('mongoose');

const Post = new Schema(
  {
    content: String,
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    imagePath: String,
    imageName: String,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = model('Post', Post);