const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: String,
  imageName: String
})

module.exports = model('Comment', commentSchema)