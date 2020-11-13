// models/Post.model.js

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: {
      type: String
    },
    creatorId: {
      type:Schema.Types.ObjectId,
      ref:"User"
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

module.exports = model('Post', postSchema);
