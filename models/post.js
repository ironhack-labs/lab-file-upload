const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = require('./comments.js');

const postSchema = new Schema(
  {
    content: {type: String},
    creatorId: { type: Schema.Types.ObjectId },
    picPath: {type: String },
    picName: {type: String },
    comments: [ Comment.schema ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
