const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    picPath: String,
    picName: String
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
