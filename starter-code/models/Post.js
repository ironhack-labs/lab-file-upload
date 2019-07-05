const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  // title: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  photo: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'

    }
  });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;