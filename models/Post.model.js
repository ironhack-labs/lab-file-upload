const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: String,
    creatorId: String,
    picPath: String,
    picName: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);
