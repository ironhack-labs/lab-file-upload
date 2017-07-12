const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const posts = Schema({
  content : {type:String},
  creatorId: { type: Schema.Types.ObjectId },
  picPath : {type:String},
  picName : {type:String},
});

const Post = mongoose.model('post',posts);
module.exports = Post;
