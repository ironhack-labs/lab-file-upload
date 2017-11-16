const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
})

var Post = mongoose.model("Post", PostSchema);


module.exports = Post;
