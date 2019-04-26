const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: String,
  imageName: String
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Comment', commentSchema)