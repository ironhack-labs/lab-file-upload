const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User.model');
 
const postSchema = new Schema(
  {
    content: String,
    creatorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    picPath: String,
    picName: String,
  },
  { timestamps: true,
    toJSON: {
      virtuals: true,
    }, 
  }
);
 
const Post = mongoose.model('Post', postSchema);
 
module.exports = Post;