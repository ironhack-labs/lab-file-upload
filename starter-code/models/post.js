const mongoose = require('mongoose')
const Schema   = mongoose.Schema
// const CommentSchema = require('comment')

const CommentSchema = Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  imagePath: String,
  imageName: String
})

const PostSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  picPath: String,
  picName: String,
  comments: [CommentSchema]
})


module.exports = mongoose.model('Post', PostSchema)
