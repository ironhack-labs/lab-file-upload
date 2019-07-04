const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema(
  {
    content: String,
    creatorId: String, // ID of the person who has posted it
    picName: String,
    picPath: String
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
