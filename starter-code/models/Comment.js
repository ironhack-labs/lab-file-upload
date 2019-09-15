const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = Schema(
  {
    content: String,
    authorId: String,
    picPath: String,
    picName: String,
    imageId: String
  },
  {
    timestamps: true
  }
)
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment