const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  imagePath: String,
  imageName: String
  }
)

const Commen = mongoose.model("Commen", commentSchema)
module.exports = Commen