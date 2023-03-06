// models/User.model.js

const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "content is required."],
    },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId:{ type: Schema.Types.ObjectId, ref: 'Post' },
    imagePath: String,
    imageName:String,
  },
  {
    timestamps: true
  }
);

module.exports = model("Comment", commentSchema);
