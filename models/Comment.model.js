const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imagePath: {
    type: String,
  },
  imageName: {
    type: String,
  },
});

module.exports = model("Comment", commentSchema);