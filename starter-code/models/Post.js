const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema(
  {
    description: String,
    creatorId : {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    imgName: String,
    imgPath: String
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


