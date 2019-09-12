const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema({
  content: String,
  picPath: String,
  picName: String,
  postPicture: { type: Schema.Types.ObjectId, ref: 'Picture' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post
