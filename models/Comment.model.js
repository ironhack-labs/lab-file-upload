const { Schema, model, ObjectId } = require('mongoose')

const commentSchema = new Schema(
  {
    content: String,
    authorId:  {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    postId:  {
      type: ObjectId,
      ref: "Post",
      required: true,
    },
    imagePath: String,
    imageName: String
  },
  {
    timestamps: true
  }
)

module.exports = model('Comment', commentSchema)