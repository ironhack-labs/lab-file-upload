const { Schema, model, ObjectId } = require('mongoose')

const postSchema = new Schema(
  {
    content: String,
    creatorId:  {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    picPath: String,
    picName: String
  },
  {
    timestamps: true
  }
)

module.exports = model('Post', postSchema)