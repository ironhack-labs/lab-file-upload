const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CommentSchema = new Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  imageName: String,
  imagePath: String,
})

module.exports = model('Comment', CommentSchema)
