const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
  {
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"},
    imagePath: String,
    imageName: String
  },
  {
  timestamps: true
  }
)

module.exports = model("Comment", commentSchema)