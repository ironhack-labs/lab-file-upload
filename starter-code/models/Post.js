const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema(
  {
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    image_url: String,
    image_filename: String
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema)

module.exports = Post;