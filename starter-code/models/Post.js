const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  content: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  picPath: { type: String, required: true },
  picName: { type: String, required: true }
});
PostSchema.set('timestamps', true);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
