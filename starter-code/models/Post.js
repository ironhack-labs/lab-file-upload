const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
debugger
const postSchema = new Schema({
  postTitle: String,
  content: String,
  author: {type: Schema.Types.ObjectId, ref: "User"},
  comments: {type: Schema.Types.ObjectId, ref: "Comment"},
  picture: {  
    title: String,
    description: String,
    imgName: String,
    imgPath: String,}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
