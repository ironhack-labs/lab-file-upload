const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  picture: {
    path: String,
    originalname: {type:String,default:"Profile Picture"}
  }
});

const Post = mongoose.model('Post', UserSchema);

module.exports = Post;
