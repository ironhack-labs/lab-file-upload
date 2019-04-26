const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose')
const Schema   = mongoose.Schema;

const PostsSchema = Schema ({
  content:String,
  creatorId: String,
  picPath: String,
  picName: String
}, {
  timestamps: true,
  versionKey: false
})

const Post = mongoose.model('Post', PostsSchema);

module.exports = Post;