const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  id: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
  picname: String,
  picpath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

let Post = mongoose.model("Post", postSchema);
module.exports = Post;