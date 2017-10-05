const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const postSchema = new Schema ({
  content: String,
  creatorId:Number,
  picPath: String,
  picName: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

var Post = mongoose.model("Post",postSchema);
module.exports = Post;
