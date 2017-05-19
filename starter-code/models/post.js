const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = require('./comments.js');

const postSchema = new Schema(
  {
    content: {type: String},
    creatorId: { type: Schema.Types.ObjectId },
    picPath: {type: String },
    picName: {type: String },
    comments: [ {
      content: {type: String},
      authorId: { type: Schema.Types.ObjectId},
      imagePath: {type: String},
      imageName: {type: String}
    } ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
