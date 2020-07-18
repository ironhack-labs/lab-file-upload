const { Schema, model, ObjectId } = require('mongoose')
const Comment = require('../models/Comment.model');

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

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
});

module.exports = model('Post', postSchema)