
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: { type: String },
    picName: { type: String },
    picPath: { type: String },
    // reference the ID of the user
    creatorId: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;