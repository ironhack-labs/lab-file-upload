const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  content: String,
  creatorId: String,
  picPath: {
    type: String,
    default: 'https://x.kinja-static.com/assets/images/logos/placeholders/default.png'
  },
  picName: String
},{
  timestamps: true
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post