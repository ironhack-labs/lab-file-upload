const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = require('./comment-post.js');
const posts = Schema({
  content : {type:String},
  creatorId : {type:String},
  picPath : {type:String},
  picName : {type:String},
  comment :[comment.schema]
});

const Post = mongoose.model('post',posts);
module.exports = Post;
