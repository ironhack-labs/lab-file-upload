// models/User.model.js

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: String,
    creatorId: Schema.Types.ObjectId,
    picPath: String,
    picName: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);
