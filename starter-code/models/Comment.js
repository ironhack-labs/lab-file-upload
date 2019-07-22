const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  authorId: String,
  imagePath: {
    type: String,
    default: 'https://x.kinja-static.com/assets/images/logos/placeholders/default.png'
  },
  imageName: String,
  commentId: Schema.ObjectId
},{
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment