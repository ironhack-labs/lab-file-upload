const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: {
    type: String,
    default: "https://i.pinimg.com/originals/eb/53/61/eb5361ca8b4a02e9fdeb511b9dccd5a3.png"
  },
  imageName: String
})

module.exports = model('Comment', commentSchema)