const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserPost = new Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  picName: String,
  picPath: String,
})

module.exports = model('Post', UserPost)
