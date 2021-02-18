const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  content: {
    type: String
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  path: {
    type: String
  },
  name: {
    type: String
  }
},
  {
    timestamps: true
  }
)

const Post = model('Post', postSchema)

module.exports = Post