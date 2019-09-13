const { model, Schema } = require('mongoose')

const postSchema = new Schema(
  {
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    picPath: String,
    picName: String
  },
  { timestamps: true }
)

module.exports = model('Post', postSchema)
