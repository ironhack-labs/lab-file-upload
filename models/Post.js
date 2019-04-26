const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picPath: String,
  picName: String,
  comments:  [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Post', postSchema)