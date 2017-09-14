const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Comment  = require('../models/comment')

const postSchema = new Schema({
  content: {
    type: String,
    required: [true, "Post can't be empty"]
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user_name: String,
  picture: {
    pic_path: String,
    pic_name: String
  },
  comments: [Comment.schema]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;
