const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose')
const Schema   = mongoose.Schema;

const CommentsSchema = Schema ({
  content:String,
  authorId: String,
  imagePath: String,
  imageName: String
}, {
  timestamps: true,
  versionKey: false
})

const Comment = mongoose.model('Comments', CommentsSchema);

module.exports = Post;