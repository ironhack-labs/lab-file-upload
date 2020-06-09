const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    creator: {type: mongoose.Schema.ObjectId, ref: "User"},
    title: {
      type: String,
    },
    content: {
      type: String
    },
    picName: {
      type: String,
    },
    origName: {
      type: String,
    },
    picPath: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);


module.exports = Post;
