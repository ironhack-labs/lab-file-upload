const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema ({
  content:String,
  creatorId: String,
  picPath: String,
  picName: String
}, {
  timestamps: true,
  versionKey: false
})

const Post = mongoose.model('Post', postsSchema);
module.exports = Post; 