const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  content: { type: String },
  creatorId: { type: Schema.Types.ObjectId, ref:"creatorId"},
  picPath: { type: String },
  picName: { type: String }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
