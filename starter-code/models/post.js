const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
    content:String,
    creatorId:String,
    comments:[{type: Schema.Types.ObjectId, ref: 'Comments'}],
    picPath:String,
    picName:String,

  });
  
  const Post = mongoose.model('Post', PostSchema);
  
  module.exports = Post;
  