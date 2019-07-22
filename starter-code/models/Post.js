const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: String,
  imagePath: String,
  imageName: String
},{
  timestamps: true
})

const PostSchema = new Schema({
  title: String,
  content: String,
  author: String,
  picPath: String,
  picName: String,
  comments: [commentSchema]
},{
  timestamps: true
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post