const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    content: String,
    creator: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    picPath: String,
    picName: String,
    comments: [
      {
        creator: {
          ref: 'User',
          type: Schema.Types.ObjectId
        },
        comment: String,
        picName: String,
        picPath: String
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = model('Post', postSchema)